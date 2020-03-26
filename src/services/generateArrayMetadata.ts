import {generateSchemaMetadata} from "./generateSchemaMetadata";
import {ArraySchema} from "../extensions";

export function generateArrayMetadata(schema:ArraySchema): ArrayMetadata {
  return {
    discriminator: 'array',
    items: generateSchemaMetadata(schema.items)
  };
}