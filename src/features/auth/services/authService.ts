import { supabase } from '@/lib/supabase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

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
      },
    });

    if (error) {
      return {
        user: null,
        error: {
          code: error.status?.toString() || 'unknown',
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          code: 'unknown',
          message: 'Erro ao criar usuário',
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
        code: 'unknown',
        message: getErrorMessage(error.message || 'Erro desconhecido'),
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
          code: error.status?.toString() || 'unknown',
          message: getErrorMessage(error.message),
        },
      };
    }

    if (!data.user) {
      return {
        user: null,
        error: {
          code: 'unknown',
          message: 'Erro ao fazer login',
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
        code: 'unknown',
        message: getErrorMessage(error.message || 'Erro desconhecido'),
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
          code: error.status?.toString() || 'unknown',
          message: getErrorMessage(error.message),
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: {
        code: 'unknown',
        message: getErrorMessage(error.message || 'Erro desconhecido'),
      },
    };
  }
};

export const resetPassword = async (
  email: string
): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        error: {
          code: error.status?.toString() || 'unknown',
          message: getErrorMessage(error.message),
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: {
        code: 'unknown',
        message: getErrorMessage(error.message || 'Erro desconhecido'),
      },
    };
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return null;

    return {
      uid: data.user.id,
      email: data.user.email || null,
      displayName: data.user.user_metadata?.display_name || null,
    };
  } catch (error) {
    return null;
  }
};

const getErrorMessage = (errorMessage: string): string => {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos.',
    'Email not confirmed': 'Confirme seu email antes de fazer login.',
    'User already registered': 'Este email já está em uso.',
    'Password should be at least 6 characters':
      'A senha deve ter pelo menos 6 caracteres.',
    'Unable to validate email address: invalid format':
      'Email inválido.',
    'Signup requires a valid password': 'Senha é obrigatória.',
    'Database error saving new user': 'Erro ao criar usuário.',
    'Email rate limit exceeded': 'Muitas tentativas. Tente novamente mais tarde.',
  };

  if (errorMessages[errorMessage]) {
    return errorMessages[errorMessage];
  }

  for (const [key, value] of Object.entries(errorMessages)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return 'Ocorreu um erro. Tente novamente.';
};
