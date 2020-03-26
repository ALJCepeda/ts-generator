import {generateSchemaMetadata} from "./generateSchemaMetadata";
import {SchemaDefinition} from "../extensions";

export function generateModelMetadata(schemas:{ [key: string]: SchemaDefinition }):Array<SchemaMetadata> {
  return Object.entries(schemas).reduce((result, [name, schema]) => {
    const schemaMetadata = generateSchemaMetadata(schema);

    if(schemaMetadata) {
      schemaMetadata.name = name;
      result.push(schemaMetadata);
    }

    return result;
  }, [] as Array<SchemaMetadata>);
}