import { toast as sonnerToast, type ExternalToast } from "sonner"

type SiteToastOptions = ExternalToast & {
  title?: string
}

function success(message: string, options?: SiteToastOptions) {
  const { title = "Success", ...rest } = options ?? {}
  return sonnerToast.success(title, { description: message, ...rest })
}

function error(message: string, options?: SiteToastOptions) {
  const { title = "Error", ...rest } = options ?? {}
  return sonnerToast.error(title, { description: message, ...rest })
}

function info(message: string, options?: SiteToastOptions) {
  const { title = "Notice", ...rest } = options ?? {}
  return sonnerToast.info(title, { description: message, ...rest })
}

function warning(message: string, options?: SiteToastOptions) {
  const { title = "Warning", ...rest } = options ?? {}
  return sonnerToast.warning(title, { description: message, ...rest })
}

/** App toast — always shows a title + message with branded styling via `<Toaster />`. */
export const toast = {
  success,
  error,
  info,
  warning,
  message: sonnerToast.message,
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
}
