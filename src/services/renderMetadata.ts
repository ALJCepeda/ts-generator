import * as ejs from "ejs";
import {isObjectMetadata, isReferenceMetadata} from "./guards";

interface RenderedContent {
  interfaces: string[]
  types: string[]
}

interface RenderMetadata {
  models: Array<ReferenceMetadata | ObjectMetadata>
}

function renderInterfaces(interfaceMetadata:ObjectMetadata[]): Promise<string>[] {
  return interfaceMetadata.map((interfaceMetadata) => {
    return ejs.renderFile('src/templates/interface.ejs', interfaceMetadata);
  });
}

function renderTypes(referenceMetadata:ReferenceMetadata[]): Promise<string>[] {
  return referenceMetadata.map((referenceMetadata) => {
    return ejs.renderFile('src/templates/type.ejs', referenceMetadata);
  });
}

export async function renderMetadata(metadata:RenderMetadata): Promise<RenderedContent> {
  const objectMetadata = metadata.models.filter((modelMetadata) => isObjectMetadata(modelMetadata)) as ObjectMetadata[];
  const referenceMetadata = metadata.models.filter((modelMetadata) => isReferenceMetadata(modelMetadata)) as ReferenceMetadata[];
  
  const interfaces = await Promise.all(renderInterfaces(objectMetadata));
  const types = await Promise.all(renderTypes(referenceMetadata));

  return {
    interfaces,
    types
  };
}