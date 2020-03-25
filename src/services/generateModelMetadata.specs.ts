import 'mocha';
import { expect } from 'chai';
import {generateModelMetadata} from "./generateModelMetadata";

describe('generateModelMetadata', function() {
  it('should generate an array of model metadata', function() {
    const result = generateModelMetadata({
      openapi:'3.0.0',
      info: {
        title: 'Test',
        version: '1.0.0'
      },
      paths: {},
      components: {
        schemas: {
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
        }
      }
    });

    expect(result).to.deep.equal([{
      discriminator: 'reference',
      name: 'GeneralError',
      type: 'Error'
    }, {
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
    }]);
  });
});