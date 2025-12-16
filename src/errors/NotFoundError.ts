/** @file NotFoundError class. */
import { StatusCodes } from "http-status-codes"

/**
 * NotFoundError class representing a 404 Not Found error.
 */
export class NotFoundError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of NotFoundError.
   * @param message - Error message to throw.
   */
  constructor(message = "Not Found") {
    super(message)
    this.name = "NotFoundError"
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError
