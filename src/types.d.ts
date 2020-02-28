interface PropertyMetadata {
  discriminator: 'alias' | 'property';
  name: string;
  type: string;
}

type ReferenceMetadata = PropertyMetadata;

interface ObjectMetadata {
  discriminator: 'object';
  name: string;
  properties: Array<PropertyMetadata | ObjectMetadata>;
}