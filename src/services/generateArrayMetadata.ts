import {OpenAPIV3} from "openapi-types";
import {generateSchemaMetadata} from "./generateSchemaMetadata";

export function generateArrayMetadata(schema:OpenAPIV3.ArraySchemaObject): ArrayMetadata {
  return {
    discriminator: 'array',
    items: generateSchemaMetadata(schema.items)
  };
}