const cache = {};

/**
 * Get instance of logger
 *
 * @param label
 * @returns {Logger} logger instance
 */
export function getLogger(label: string = "Default"): Logger {
  cache[label] = cache[label] || new Logger(label);
  return cache[label];
}

class Logger {
  constructor(
    private label: string
  ) {
  }

  error(message: string, data?: any | any[]) {
    (console.error || console.log)(`${this.label}: ${message}`, data || "");
  }

  info(message: string, data?: any | any[]) {
    (console.info || console.log)(`${this.label}: ${message}`, data || "");
  }

  debug(message: string, data?: any | any[]) {
    (console.debug || console.log)(`${this.label}: ${message}`, data || "");
  }
}
