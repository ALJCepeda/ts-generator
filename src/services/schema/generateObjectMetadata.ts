import {generatePropertyMetadata} from './generatePropertyMetadata';
import {ObjectSchema} from "../../extensions";

export function generateObjectMetadata(schema:ObjectSchema): ObjectMetadata {
  let properties:Array<PropertyMetadata<SchemaMetadata>> = [];

  if(schema.properties) {
    properties = Object.entries(schema.properties).reduce((result, [propName, propSchema]) => {
      const propMetadata = generatePropertyMetadata(propName, propSchema, {
        required: schema.required
      });

      result.push(propMetadata);
      return result;
    }, [] as Array<PropertyMetadata<SchemaMetadata>>);
  }

  return {
    discriminator:'object',
    properties
  };
}
