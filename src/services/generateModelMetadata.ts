import {OpenAPIV3} from "openapi-types";
import {isNonArraySchemaObject, isReferenceObject} from "./guards";
import {generateReferenceMetadata} from "./generateReferenceMetadata";
import {generateObjectMetadata} from "./generateObjectMetadata";


function getSchemas(document:OpenAPIV3.Document): { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } {
  if(!document.components || !document.components.schemas) {
    return {};
  }

  return document.components.schemas;
}

export function generateModelMetadata(document:OpenAPIV3.Document):Array<ReferenceMetadata | ObjectMetadata> {
  const schemas = getSchemas(document);

  return Object.entries(schemas).reduce((result, [name, schema]) => {
    if(isReferenceObject(schema)) {
      const aliasMetadata = generateReferenceMetadata(name, schema);
      result.push(aliasMetadata);
    } else if(isNonArraySchemaObject(schema)) {
      const objectMetadata = generateObjectMetadata(name, schema);
      result.push(objectMetadata);
    }

    return result;
  }, [] as Array<ReferenceMetadata | ObjectMetadata>).sort((a, b) => {
    if(a.discriminator === 'alias') {
      return -1;
    }

    return 1;
  });
}