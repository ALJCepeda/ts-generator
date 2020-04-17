export function generateSignatureMetadata(operationId:string) {
  let folders:string[] = [];
  let fileName, className, methodName;

  const folderParts = operationId.split('/');
  if(folderParts.length > 1) {
    folders = folderParts.slice(0, -1);
  }

  const signatureParts = folderParts.slice(-1)[0].split('.');
  if(signatureParts.length > 3) {
    throw new Error('Signature can be, at most, 3 parts [FileName].[ClassName].[MethodName] or [FileName].[MethodName] or [MethodName]');
  }

  if(signatureParts.length === 3) {
    [fileName, className, methodName] = signatureParts;
  }

  if(signatureParts.length === 2) {
    [fileName, methodName] = signatureParts;
  }

  if(signatureParts.length === 1) {
    [methodName] = signatureParts;
  }

  return { folders, fileName, className, methodName };
}