import * as ejs from "ejs";
import {isObjectMetadata, isReferenceMetadata} from "./guards";

interface RenderedContent {
  interfaces: string[]
  aliases: string[]
}

interface RenderMetadata {
  models: Array<ReferenceMetadata | ObjectMetadata>
}

function renderInterfaces(interfaceMetadata:ObjectMetadata[]): Promise<string>[] {
  return interfaceMetadata.map((interfaceMetadata) => {
    return ejs.renderFile('src/templates/interface.ejs', interfaceMetadata);
  });
}

function renderAliases(referenceMetadata:ReferenceMetadata[]): Promise<string>[] {
  return referenceMetadata.map((referenceMetadata) => {
    return ejs.renderFile('src/templates/alias.ejs', referenceMetadata);
  });
}

export async function renderMetadata(metadata:RenderMetadata): Promise<RenderedContent> {
  const objectMetadata = metadata.models.filter((modelMetadata) => isObjectMetadata(modelMetadata)) as ObjectMetadata[];
  const referenceMetadata = metadata.models.filter((modelMetadata) => isReferenceMetadata(modelMetadata)) as ReferenceMetadata[];

  const interfaces = await Promise.all(renderInterfaces(objectMetadata));
  const aliases = await Promise.all(renderAliases(referenceMetadata));

  return {
    interfaces,
    aliases
  };
}