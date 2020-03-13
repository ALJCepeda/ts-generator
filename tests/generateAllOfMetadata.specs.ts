import 'mocha';
import { expect } from 'chai';
import {generateAllOfMetadata} from "../src/services/generateAllOfMetadata";

describe('generateAllOfMetadata', function() {
  it('should grab types from array', function() {
    const result = generateAllOfMetadata('contact', [
      { $ref: '#/components/schemas/person' },
      {
        type: 'object',
        required: ['address', 'other'],
        properties: {
          address: { type: "string" }
        }
      },
      {
        type: 'object',
        required: ['name']
      }
    ]);

    expect(result).to.deep.equal({
      name: 'contact',
      types: [
        { discriminator: 'reference',  type: 'person' },
        { discriminator: 'object', properties: [
          { discriminator: 'property', name: 'address', type: 'string', required: true }
        ]}
      ],
      required: [ 'other', 'name' ]
    });
  });
});