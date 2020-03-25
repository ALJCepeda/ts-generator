import {OpenAPIV3} from "openapi-types";

export function generateReferenceMetadata(reference:OpenAPIV3.ReferenceObject): ReferenceMetadata {
  const parts = reference.$ref.split('/');
  return {
    discriminator: 'reference',
    type: parts[parts.length - 1]
  };
}