import * as ejs from "ejs";

function renderSchemas(schemaMetadatas:SchemaMetadata[]): Promise<string>[] {
  return schemaMetadatas.map((schemaMetadata) => {
    return ejs.renderFile('src/templates/schema/model.ejs', schemaMetadata);
  });
}

export async function renderMetadata(renderData: RenderData): Promise<RenderedContent> {
  const schemas = await Promise.all(renderSchemas(renderData.metadata.schemas));

  return {
    schemas
  };
}