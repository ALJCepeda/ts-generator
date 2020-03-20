import 'mocha';
import {expect} from 'chai';
import {renderFile } from 'ejs';

describe('allOf.ejs', function() {
  async function renderTemplate(data:any) {
    return renderFile('src/templates/allOf.ejs', data, { cache:true });
  }

  it('should render several types', async function() {
    const result = await renderTemplate({
      name: 'contact',
      schemas: [
        { discriminator: 'reference',  type: 'Person' },
        { discriminator: 'object', properties: [
          { discriminator: 'property', name: 'address', type: 'string', required: true }
        ]},
        { discriminator: 'object', properties: [
          { discriminator: 'property', name: 'phonenumber', type: 'number', required: true }
        ]},
        { discriminator: 'reference',  type: 'Employee' },
      ],
      required: [ 'other', 'name' ]
    });

    expect(result).to.equal('' +
      'type contact = Person & {\n' +
      '  address: string;\n' +
      '} & {\n' +
      '  phonenumber: number;\n' +
      '} & Employee;');
  });
});