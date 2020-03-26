import {AllOfSchema, AnyOfSchema, ArraySchema, ObjectSchema, ReferenceSchema, ScalarSchema} from "../extensions";

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

export function isObjectMetadata(obj:any): obj is ObjectMetadata {
  return obj.discriminator === 'object';
}

export function isTypeMetadata(obj:any): obj is TypeMetadata {
  return obj.discriminator === 'type';
}