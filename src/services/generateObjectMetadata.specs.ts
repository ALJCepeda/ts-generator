import 'mocha';
import { expect } from 'chai';
import { generateObjectMetadata } from './generateObjectMetadata';

describe('generateObjectMetadata', function() {
  it('should generate metadata with simple properties', function() {
    const result = generateObjectMetadata({
      type: 'object',
      properties: {
        firstname: {
          type: 'string'
        },
        birthday: {
          type: 'string',
          format: 'date'
        },
        age: {
          type: 'integer'
        }
      }
    });

    expect(result).to.deep.equal({
      discriminator:'object',
      properties: [{
        name:'firstname',
        required: false,
        schema: {
          discriminator: 'type',
          type: 'string'
        }
      }, {
        name:'birthday',
        required: false,
        schema: {
          discriminator: 'type',
          type: 'string'
        }
      }, {
        name:'age',
        required: false,
        schema: {
          discriminator: 'type',
          type: 'integer'
        }
      }]
    });
  });

  it('should generate metadata with nested objects', function() {
    const result = generateObjectMetadata({
      type: 'object',
      properties: {
        contactInfo: {
          type: 'object',
          properties: {
            phone: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        }
      }
    });

    expect(result).to.deep.equal({
      discriminator:'object',
      properties: [
        {
          name:'contactInfo',
          required: false,
          schema: {
            discriminator: 'object',
            properties: [
              {
                name: 'phone',
                required: false,
                schema: {
                  discriminator: 'type',
                  type: 'string'
                }
              }, {
                name: 'email',
                required: false,
                schema: {
                  discriminator: 'type',
                  type: 'string'
                }
              }
            ]
          }
        }
      ]
    })
  });
});