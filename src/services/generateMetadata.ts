import {SwaggerDocument} from "../extensions";
import {getSchemas} from "./schema/getSchemas";
import {generateModelMetadata} from "./schema/generateModelMetadata";

export function generateMetadata(document:SwaggerDocument): GeneratedMetadata {
  const schemas = getSchemas(document);
  const schemaMetadatas = generateModelMetadata(schemas);

  return {
    schemas: schemaMetadatas
  };
}