/** @file InternalServerError class. */
import { StatusCodes } from "http-status-codes"

/**
 * InternalServerError class representing a 500 Internal Server Error.
 */
export class InternalServerError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of ForbiddenError.
   * @param message - Error message to throw.
   */
  constructor(message = "") {
    super(`Internal Server Error${message ? ": " : ""}${message}`)
    this.name = "InternalServerError"
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

export default InternalServerError
