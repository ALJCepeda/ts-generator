import {
  AllOfSchema,
  AnyOfSchema,
  ArraySchema,
  ObjectSchema,
  OneOfSchema,
  ReferenceSchema,
  ScalarSchema
} from "../extensions";

export function isScalarSchema(obj:any): obj is ScalarSchema {
  return ['string', 'number', 'boolean', 'null', 'integer'].includes(obj.type);
}

export function isReferenceSchema(obj:any): obj is ReferenceSchema {
  return typeof obj.$ref === 'string';
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

export function isAnyOfSchema(obj:any): obj is AnyOfSchema {
  return Array.isArray(obj.anyOf);
}

export function isOneOfSchema(obj:any): obj is OneOfSchema {
  return Array.isArray(obj.oneOf);
}

export function isObjectMetadata(obj:any): obj is ObjectMetadata {
  return obj.discriminator === 'object';
}

export function isAllOfMetadata(obj:any): obj is AllOfMetadata {
  return obj.discriminator === 'allOf';
}

export function isAnyOfMetadata(obj:any): obj is AnyOfMetadata {
  return obj.discriminator === 'anyOf';
}

export function isOneOfMetadata(obj:any): obj is OneOfMetadata {
  return obj.discriminator === 'oneOf';
}

export function isCombinatorialMetadata(obj:any): obj is CombinatorialMetadata {
  return isAllOfMetadata(obj) || isAnyOfMetadata(obj) || isOneOfMetadata(obj);
}