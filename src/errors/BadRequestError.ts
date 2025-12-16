/** @file BadRequestError class. */
import { StatusCodes } from "http-status-codes"

/**
 * BadRequestError class representing a 400 Bad Request error.
 */
export class BadRequestError extends Error {
  /** HTTP status code associated with error. */
  readonly statusCode: number

  /**
   * Creates an instance of BadRequestError.
   * @param message - Error message to throw.
   */
  constructor(message = "Bad Request") {
    super(`Bad Request${message ? ": " : ""}${message}`)
    this.name = "BadRequestError"
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError
