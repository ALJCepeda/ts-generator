import 'mocha';
import {expect} from 'chai';
import {renderFile} from 'ejs';
import {generateTypeMetadata} from "../../services/schema/generateTypeMetadata";

describe('type.ejs', function() {
  it('should render type metadata', async function() {
    const metadata = generateTypeMetadata({
      type: 'string'
    });
    const result = await renderFile('src/templates/schema/schema.ejs', metadata, { cache: true });

    expect(result).to.equal('string');
  });

  it('should render metadata from reference', async function() {
    const metadata = generateTypeMetadata({
      $ref: '#/components/schemas/Error'
    });

    const result = await renderFile('src/templates/schema/schema.ejs', metadata, { cache: true });

    expect(result).to.equal('Error');
  })
});