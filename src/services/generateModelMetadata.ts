import {OpenAPIV3} from "openapi-types";
import {generateSchemaMetadata} from "./generateSchemaMetadata";


function getSchemas(document:OpenAPIV3.Document): { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } {
  if(!document.components || !document.components.schemas) {
    return {};
  }

  return document.components.schemas;
}

export function generateModelMetadata(document:OpenAPIV3.Document):Array<SchemaMetadata> {
  const schemas = getSchemas(document);

  return Object.entries(schemas).reduce((result, [name, schema]) => {
    const schemaMetadata = generateSchemaMetadata(schema);

    if(schemaMetadata) {
      schemaMetadata.name = name;
      result.push(schemaMetadata);
    }

    return result;
  }, [] as Array<SchemaMetadata>).sort((a) => {
    if(a.discriminator === 'reference') {
      return -1;
    }

    return 1;
  });
}