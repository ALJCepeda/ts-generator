import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { OpenAPIV3 } from "openapi-types";
import {generateModelMetadata} from "./services/generateModelMetadata";
import {renderMetadata} from "./services/renderMetadata";

const document = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIV3.Document;

const modelMetadata = generateModelMetadata(document);

Promise.all(
  renderMetadata(modelMetadata)
).then((modelCode) => {
  modelCode.forEach((code) => console.log(code));
});

type Require<T, K> = { [P in Extract<keyof T, K>]: T[P] }

type Entity<T> = T & {
  id: number;
  createOn: Date;
}

type MutableEntity<T> = Entity<T> & {
  modifiedOn: Date;
}

interface TimelineEntryMutts {
  message?: string;
  label?: string;
}

interface TimelineEntry extends Require<TimelineEntryMutts, 'message' | 'label'> {

}
/*
class Test implements Entity<TimelineEntry> {
  message: string;
  label: string;
}*/
