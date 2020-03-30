import {createWriteStream} from "fs";

export function writeContent(filePath:string, content: RenderedContent) {
  const declarationFile = createWriteStream(filePath);

  content.utility.forEach((utilityCode) => declarationFile.write(utilityCode + '\n\n'));
  content.schemas.forEach((schemaCode) => declarationFile.write(schemaCode + '\n\n'));

  declarationFile.end();
}