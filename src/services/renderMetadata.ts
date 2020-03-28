import * as ejs from "ejs";
import {isObjectMetadata, isTypeMetadata} from "./guards";

interface RenderedContent {
  interfaces: string[]
  types: string[]
}

interface RenderMetadata {
  models: Array<SchemaMetadata>
}

function renderInterfaces(interfaceMetadata:ObjectMetadata[]): Promise<string>[] {
  return interfaceMetadata.map((interfaceMetadata) => {
    return ejs.renderFile('src/templates/model.ejs', interfaceMetadata);
  });
}

function renderTypes(referenceMetadata:TypeMetadata[]): Promise<string>[] {
  return referenceMetadata.map((referenceMetadata) => {
    return ejs.renderFile('src/templates/type.ejs', referenceMetadata);
  });
}

export async function renderMetadata(metadata:RenderMetadata): Promise<RenderedContent> {
  const objectMetadata = metadata.models.filter((modelMetadata) => isObjectMetadata(modelMetadata)) as ObjectMetadata[];
  const referenceMetadata = metadata.models.filter((modelMetadata) => isTypeMetadata(modelMetadata)) as TypeMetadata[];
  
  const interfaces = await Promise.all(renderInterfaces(objectMetadata));
  const types = await Promise.all(renderTypes(referenceMetadata));

  return {
    interfaces,
    types
  };
}