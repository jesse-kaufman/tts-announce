/** @file Custom logger. */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import chalk from "chalk"
import pino, { type Logger } from "pino"
import pretty, { type PrettyOptions } from "pino-pretty"
import { LOG_LEVEL, NODE_ENV } from "#config"

type ExtendedLogger = Logger & {
  success(msg: string): void
  action(msg: string): void
  exception(data: unknown): void
  rejection(data: unknown): void
  fatal(...args: Parameters<Logger["fatal"]>): never
}

/**
 * Sets the base logging level for Pino.
 * @returns Base log level.
 */
const baseLevel = (): string => {
  // Disable logger output in testing
  if (NODE_ENV === "test") return "silent"
  // Show DEBUG level for development
  if (!NODE_ENV || NODE_ENV === "development") return "debug"
  // Default to INFO
  return LOG_LEVEL
}

/** Configuration for pino. */
const pinoConfig = {
  level: baseLevel(),
  redact: {
    paths: [
      "firstName",
      "lastName",
      "ssn",
      "address1",
      "address2",
      "email",
      "phone",
    ],
    censor: "**GDPR COMPLIANT**",
  },
}

/** Configuration for pino-pretty. */
const prettyConfig: PrettyOptions = {
  /**
   * Format message with icon and color.
   * @param log - Message object.
   * @returns Formatted message.
   */
  messageFormat(log): string {
    const msg = log.msg ? (log.msg as string) : ""
    switch (log.level) {
      // DEBUG
      case 20:
        return chalk.magenta(`🐞 ${msg}`)
      // INFO
      case 40:
        return chalk.yellow(`🟡 ${msg}`)
      // ERROR
      case 50:
        return chalk.red(`🚩 ${msg}`)
      // FATAL
      case 60:
        return chalk.red(`💥 ${msg} -- Exiting`)
      default:
        return msg
    }
  },
}

/** Instance of pino-pretty. */
const pinoPretty = pretty(prettyConfig)
/** Internal instance of pino logger. */
const logger = pino(pinoConfig, pinoPretty)
/** Reference to original fatal method before overwriting. */
const originalFatal = logger.fatal.bind(logger)

/** Additional functions. */
const extensions: Partial<ExtendedLogger> = {
  /**
   * Logs success message.
   * @param msg - Message to log.
   * @returns Unused value.
   */
  success: (msg) => logger.info(chalk.green.bold(`🟢 ${msg}`)),

  /**
   * Logs action message.
   * @param msg - Message to log.
   * @returns Unused value.
   */
  action: (msg) => logger.info(chalk.magentaBright(msg)),

  /**
   * Logs unhandled exception.
   * @param data - Data from exception.
   * @returns Unused value.
   */
  exception: (data) => logger.error(data, chalk.magenta("Uncaught exception:")),

  /**
   * Logs unhandled rejected promise.
   * @param data - Data from promise.
   * @returns Unused value.
   */
  rejection: (data) =>
    logger.error(data, chalk.magenta("Unhandled promise rejection:")),

  /**
   * Logs fatal error and exits.
   * @param args - Passed arguments.
   */
  fatal(...args: Parameters<Logger["fatal"]>) {
    originalFatal(...args)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  },
}

Object.assign(logger, extensions)
export default logger as ExtendedLogger
