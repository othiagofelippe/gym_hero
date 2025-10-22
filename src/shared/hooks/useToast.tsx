import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useGluestackToast,
} from "@/shared/components/ui/toast";
import clsx from "clsx";

type ToastType = "success" | "error" | "warning" | "info";

interface ShowToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

const toastStyles = {
  success: "bg-[#059669] border-[#047857]",
  error: "bg-red border-red-dark",
  warning: "bg-brand border-brand-dark",
  info: "bg-blue border-blue-dark",
};

export function useToast() {
  const toast = useGluestackToast();

  const show = ({
    title,
    description,
    type = "info",
    duration = 3000,
  }: ShowToastOptions) => {
    toast.show({
      placement: "top",
      duration,
      render: ({ id }) => {
        return (
          <Toast
            nativeID={`toast-${id}`}
            action={type}
            variant="solid"
            className={clsx(
              "mx-4 mt-2 px-5 py-4 rounded-xl border-2",
              toastStyles[type]
            )}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            <ToastTitle
              className={clsx("text-white font-bold text-base mb-0.5")}
            >
              {title}
            </ToastTitle>
            {description && (
              <ToastDescription className={clsx("text-white/95 text-sm")}>
                {description}
              </ToastDescription>
            )}
          </Toast>
        );
      },
    });
  };

  const success = (title: string, description?: string) => {
    show({ title, description, type: "success" });
  };

  const error = (title: string, description?: string) => {
    show({ title, description, type: "error" });
  };

  const warning = (title: string, description?: string) => {
    show({ title, description, type: "warning" });
  };

  const info = (title: string, description?: string) => {
    show({ title, description, type: "info" });
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    close: toast.close,
    closeAll: toast.closeAll,
  };
}
