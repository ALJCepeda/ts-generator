import { OpenAPIV3 } from "openapi-types";
import { generateObjectMetadata } from './generateObjectMetadata';
import {isNonArraySchemaObject, isReferenceObject} from "./guards";
import {generateReferenceMetadata} from "./generateReferenceMetadata";

type StringMap = { [key:string]: string };

interface GeneratePropertyMetadataOptions {
  required?: string[],
  formatMap?: StringMap,
  referenceMap?: StringMap,
  useFormatAsType?: boolean
}

function isRequired(name:string, options:GeneratePropertyMetadataOptions): boolean {
  return Array.isArray(options.required) && options.required.includes(name);
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

    return {
      discriminator:'property',
      name,
      type,
      required: isRequired(name, options)
    };
  }

  if(isReferenceObject(schema)) {
    const referenceMetadata = generateReferenceMetadata(name, schema);
    return {
      discriminator: 'property',
      name,
      type: referenceMetadata.type,
      required: isRequired(name, options)
    }
  }

  throw new Error('Unknown schema object provided');
}
