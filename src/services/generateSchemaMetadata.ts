import {
  isAllOfSchema, isAnyOfSchema,
  isArraySchema,
  isObjectSchema,
  isReferenceSchema,
  isScalarSchema
} from "./guards";
import {generateObjectMetadata} from "./generateObjectMetadata";
import {generateArrayMetadata} from "./generateArrayMetadata";
import {generateCombinatorialMetadata} from "./generateCombinatorialMetadata";
import {generateTypeMetadata} from "./generateTypeMetadata";
import {SchemaDefinition} from "../extensions";

export function generateSchemaMetadata(schema:SchemaDefinition, options:GeneratePropertyMetadataOptions = {}): SchemaMetadata {
  if(isScalarSchema(schema) || isReferenceSchema(schema)) {
    return generateTypeMetadata(schema, options);
  } else if(isObjectSchema(schema)) {
    return generateObjectMetadata(schema);
  } else if(isArraySchema(schema)) {
    return generateArrayMetadata(schema);
  } else if(isAllOfSchema(schema) || isAnyOfSchema(schema)) {
    return generateCombinatorialMetadata(schema);
  }

  throw new Error('Unable to generate metadata from schema: Unrecognized type');
}