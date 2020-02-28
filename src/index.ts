import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { OpenAPIV3 } from "openapi-types";
import {generateModelMetadata} from "./services/generateModelMetadata";
import {renderMetadata} from "./services/renderMetadata";

const document = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIV3.Document;

const modelMetadata = generateModelMetadata(document);

renderMetadata({
  models: modelMetadata
}).then((content) => {
  content.interfaces.forEach((interfaceCode) => console.log(interfaceCode));
  content.aliases.forEach((aliasCode) => console.log(aliasCode));
});