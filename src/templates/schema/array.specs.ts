import 'mocha';
import { expect } from 'chai';
import {generateArrayMetadata} from "../../services/schema/generateArrayMetadata";
import {renderFile} from "ejs";

describe('array.ejs', function() {
  it('should render several types', async function() {
    const metadata = generateArrayMetadata({
      type:'array',
      items: {
        allOf: [
          {
            type: 'object',
            properties: {
              firstname: { type:'string' }
            }
          }, {
            type: 'object',
            properties: {
              lastname: { type:'string' }
            }
          }, {
            $ref: '#/components/schemas/Person'
          }
        ]
      }
    });

    const result = await renderFile('src/templates/schema/schema.ejs', metadata);
    expect(result).to.equal('' +
      'Array<{\n' +
      '  firstname?: string;\n' +
      '} & {\n' +
      '  lastname?: string;\n' +
      '} & Person>')
  });
});