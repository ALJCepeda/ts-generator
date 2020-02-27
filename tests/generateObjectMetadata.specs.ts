import 'mocha';
import { expect } from 'chai';
import { generateObjectMetadata } from '../src/services/generateObjectMetadata';

describe.only('generateObjectMetadata', function() {
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
      name:'profile',
      type:'object',
      properties: [
        { name:'firstname', type:'string' },
        { name:'birthday', type:'string' },
        { name:'age', type:'integer' }
      ]
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
      name:'profile',
      type:'object',
      properties: [
        {
          name:'contactInfo',
          type:'object',
          properties: [
            { name:'phone', type:'string' },
            { name:'email', type:'string' }
          ]
        }
      ]
    })
  });
});