import 'mocha';
import { expect } from 'chai';
import { generateObjectMetadata } from '../src/services/generateObjectMetadata';

describe('generateObjectMetadata', function() {
  it('should generate metadata with simple properties', function() {
    const result = generateObjectMetadata('profile', {
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
      name:'profile',
      properties: [{
        discriminator: 'property',
        name:'firstname',
        type:'string'
      }, {
        discriminator: 'property',
        name:'birthday',
        type:'string'
      }, {
        discriminator: 'property',
        name:'age',
        type:'integer'
      }]
    });
  });

  it('should generate metadata with nested objects', function() {
    const result = generateObjectMetadata('profile', {
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
      name:'profile',
      properties: [
        {
          discriminator:'object',
          name:'contactInfo',
          properties: [{
            discriminator: 'property',
            name:'phone',
            type:'string'
          }, {
            discriminator: 'property',
            name:'email',
            type:'string'
          }]
        }
      ]
    })
  });
});