import { OpenAPIV3 } from "openapi-types";
import { generateObjectMetadata } from './generateObjectMetadata';
import {isNonArraySchemaObject, isReferenceObject} from "./guards";
import {generateReferenceMetadata} from "./generateReferenceMetadata";

type StringMap = { [key:string]: string };

interface GeneratePropertyMetadataOptions {
  formatMap?: StringMap,
  referenceMap?: StringMap,
  useFormatAsType?: boolean
}

export function generatePropertyMetadata(name:string, schema:OpenAPIV3.NonArraySchemaObject | OpenAPIV3.ReferenceObject, options:GeneratePropertyMetadataOptions = {}): PropertyMetadata | ObjectMetadata {
  if(isNonArraySchemaObject(schema)) {
    let type:string = schema.type;

    if(type === 'object') {
      return generateObjectMetadata(name, schema);
    }

    if(schema.format) {
      if(options.formatMap && options.formatMap[schema.format]) {
        type = options.formatMap[schema.format];
      } else if(options.useFormatAsType === true) {
        type = schema.format;
      }
    }

    return { discriminator:'property', name, type };
  }

  if(isReferenceObject(schema)) {
    if(!options.referenceMap) {
      throw new Error('No referenceMap available');
    }

    if(!options.referenceMap[schema.$ref]) {
      throw new Error(`Unable to find reference: ${schema.$ref}`);
    }

    const aliasMetadata = generateReferenceMetadata(name, schema);
    return {
      discriminator: 'property',
      name,
      type: aliasMetadata.type
    };
  }

  throw new Error('Unknown schema object provided');
};
