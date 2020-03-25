import {OpenAPIV3} from "openapi-types";
import {isObjectSchema} from "./guards";
import {generateSchemaMetadata} from "./generateSchemaMetadata";
import {AllOfSchema} from "../extensions";

function getOutstandingRequired(schema:OpenAPIV3.SchemaObject): string[] {
  if(!schema.required) {
    return [];
  }

  if(!schema.properties) {
    return schema.required;
  }

  const propertyKeys = Object.keys(schema.properties);
  return schema.required.filter((name) => !propertyKeys.includes(name));
}

export function generateAllOfMetadata(schema:AllOfSchema): AllOfMetadata {
  return schema.allOf.reduce((result, schema) => {
    const schemaMetadata = generateSchemaMetadata(schema);

    if(isObjectSchema(schema)) {
      result.required = result.required.concat(getOutstandingRequired(schema));

      if((schemaMetadata as ObjectMetadata).properties.length === 0) {
        return result;
      }
    }

    result.types.push(schemaMetadata);
    return result;
  }, {
    discriminator: 'allOf',
    types: [] as Array<SchemaMetadata>,
    required: [] as string[]
  });
}