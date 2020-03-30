import {ReferenceSchema, ScalarSchema} from "../../extensions";
import {isReferenceSchema, isScalarSchema} from "../guards";

export function generateTypeMetadata(schema:ScalarSchema | ReferenceSchema, options:GeneratePropertyMetadataOptions = {}): TypeMetadata {
  if(isReferenceSchema(schema)) {
    const parts = schema.$ref.split('/');
    return {
      discriminator: 'type',
      type: parts[parts.length - 1]
    };
  }

  if(isScalarSchema(schema)) {
    let type = schema.type as string;

    if(schema.format) {
      if(options.formatMap && options.formatMap[schema.format]) {
        type = options.formatMap[schema.format];
      } else if(options.useFormatAsType === true) {
        type = schema.format;
      }
    }

    if(type === 'integer') {
      type = 'number';
    }

    return {
      discriminator:'type',
      type
    };
  }

  throw new Error(`Unable able to generate type metadata from schema`);
}
