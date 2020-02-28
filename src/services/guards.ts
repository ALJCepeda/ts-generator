import {OpenAPIV3} from "openapi-types";

export function isNonArraySchemaObject(obj:any): obj is OpenAPIV3.NonArraySchemaObject {
  return typeof obj.type === 'string';
}

export function isReferenceObject(obj:any): obj is OpenAPIV3.ReferenceObject {
  return typeof obj.$ref === 'string';
}