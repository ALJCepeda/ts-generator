interface PropertyMetadata {
  name: string;
  type: string;
}

interface ObjectMetadata {
  name: string;
  type: 'object';
  properties: Array<PropertyMetadata | ObjectMetadata>;
}