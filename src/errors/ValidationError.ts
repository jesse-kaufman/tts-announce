/** @file ValidationError class. */
import { StatusCodes } from "http-status-codes"

/**
 * ValidationError represents an HTTP 400 Bad Request error.
 * Used for validation failures in request data.
 */
export class ValidationError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of ValidationError.
   * @param message - Error message to throw.
   */
  constructor(message = "") {
    super(message)
    this.name = "ValidationError"
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default ValidationError
