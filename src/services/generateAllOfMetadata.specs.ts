import 'mocha';
import { expect } from 'chai';
import {generateAllOfMetadata} from "./generateAllOfMetadata";

describe('generateAllOfMetadata', function() {
  it('should grab types from array', function() {
    const result = generateAllOfMetadata({
      allOf: [
        {
          $ref: '#/components/schemas/person'
        }, {
          type: 'object',
          required: ['address', 'other'],
          properties: {
            address: { type: "string" }
          }
        }, {
          type: 'object',
          required: ['name']
        }
      ]
    });

    expect(result).to.deep.equal({
      discriminator: 'allOf',
      types: [
        {
          discriminator: 'reference',
          type: 'person'
        }, {
          discriminator: 'object',
          properties: [
            {
              name: 'address',
              required: true ,
              schema: {
                discriminator: 'type',
                type: 'string'
              }
            }
        ]}
      ],
      required: [ 'other', 'name' ]
    });
  });
});