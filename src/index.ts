import * as yaml from 'js-yaml';
import { readFileSync, createWriteStream } from 'fs';
import { OpenAPIV3 } from "openapi-types";
import {generateModelMetadata} from "./services/generateModelMetadata";
import {renderMetadata} from "./services/renderMetadata";

const document = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIV3.Document;

const modelMetadata = generateModelMetadata(document);

renderMetadata({
  models: modelMetadata
}).then((content) => {
  const declarationFile = createWriteStream('gen/types.d.ts');

  content.types.forEach((typeCode) => declarationFile.write(typeCode + ';\n'))
  declarationFile.write('\n');
  content.interfaces.forEach((interfaceCode) => declarationFile.write(interfaceCode + '\n'));

  declarationFile.end();
});