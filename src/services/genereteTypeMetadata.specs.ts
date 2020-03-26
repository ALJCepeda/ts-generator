import 'mocha';
import { expect } from 'chai';
import {generateTypeMetadata} from "./generateTypeMetadata";

describe('generateTypeMetadata', function() {
  it('should grab type off of definition', function() {
    const result = generateTypeMetadata({
      $ref: '#/components/schemas/Error'
    });

    expect(result).to.deep.equal({
      discriminator: 'type',
      type:'Error'
    });
  });
});