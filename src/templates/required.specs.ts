import 'mocha';
import { expect } from 'chai';
import {generateCombinatorialMetadata} from "../services/generateCombinatorialMetadata";
import {renderFile} from "ejs";

describe('required.ejs', function() {
  it('should render required metadata', async function() {
    const metadata = generateCombinatorialMetadata({
      allOf: [
        {
          $ref: '#/components/schemas/Person'
        }, {
          type: 'object',
          required: ['address', 'other'],
          properties: {
            address: { type: "string" }
          }
        }, {
          type: 'object',
          required: ['name']
        }
      ]
    });

    const result = await renderFile('src/templates/schema.ejs', metadata);
    expect(result).to.equal('' +
      'Required<Person & {\n' +
      '  address: string;\n' +
      '}, "other" | "name">')
  });
});