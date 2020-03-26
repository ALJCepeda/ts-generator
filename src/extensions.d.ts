import {OpenAPIV3} from "openapi-types";

type SwaggerDocument = OpenAPIV3.Document;
type ReferenceSchema = OpenAPIV3.ReferenceObject;
type SchemaDefinition = OpenAPIV3.SchemaObject | ReferenceSchema;

export interface ScalarSchema extends OpenAPIV3.NonArraySchemaObject {
  type: 'string' | 'number' | 'boolean' | 'null' | 'integer';
}

export interface ObjectSchema extends OpenAPIV3.NonArraySchemaObject {
  type: 'object';
  properties: {
    [name: string]: SchemaDefinition;
  }
}

export interface ArraySchema extends OpenAPIV3.ArraySchemaObject {
  type: 'array';
  items: SchemaDefinition;
}

export interface AllOfSchema extends OpenAPIV3.BaseSchemaObject {
  allOf: Array<SchemaDefinition>;
}

export interface AnyOfSchema extends OpenAPIV3.BaseSchemaObject {
  anyOf: Array<SchemaDefinition>;
}