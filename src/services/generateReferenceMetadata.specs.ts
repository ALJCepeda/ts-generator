import 'mocha';
import { expect } from 'chai';
import {generateReferenceMetadata} from "./generateReferenceMetadata";

describe('generateReferenceMetadata', function() {
  it('should grab type off of definition', function() {
    const result = generateReferenceMetadata('GenericError', {
      $ref: '#/components/schemas/Error'
    });

    expect(result).to.deep.equal({
      discriminator: 'reference',
      name:'GenericError',
      type:'Error'
    });
  });
});