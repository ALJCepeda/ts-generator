import {
  ContentObject,
  OpenAPIObject,
  OperationObject,
  ReferenceObject,
  ResponseObject,
  SchemaObject
} from "openapi3-ts";

type SwaggerDocument = OpenAPIObject;
type ReferenceSchema = ReferenceObject;
type SchemaDefinition = SchemaObject | ReferenceObject;

export interface ScalarSchema extends SchemaObject {
  type: 'string' | 'number' | 'boolean' | 'null' | 'integer';
}

export interface ObjectSchema extends SchemaObject {
  type: 'object';
  properties: {
    [name: string]: SchemaDefinition;
  }
}

export interface ArraySchema extends SchemaObject {
  type: 'array';
  items: SchemaDefinition;
}

export interface AllOfSchema extends SchemaObject {
  allOf: Array<SchemaDefinition>;
}

export interface AnyOfSchema extends SchemaObject {
  anyOf: Array<SchemaDefinition>;
}

export interface OneOfSchema extends SchemaObject {
  oneOf: Array<SchemaDefinition>;
}

export interface OperationSchema extends OperationObject {
  operationId: string;
}

export interface ResponseSchema extends ResponseObject {
  content: ContentObject;
}