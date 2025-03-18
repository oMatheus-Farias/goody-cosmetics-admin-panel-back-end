import { randomUUID } from 'node:crypto';
import path from 'node:path';

export async function processFile(file: File): Promise<File> {
  const ext = path.extname(file.name);
  const fileName = file.name.replace(ext, '');
  const newFileName = `${fileName}-${randomUUID()}${ext}`;

  return new File([file], newFileName, { type: file.type });
}
