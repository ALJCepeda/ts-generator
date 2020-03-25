type SchemaMetadata = TypeMetadata | ReferenceMetadata | ObjectMetadata | ArrayMetadata | AllOfMetadata;

interface TypeMetadata {
  name?: string;
  type: string;
  discriminator: 'type';
}

type PropertyMetadata<T> = {
  name: string;
  required: boolean;
  schema:T
}

interface ReferenceMetadata {
  name?: string;
  type: string;
  discriminator: 'reference';
}

interface ObjectMetadata {
  name?: string;
  discriminator: 'object';
  properties: Array<PropertyMetadata<SchemaMetadata>>;
}

interface ArrayMetadata {
  name?: string;
  discriminator: 'array';
  items: SchemaMetadata
}

interface AllOfMetadata {
  name?: string;
  discriminator: 'allOf',
  types: Array<SchemaMetadata>,
  required: string[]
}

type StringMap = { [key:string]: string };

interface GeneratePropertyMetadataOptions {
  required?: string[],
  formatMap?: StringMap,
  referenceMap?: StringMap,
  useFormatAsType?: boolean
}