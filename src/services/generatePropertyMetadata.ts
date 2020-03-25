import {OpenAPIV3} from "openapi-types";
import {generateSchemaMetadata} from "./generateSchemaMetadata";

function isRequired(name:string, options:GeneratePropertyMetadataOptions): boolean {
  return Array.isArray(options.required) && options.required.includes(name);
}

export function generatePropertyMetadata<T>(name:string, schema:OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, options:GeneratePropertyMetadataOptions = {}): PropertyMetadata<SchemaMetadata> {
  const schemaMetadata = generateSchemaMetadata(schema, options);

  return {
    name,
    schema: schemaMetadata,
    required: isRequired(name, options)
  };
}
