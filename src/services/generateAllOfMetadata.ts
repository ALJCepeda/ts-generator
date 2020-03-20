import {OpenAPIV3} from "openapi-types";
import {isNonArraySchemaObject, isReferenceObject} from "./guards";
import {generateReferenceMetadata} from "./generateReferenceMetadata";
import {generateObjectMetadata} from "./generateObjectMetadata";

function getOutstandingRequired(schema:OpenAPIV3.SchemaObject): string[] {
  if(!schema.required) {
    return [];
  }

  if(!schema.properties) {
    return schema.required;
  }

  const propertyKeys = Object.keys(schema.properties);
  return schema.required.filter((name) => !propertyKeys.includes(name));
}

export function generateAllOfMetadata(name:string, schemas:Array<OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>) {
  return schemas.reduce((result, schema) => {
    if(isReferenceObject(schema)) {
      const referenceMetadata = generateReferenceMetadata(name, schema);
      delete referenceMetadata.name;
      result.types.push(referenceMetadata);
    }

    if(isNonArraySchemaObject(schema)) {
      const objectMetadata = generateObjectMetadata(name, schema);

      if(objectMetadata.properties.length > 0) {
        delete objectMetadata.name;
        result.types.push(objectMetadata);
      }

      result.required = result.required.concat(getOutstandingRequired(schema));
    }

    return result;
  }, {
    name,
    types: [] as Array<ReferenceMetadata | ObjectMetadata>,
    required: [] as string[]
  });
}