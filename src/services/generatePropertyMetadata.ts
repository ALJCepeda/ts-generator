import {generateSchemaMetadata} from "./generateSchemaMetadata";
import {SchemaDefinition} from "../extensions";

function isRequired(name:string, options:GeneratePropertyMetadataOptions): boolean {
  return Array.isArray(options.required) && options.required.includes(name);
}

export function generatePropertyMetadata<T>(name:string, schema:SchemaDefinition, options:GeneratePropertyMetadataOptions = {}): PropertyMetadata<SchemaMetadata> {
  const schemaMetadata = generateSchemaMetadata(schema, options);

  return {
    name,
    schema: schemaMetadata,
    required: isRequired(name, options)
  };
}
