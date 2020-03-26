import 'mocha';
import { expect } from 'chai';
import {generateCombinatorialMetadata} from "./generateCombinatorialMetadata";

describe('generateCombinatorialMetadata', function() {
  it('should generate allOf schema', function() {
    const result = generateCombinatorialMetadata({
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
      schemas: [
        {
          discriminator: 'type',
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