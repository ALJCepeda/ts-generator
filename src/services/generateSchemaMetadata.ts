import {OpenAPIV3} from "openapi-types";
import {
  isAllOfSchema,
  isArraySchema,
  isObjectSchema,
  isReferenceObject,
  isScalarSchema
} from "./guards";
import {generateReferenceMetadata} from "./generateReferenceMetadata";
import {generateObjectMetadata} from "./generateObjectMetadata";
import {generateArrayMetadata} from "./generateArrayMetadata";
import {generateAllOfMetadata} from "./generateAllOfMetadata";
import {generateTypeMetadata} from "./generateTypeMetadata";

export function generateSchemaMetadata(schema:OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, options:GeneratePropertyMetadataOptions = {}): SchemaMetadata {
  if(isScalarSchema(schema)) {
    return generateTypeMetadata(schema, options);
  } else if(isReferenceObject(schema)) {
    return generateReferenceMetadata(schema);
  } else if(isObjectSchema(schema)) {
    return generateObjectMetadata(schema);
  } else if(isArraySchema(schema)) {
    return generateArrayMetadata(schema);
  } else if(isAllOfSchema(schema)) {
    return generateAllOfMetadata(schema);
  }

  throw new Error('Unable to generate metadata from schema: Unrecognized type');
}