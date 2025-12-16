/** @file Shared error class exports. */

import type BadRequestError from "./BadRequestError"
import type ForbiddenError from "./ForbiddenError"
import type InternalServerError from "./InternalServerError"
import type NotFoundError from "./NotFoundError"
import type UnauthorizedError from "./UnauthorizedError"
import type ValidationError from "./ValidationError"

export type HttpError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | NotFoundError
  | UnauthorizedError
  | ValidationError

export { default as BadRequestError } from "./BadRequestError"
export { default as InternalServerError } from "./InternalServerError"
export { default as ForbiddenError } from "./ForbiddenError"
export { default as UnauthorizedError } from "./UnauthorizedError"
export { default as NotFoundError } from "./NotFoundError"
export { default as ValidationError } from "./ValidationError"
