import {SchemaDefinition, SwaggerDocument} from "../extensions";

export function getSchemas(document:SwaggerDocument): { [key: string]: SchemaDefinition } {
  if(!document.components || !document.components.schemas) {
    return {};
  }

  return document.components.schemas;
}