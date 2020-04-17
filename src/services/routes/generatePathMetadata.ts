import {OperationSchema} from "../../extensions";
import {generateSignatureMetadata} from "./generateSignatureMetadata";

export function generatePathMetadata(url:string, operation:string, operationDefinition:OperationSchema) {
  const signature = generateSignatureMetadata(operationDefinition.operationId);

  return {
    url, operation, signature
  };
}