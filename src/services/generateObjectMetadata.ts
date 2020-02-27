import {OpenAPIV3} from "openapi-types";
import { generatePropertyMetadata } from './generatePropertyMetadata';
import NonArraySchemaObject = OpenAPIV3.NonArraySchemaObject;

interface ObjectSchema extends OpenAPIV3.NonArraySchemaObject {
  type: 'object';
  properties: {
    [name: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  }
}

function isObjectSchema(obj:any): obj is ObjectSchema {
  return obj.type === 'object' && obj.properties;
}

export function generateObjectMetadata(name: string, schema:OpenAPIV3.NonArraySchemaObject): ObjectMetadata {
  if(!isObjectSchema(schema)) {
    throw new Error('Schema must have type equal to "object"');
  }

  const properties = Object.entries(schema.properties).reduce((result, [propName, propSchema]) => {
    const propMetadata = generatePropertyMetadata(propName, propSchema as NonArraySchemaObject);
    result.push(propMetadata);
    return result;
  }, [] as Array<PropertyMetadata | ObjectMetadata>);

  return { name, type:'object', properties };
}
