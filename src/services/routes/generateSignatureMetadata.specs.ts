import 'mocha';
import { expect } from 'chai';
import {generateSignatureMetadata} from "./generateSignatureMetadata";

describe('generateSignatureMetadata', function() {
  it('should generate signature metadata with a class', function() {
    const result = generateSignatureMetadata('src/routes/Contact.Person.updateAddress');

    expect(result).to.deep.equal({
      folders: ['src', 'routes'],
      fileName: 'Contact',
      className: 'Person',
      methodName: 'updateAddress'
    });
  });

  it('should generate signature metadata with a file', function() {
    const result = generateSignatureMetadata('src/routes/Contact.updateAddress');

    expect(result).to.deep.equal({
      folders: ['src', 'routes'],
      fileName: 'Contact',
      className: undefined,
      methodName: 'updateAddress'
    });
  });

  it('should generate signature metadata with a class', function() {
    const result = generateSignatureMetadata('src/routes/updateAddress');

    expect(result).to.deep.equal({
      folders: ['src', 'routes'],
      fileName: undefined,
      className: undefined,
      methodName: 'updateAddress'
    });
  });
});