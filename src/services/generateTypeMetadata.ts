import {ScalarSchema} from "../extensions";

export function generateTypeMetadata(schema:ScalarSchema, options:GeneratePropertyMetadataOptions = {}): TypeMetadata {
  let type = schema.type as string;

  if(schema.format) {
    if(options.formatMap && options.formatMap[schema.format]) {
      type = options.formatMap[schema.format];
    } else if(options.useFormatAsType === true) {
      type = schema.format;
    }
  }

  return {
    discriminator:'type',
    type
  };
}
