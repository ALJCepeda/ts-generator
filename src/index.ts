import * as yaml from 'js-yaml';
import {readFileSync} from 'fs';
import {renderMetadata} from "./services/renderMetadata";
import {OpenAPIObject} from "openapi3-ts";
import {generateMetadata} from "./services/generateMetadata";
import {analyzeMetadata} from "./services/analyzeMetadata";
import {writeContent} from "./services/writeContent";
import {createDirectories} from "./services/createDirectories";

const document = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIObject;
const metadata = generateMetadata(document);
const analysis = analyzeMetadata(metadata);

createDirectories([ 'gen' ]);

renderMetadata({
  metadata,
  analysis
}).then((content) => writeContent('gen/types.d.ts', content));
