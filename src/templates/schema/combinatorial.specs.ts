import 'mocha';
import {expect} from 'chai';
import {renderFile } from 'ejs';
import {generateCombinatorialMetadata} from "../../services/schema/generateCombinatorialMetadata";

describe('combinatorial.ejs', function() {
  async function renderTemplate(data:any) {
    return renderFile('src/templates/schema/schema.ejs', data, { cache:true });
  }

  it('should render several types', async function() {
    const metadata = generateCombinatorialMetadata({
      allOf: [
        {
          $ref: '#/components/schemas/Person'
        }, {
          type: 'object',
          properties: {
            address: { type: 'string' }
          },
          required: ['address']
        }, {
          type: 'object',
          properties: {
            phonenumber: { type: 'number' }
          }
        }, {
          $ref: '#/components/schemas/Employee'
        }
      ]
    });

    const result = await renderTemplate(metadata);
    expect(result).to.equal('' +
      'Person & {\n' +
      '  address: string;\n' +
      '} & {\n' +
      '  phonenumber?: number;\n' +
      '} & Employee');
  });
});