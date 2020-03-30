import * as yaml from 'js-yaml';
import {readFileSync, createWriteStream, mkdirSync} from 'fs';
import {generateModelMetadata} from "./services/schema/generateModelMetadata";
import {renderMetadata} from "./services/renderMetadata";
import {getSchemas} from "./services/schema/getSchemas";
import {OpenAPIObject} from "openapi3-ts";

const document = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIObject;

const schemas = getSchemas(document);
const schemaMetadatas = generateModelMetadata(schemas);

try {
  mkdirSync('gen');
} catch(e) {
  if(e.code !== 'EEXIST') {
    throw e;
  }
}

renderMetadata({
  schemas: schemaMetadatas
}).then((content) => {
  const declarationFile = createWriteStream('gen/types.d.ts');

  content.schemas.forEach((schemaCode) => declarationFile.write(schemaCode + '\n\n'));

  declarationFile.end();
});
