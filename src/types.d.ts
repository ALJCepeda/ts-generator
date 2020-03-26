type SchemaMetadata = TypeMetadata | ObjectMetadata | ArrayMetadata | AllOfMetadata | AnyOfMetadata;

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

interface CombinatorialMetadata {
  name?: string;
  schemas: Array<SchemaMetadata>,
  required: string[]
}

interface AllOfMetadata extends CombinatorialMetadata {
  discriminator: 'allOf'
}

interface AnyOfMetadata extends CombinatorialMetadata {
  discriminator: 'anyOf'
}

type StringMap = { [key:string]: string };

interface GeneratePropertyMetadataOptions {
  required?: string[],
  formatMap?: StringMap,
  referenceMap?: StringMap,
  useFormatAsType?: boolean
}