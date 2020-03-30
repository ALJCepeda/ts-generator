import * as ejs from "ejs";

function renderSchemas(schemaMetadatas:SchemaMetadata[]): Promise<string>[] {
  return schemaMetadatas.map((schemaMetadata) => {
    return ejs.renderFile('src/templates/schema/model.ejs', schemaMetadata);
  });
}

function renderUtility(analysis:MetadataAnalysis): Promise<string>[] {
  const promises = [];

  if(analysis.hasRequired) {
    promises.push(ejs.renderFile('src/templates/utility/require.ejs'));
  }

  return promises;
}


export async function renderMetadata(renderData: RenderData): Promise<RenderedContent> {
  const schemas = await Promise.all(renderSchemas(renderData.metadata.schemas));
  const utility = await Promise.all(renderUtility(renderData.analysis));

  return { schemas, utility };
}