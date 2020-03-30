import 'mocha';
import { expect } from 'chai';
import {generateModelMetadata} from "./generateModelMetadata";

describe('generateModelMetadata', function() {
  it('should generate an array of model metadata', function() {
    const result = generateModelMetadata({
      Person: {
        type:'object',
        properties: {
          firstname: {
            type:'string'
          }
        }
      },
      GeneralError: {
        $ref:'#/components/schemas/Error'
      }
    });

    expect(result).to.deep.equal([{
      discriminator: 'object',
      name: 'Person',
      properties: [{
        name: 'firstname',
        required: false,
        schema: {
          discriminator: 'type',
          type: 'string'
        }
      }]
    }, {
      discriminator: 'type',
      name: 'GeneralError',
      type: 'Error'
    }]);
  });
});