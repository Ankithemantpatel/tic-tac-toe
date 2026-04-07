type ErrorUtilsShape = {
  getGlobalHandler: () =>
    | ((error: unknown, isFatal?: boolean) => void)
    | undefined;
  setGlobalHandler: (callback: (error: unknown, isFatal?: boolean) => void) => void;
};

function getErrorUtils(): ErrorUtilsShape | undefined {
  const g = globalThis as unknown as { ErrorUtils?: ErrorUtilsShape };
  return g.ErrorUtils;
}

/**
 * Logs uncaught JS errors (with stack) to the Metro / terminal console before
 * React Native’s default handler runs.
 */
export function installGlobalErrorLogging(): void {
  const ErrorUtils = getErrorUtils();
  if (!ErrorUtils?.getGlobalHandler || !ErrorUtils?.setGlobalHandler) {
    return;
  }

  const previous = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler((error, isFatal) => {
    const err = error as Error | undefined;
    const message =
      err && typeof err.message === 'string'
        ? err.message
        : String(error ?? 'unknown error');
    const stack =
      err && typeof err.stack === 'string' ? err.stack : '(no stack trace)';
    const label = isFatal ? 'Fatal JS error' : 'JS error';
    console.error(`[${label}] ${message}\n${stack}`);
    previous?.(error, isFatal);
  });
}
