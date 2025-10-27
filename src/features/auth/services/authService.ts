import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const getRedirectUrl = (path: string): string => {
  if (__DEV__) {
    return Linking.createURL(path);
  }
  return `gymhero://${path}`;
};

export interface AuthError {
  code: string;
  message: string;
}

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
        emailRedirectTo: getRedirectUrl("verify-email"),
      },
    });

    if (error) {
      return {
        user: null,
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          code: "unknown",
          message: "Erro ao criar usuário",
        },
      };
    }

    return {
      user: {
        uid: data.user.id,
        email: data.user.email || null,
        displayName: data.user.user_metadata?.display_name || name,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        user: null,
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          code: "unknown",
          message: "Erro ao fazer login",
        },
      };
    }

    return {
      user: {
        uid: data.user.id,
        email: data.user.email || null,
        displayName: data.user.user_metadata?.display_name || null,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const logoutUser = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const resetPassword = async (
  email: string
): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUrl("reset-password"),
    });

    if (error) {
      return {
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const resendVerificationEmail = async (
  email: string
): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: getRedirectUrl("verify-email"),
      },
    });

    if (error) {
      return {
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const updatePassword = async (
  newPassword: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        user: null,
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          code: "unknown",
          message: "Erro ao atualizar senha",
        },
      };
    }

    return {
      user: {
        uid: data.user.id,
        email: data.user.email || null,
        displayName: data.user.user_metadata?.display_name || null,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const verifyEmailWithToken = async (
  tokenHash: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    console.log('🔐 Verificando email com token_hash...');

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'email',
    });

    if (error) {
      console.error('❌ Erro ao verificar:', error);
      return {
        user: null,
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.session) {
      console.log('⚠️ Verificado mas sem sessão');
      return {
        user: null,
        error: {
          code: "no_session",
          message: "Email verificado mas não foi possível criar sessão",
        },
      };
    }

    console.log('✅ Email verificado com sucesso!');
    return {
      user: {
        uid: data.session.user.id,
        email: data.session.user.email || null,
        displayName: data.session.user.user_metadata?.display_name || null,
      },
      error: null,
    };
  } catch (error: any) {
    console.error('❌ Erro inesperado:', error);
    return {
      user: null,
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

export const setSessionFromUrl = async (url?: string): Promise<{
  user: AuthUser | null;
  error: AuthError | null;
}> => {
  try {
    console.log('🔍 Processando URL:', url);

    if (url) {
      let tokenHash: string | null = null;
      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      if (url.includes('#')) {
        const hashPart = url.split('#')[1];
        const hashParams = new URLSearchParams(hashPart);
        accessToken = hashParams.get('access_token');
        refreshToken = hashParams.get('refresh_token');
        tokenHash = hashParams.get('token_hash') || hashParams.get('token');
        console.log('📦 Hash params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, tokenHash: !!tokenHash });
      }

      if (!accessToken && !tokenHash) {
        const parsedUrl = new URL(url.replace('gymhero://', 'https://dummy.com/'));
        accessToken = parsedUrl.searchParams.get('access_token');
        refreshToken = parsedUrl.searchParams.get('refresh_token');
        tokenHash = parsedUrl.searchParams.get('token_hash') || parsedUrl.searchParams.get('token');
        console.log('📦 Query params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, tokenHash: !!tokenHash });
      }

      if (accessToken && refreshToken) {
        console.log('✅ Setando sessão com tokens');
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error('❌ Erro ao setar sessão:', error);
          return {
            user: null,
            error: {
              code: error.status?.toString() || "unknown",
              message: getErrorMessage(error.message),
            },
          };
        }

        if (!data.session) {
          console.log('⚠️ Sessão não criada');
          return {
            user: null,
            error: {
              code: "no_session",
              message: "Não foi possível criar a sessão",
            },
          };
        }

        console.log('✅ Sessão criada com sucesso!');
        return {
          user: {
            uid: data.session.user.id,
            email: data.session.user.email || null,
            displayName: data.session.user.user_metadata?.display_name || null,
          },
          error: null,
        };
      }

      if (tokenHash) {
        console.log('🔐 Usando verifyOtp com token_hash');
        return await verifyEmailWithToken(tokenHash);
      }

      console.log('⚠️ Nenhum token encontrado na URL');
    }

    console.log('🔄 Buscando sessão existente...');
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('❌ Erro ao buscar sessão:', error);
      return {
        user: null,
        error: {
          code: error.status?.toString() || "unknown",
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.session) {
      console.log('⚠️ Nenhuma sessão encontrada');
      return {
        user: null,
        error: {
          code: "no_session",
          message: "Não foi possível verificar o email",
        },
      };
    }

    console.log('✅ Sessão existente encontrada!');
    return {
      user: {
        uid: data.session.user.id,
        email: data.session.user.email || null,
        displayName: data.session.user.user_metadata?.display_name || null,
      },
      error: null,
    };
  } catch (error: any) {
    console.error('❌ Erro inesperado:', error);
    return {
      user: null,
      error: {
        code: "unknown",
        message: getErrorMessage(error.message || "Erro desconhecido"),
      },
    };
  }
};

const getErrorMessage = (errorMessage: string): string => {
  const errorMessages: Record<string, string> = {
    "Invalid login credentials": "Email ou senha incorretos.",
    "Email not confirmed": "Confirme seu email antes de fazer login.",
    "User already registered": "Este email já está em uso.",
    "Password should be at least 6 characters":
      "A senha deve ter pelo menos 6 caracteres.",
    "Unable to validate email address: invalid format": "Email inválido.",
    "Signup requires a valid password": "Senha é obrigatória.",
    "Database error saving new user": "Erro ao criar usuário.",
    "Email rate limit exceeded":
      "Muitas tentativas. Tente novamente mais tarde.",
  };

  if (errorMessages[errorMessage]) {
    return errorMessages[errorMessage];
  }

  for (const [key, value] of Object.entries(errorMessages)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return "Ocorreu um erro. Tente novamente.";
};
