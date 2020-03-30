import {mkdirSync} from "fs";

function createDirectory(directory: string) {
  try {
    mkdirSync(directory);
  } catch(e) {
    if(e.code !== 'EEXIST') {
      throw e;
    }
  }
}
export function createDirectories(directories: string[]) {
  directories.forEach((directory) => createDirectory(directory));
}