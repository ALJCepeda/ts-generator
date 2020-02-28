import * as ejs from "ejs";

export function renderMetadata(modelMetadata:Array<ReferenceMetadata | ObjectMetadata>): Promise<string>[] {
  const interfaceMetadata = modelMetadata.filter((metadata) => metadata.discriminator === 'object');

  return interfaceMetadata.map((interfaceMetadata) => {
    return ejs.renderFile('src/templates/interface.ejs', interfaceMetadata);
  });
}