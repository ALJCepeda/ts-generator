interface SimpleTypeMetadata {
  discriminator: 'property' | 'reference';
  name: string;
  type: string;
}

interface PropertyMetadata extends SimpleTypeMetadata{
  discriminator: 'property';
  required: boolean;
}

interface ReferenceMetadata extends SimpleTypeMetadata {
  discriminator: 'reference';
}

interface ObjectMetadata {
  discriminator: 'object';
  name: string;
  properties: Array<PropertyMetadata | ObjectMetadata>;
}