import * as ejs from "ejs";

interface RenderedContent {
  schemas: string[]
}

interface RenderMetadata {
  schemas: SchemaMetadata[]
}

function renderSchemas(schemaMetadatas:SchemaMetadata[]): Promise<string>[] {
  return schemaMetadatas.map((schemaMetadata) => {
    return ejs.renderFile('src/templates/model.ejs', schemaMetadata);
  });
}

export async function renderMetadata(metadata:RenderMetadata): Promise<RenderedContent> {
  const schemas = await Promise.all(renderSchemas(metadata.schemas));

  return {
    schemas
  };
}