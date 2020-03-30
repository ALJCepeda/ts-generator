import 'mocha';
import {expect} from 'chai';
import {renderFile} from 'ejs';
import {generateModelMetadata} from "../../services/schema/generateModelMetadata";

describe('model.ejs', function() {
  async function renderTemplate(data:any) {
    return renderFile('src/templates/schema/model.ejs', data, { cache:true });
  }

  it('should render interface from object schema', async function() {
    const metadata = generateModelMetadata({
      Person: {
        type: 'object',
        properties: {
          firstname: { type:'string' },
          lastname: { type:'string' }
        }
      }
    });

    const result = await renderTemplate(metadata[0]);
    expect(result).to.equal('' +
      'interface Person {\n' +
      '  firstname?: string;\n' +
      '  lastname?: string;\n' +
      '}');
  });

  it('should render type fro non-object schema', async function() {
    const metadata = generateModelMetadata({
      Error: {
        oneOf: [
          { $ref: '#/components/schemas/GenericError' },
          {
            type:'object',
            properties: {
              status: { type:'number' },
              message: { type:'string' }
            }
          },
          { $ref: '#/components/schemas/OtherError'}
        ]
      }
    });

    const result = await renderTemplate(metadata[0]);
    expect(result).to.equal('' +
      'type Error = GenericError | {\n' +
      '  status?: number;\n' +
      '  message?: string;\n' +
      '} | OtherError;');
  })
});