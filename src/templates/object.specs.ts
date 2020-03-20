import 'mocha';
import {expect} from 'chai';
import {readFileSync} from "fs";
import {render} from 'ejs';

describe('object.ejs', function() {
  const objectTemplate = readFileSync('src/templates/object.ejs').toString();

  it('should render multiple properties', function() {
    const result = render(objectTemplate, {
      properties: [
        { name:'firstname', type:'string', required:true },
        { name:'lastname', type:'string', required:false },
        { name:'age', type:'number', required:false }
      ]
    });

    expect(result).to.be.equal('{\n' +
      '  firstname: string;\n' +
      '  lastname?: string;\n' +
      '  age?: number;\n' +
      '}');
  });
});