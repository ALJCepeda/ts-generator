import 'mocha';
import {expect} from 'chai';
import {renderFile} from 'ejs';
import {generateObjectMetadata} from "../services/generateObjectMetadata";

describe('object.ejs', function() {
  it('should render multiple properties', async function() {
    const metadata = generateObjectMetadata({
      type: 'object',
      properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        age: { type: 'number' }
      },
      required: [ 'firstname' ]
    });

    const result = await renderFile('src/templates/schema.ejs', metadata, { cache: true });

    expect(result).to.be.equal('{\n' +
      '  firstname: string;\n' +
      '  lastname?: string;\n' +
      '  age?: number;\n' +
      '}');
  });
});