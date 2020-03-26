import 'mocha';
import { expect } from 'chai';
import { generatePropertyMetadata } from './generatePropertyMetadata';

describe('generatePropertyMetadata', function() {
  it('should create metadata for string type', function() {
    const result = generatePropertyMetadata('firstname', { type:'string' });
    expect(result).to.deep.equal({
      name: 'firstname',
      required: false,
      schema: {
        discriminator: 'type',
        type: 'string'
      }
    });
  });

  it('should create metadata for string type and make it required', function() {
    const result = generatePropertyMetadata('firstname', { type:'string' }, { required:['firstname'] });
    expect(result).to.deep.equal({
      name: 'firstname',
      required: true,
      schema: {
        discriminator: 'type',
        type: 'string'
      }
    });
  });

  it('should create metadata for date type if there\'s a map', function() {
    const result = generatePropertyMetadata('birthday', {
      type:'string',
      format:'date'
    }, {
      formatMap: { 'date':'Moment' }
    });

    expect(result).to.deep.equal({
      name:'birthday',
      required: false,
      schema: {
        discriminator: 'type',
        type: 'Moment'
      }
    })
  });

  it('should use format as type when specified', function() {
    const result = generatePropertyMetadata('ip', {
      type:'string',
      format:'ipv4'
    }, {
      useFormatAsType: true
    });

    expect(result).to.deep.equal({
      name:'ip',
      required: false,
      schema: {
        discriminator: 'type',
        type: 'ipv4'
      }
    });
  });

  it('should grab type from provided reference map', function() {
    const result = generatePropertyMetadata('error', {
      $ref: '#/components/schemas/Error'
    }, {
      referenceMap: { '#/components/schemas/Error':'Error' }
    });

    expect(result).to.deep.equal({
      name:'error',
      required: false,
      schema: {
        discriminator: 'type',
        type: 'Error'
      }
    });
  });
});
