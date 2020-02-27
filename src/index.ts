import * as yaml from 'js-yaml';
import * as ejs from 'ejs';
import { readFileSync } from 'fs';
import { JSONSchema7 } from 'json-schema';
import { OpenAPIV3 } from "openapi-types";

const doc = yaml.safeLoad(readFileSync('src/swagger.yaml', 'utf8')) as OpenAPIV3.Document;

function isNonArraySchemaObject(obj: any): obj is OpenAPIV3.NonArraySchemaObject {
  return obj.type === 'object';
}

const data = {
  models: Object.entries(doc.components.schemas).reduce((acc, [key, value]) => {
    if(isNonArraySchemaObject(value)) {
      acc.push({
        name: key,
        ...value as object
      });
    }

    return acc;
  }, [])
};

ejs.renderFile('src/templates/models/interface.ejs', data.models[0], (err, str) => {
  if(err) {
    console.error(err);
  } else {
    console.log(str);
  }
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
