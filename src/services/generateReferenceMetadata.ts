import {OpenAPIV3} from "openapi-types";

export function generateReferenceMetadata(name:string, reference:OpenAPIV3.ReferenceObject): ReferenceMetadata {
  const parts = reference.$ref.split('/');
  return {
    discriminator: 'reference',
    name,
    type: parts[parts.length - 1]
  };
}