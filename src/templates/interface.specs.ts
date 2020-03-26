import 'mocha';
import {expect} from 'chai';
import {renderFile} from 'ejs';

describe.skip('interface.ejs', function() {
  async function renderTemplate(data:any) {
    return renderFile('src/templates/interface.ejs', data, { cache:true });
  }

  it('should render multiple properties', async function() {
    const result = await renderTemplate({
      name: 'Person',
      properties: [
        { name:'firstname', type:'string', required:true },
        { name:'lastname', type:'string', required:false },
        { name:'age', type:'number', required:false }
      ]
    });

    expect(result).to.be.equal('' +
      'interface Person {\n' +
      '  firstname: string;\n' +
      '  lastname?: string;\n' +
      '  age?: number;\n' +
      '}');
  });
});