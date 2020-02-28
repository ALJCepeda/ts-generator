import 'mocha';
import { expect } from 'chai';
import { generatePropertyMetadata } from '../src/services/generatePropertyMetadata';

describe.only('generatePropertyMetadata', function() {
  it('should create metadata for string type', function() {
    const result = generatePropertyMetadata('firstname', { type:'string' });
    expect(result).to.deep.equal({
      discriminator: 'property',
      name: 'firstname',
      type: 'string',
      required: false
    });
  });

  it('should create metadata for string type and make it required', function() {
    const result = generatePropertyMetadata('firstname', { type:'string' }, { required:['firstname'] });
    expect(result).to.deep.equal({
      discriminator: 'property',
      name: 'firstname',
      type: 'string',
      required: true
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
      discriminator: 'property',
      name:'birthday',
      type:'Moment',
      required: false
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
      discriminator: 'property',
      name:'ip',
      type:'ipv4',
      required: false
    });
  });

  it('should grab type from provided reference map', function() {
    const result = generatePropertyMetadata('error', {
      $ref: '#/components/schemas/Error'
    }, {
      referenceMap: { '#/components/schemas/Error':'Error' }
    });

    expect(result).to.deep.equal({
      discriminator: 'property',
      name:'error',
      type:'Error',
      required: false
    });
  });
});
