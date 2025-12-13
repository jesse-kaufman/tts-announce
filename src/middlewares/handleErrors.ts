/** @file Error handlers for Express.js. */
import { type HttpError, InternalServerError } from "#errors"
import logger from "#utils/logger"
import type { ErrorRequestHandler, Response } from "express"

/**
 * List of errors that should not print stack.
 */
const noStackErrors = new Set([
  "ForbiddenError",
  "UnauthorizedError",
  "ValidationError",
  "NotFoundError",
])

/**
 * Sends the HTTP response and optionally logs the error to server console.
 * @param stack - Error being handled.
 * @param res - Response object.
 * @param httpError - HTTP Error information.
 * @param options - Options for handling error.
 * @param [options.logError] - Log error to server console if true; defaults to false.
 * @param [options.logStack] - Log stack to server console if true; defaults to false.
 */
const handleError = (
  stack: string,
  res: Response,
  httpError: HttpError,
  options: { logError?: boolean; logStack?: boolean } = {}
): void => {
  const { message, statusCode } = httpError
  const { logError = false, logStack = false } = options
  let _message = message

  // Maybe add stack to message
  if (logStack) _message += `\nStack trace:\n${stack}`
  // Potentially log error
  if (logError) logger.error(message)
  // Send the HTTP response
  res.status(statusCode).json({ message: _message })
}

/**
 * Handles errors thrown by Express.js.
 * @param err - Error being handled.
 * @param req - Request object.
 * @param res - Response object.
 */
const handleErrors: ErrorRequestHandler = (err, req, res): void => {
  let _err = err as HttpError

  // If error does not contain a status code, wrap the error in InternalServerError,
  // preserving message and stack as-is.
  if (!_err.statusCode) _err = new InternalServerError(_err.message)

  const logStack = !noStackErrors.has(_err.name)
  handleError(String(_err.stack), res, _err, {
    logError: true,
    logStack,
  })
}

export default handleErrors
