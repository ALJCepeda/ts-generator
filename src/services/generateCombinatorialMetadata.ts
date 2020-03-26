import {isAllOfSchema, isAnyOfSchema, isObjectSchema} from "./guards";
import {generateSchemaMetadata} from "./generateSchemaMetadata";
import {AllOfSchema, AnyOfSchema, ObjectSchema, SchemaDefinition} from "../extensions";

function getOutstandingRequired(schema:ObjectSchema): string[] {
  if(!schema.required) {
    return [];
  }

  if(!schema.properties) {
    return schema.required;
  }

  const propertyKeys = Object.keys(schema.properties);
  return schema.required.filter((name) => !propertyKeys.includes(name));
}

function createCombinatorialMetadata(schemas:SchemaDefinition[]): CombinatorialMetadata {
  return schemas.reduce((result, schema) => {
    const schemaMetadata = generateSchemaMetadata(schema);

    if(isObjectSchema(schema)) {
      result.required = result.required.concat(getOutstandingRequired(schema));

      if((schemaMetadata as ObjectMetadata).properties.length === 0) {
        return result;
      }
    }

    result.schemas.push(schemaMetadata);
    return result;
  }, {
    schemas: [] as Array<SchemaMetadata>,
    required: [] as string[]
  });
}

export function generateCombinatorialMetadata(schema:AllOfSchema | AnyOfSchema): AllOfMetadata | AnyOfMetadata {
  if(isAllOfSchema(schema)) {
    const metadata = createCombinatorialMetadata(schema.allOf);
    return {
      discriminator: 'allOf',
      ...metadata
    };
  }

  if(isAnyOfSchema(schema)) {
    const metadata = createCombinatorialMetadata(schema.anyOf);
    return {
      discriminator: 'anyOf',
      ...metadata
    };
  }

  throw new Error('Unable to create metadata from schema');
}