/** @file ForbiddenError class. */
import { StatusCodes } from "http-status-codes"

/**
 * ForbiddenError class representing a 403 Forbidden error.
 */
export class ForbiddenError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of ForbiddenError.
   * @param message - Error message to throw.
   */
  constructor(message = "Access Denied") {
    super(`Forbidden: ${message}`)
    this.name = "ForbiddenError"
    this.statusCode = StatusCodes.FORBIDDEN
  }
}

export default ForbiddenError
