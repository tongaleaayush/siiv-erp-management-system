import { save } from "@tauri-apps/plugin-dialog";
import {
  writeFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";

export interface SaveTextFileOptions {
  defaultPath: string;
  content: string;
  filters?: {
    name: string;
    extensions: string[];
  }[];
}

export interface SaveBinaryFileOptions {
  defaultPath: string;
  content: ArrayBuffer;
  filters?: {
    name: string;
    extensions: string[];
  }[];
}

class FileSaveService {
  async saveTextFile({
    defaultPath,
    content,
    filters,
  }: SaveTextFileOptions): Promise<string | null> {
    const filePath = await save({
      defaultPath,
      filters,
    });

    if (!filePath) {
      return null;
    }

    await writeTextFile(filePath, content);

    return filePath;
  }

  async saveBinaryFile({
    defaultPath,
    content,
    filters,
  }: SaveBinaryFileOptions): Promise<string | null> {
    const filePath = await save({
      defaultPath,
      filters,
    });

    if (!filePath) {
      return null;
    }

    await writeFile(filePath, new Uint8Array(content));

    return filePath;
  }
}

export const fileSaveService = new FileSaveService();