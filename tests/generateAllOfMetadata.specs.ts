import 'mocha';
import { expect } from 'chai';
import {generateAllOfMetadata} from "../src/services/generateAllOfMetadata";

describe('generateAllOfMetadata', function() {
  it('should grab types from array', function() {
    const result = generateAllOfMetadata('contact', [
      { $ref: '#/components/schemas/person' }
    ])
  });
});