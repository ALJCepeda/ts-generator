import {SchemaDefinition, SwaggerDocument} from "../../extensions";

export function getSchemas(document:SwaggerDocument): { [key: string]: SchemaDefinition } {
  if(!document.components) {
    return {};
  }

  return {
    ...document.components.schemas,
    ...document.components.responses
  };
}