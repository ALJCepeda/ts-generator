import {OpenAPIV3} from "openapi-types";

export interface ScalarSchema extends OpenAPIV3.NonArraySchemaObject {
  type: 'string' | 'number' | 'boolean' | 'null' | 'integer';
}

export interface ObjectSchema extends OpenAPIV3.NonArraySchemaObject {
  type: 'object';
  properties: {
    [name: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  }
}

export interface ArraySchema extends OpenAPIV3.ArraySchemaObject {
  type: 'array';
  items: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export interface AllOfSchema extends OpenAPIV3.BaseSchemaObject {
  allOf: Array<OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>;
}