import {isCombinatorialMetadata} from "./guards";

export function analyzeMetadata(metadata:GeneratedMetadata): MetadataAnalysis {
  const analysis = {
    hasRequired: false
  } ;

  metadata.schemas.forEach((schema) => {
    if(isCombinatorialMetadata(schema) && schema.required.length > 0) {
      analysis.hasRequired = true;
    }
  });

  return analysis;
}