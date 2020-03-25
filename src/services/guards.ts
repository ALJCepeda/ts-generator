import {OpenAPIV3} from "openapi-types";
import {AllOfSchema, ArraySchema, ObjectSchema, ScalarSchema} from "../extensions";

export function isScalarSchema(obj:any): obj is ScalarSchema {
  return ['string', 'number', 'boolean', 'null', 'integer'].includes(obj.type);
}

export function isObjectSchema(obj:any): obj is ObjectSchema {
  return obj.type === 'object';
}

export function isArraySchema(obj:any): obj is ArraySchema {
  return obj.type === 'array';
}

export function isAllOfSchema(obj:any): obj is AllOfSchema {
  return Array.isArray(obj.allOf);
}

export function isReferenceObject(obj:any): obj is OpenAPIV3.ReferenceObject {
  return typeof obj.$ref === 'string';
}

export function isObjectMetadata(obj:any): obj is ObjectMetadata {
  return obj.discriminator === 'object';
}

export function isReferenceMetadata(obj:any): obj is ReferenceMetadata {
  return obj.discriminator === 'reference';
}