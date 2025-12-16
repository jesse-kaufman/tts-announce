/** @file UnauthorizedError class. */
import { StatusCodes } from "http-status-codes"

/**
 * UnauthorizedError class representing a 401 Unauthorized error.
 */
export class UnauthorizedError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of UnauthorizedError.
   * @param message - Error message to throw.
   */
  constructor(message = "Authentication Required") {
    super(`Unauthorized: ${message}`)
    this.name = "UnauthorizedError"
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnauthorizedError
