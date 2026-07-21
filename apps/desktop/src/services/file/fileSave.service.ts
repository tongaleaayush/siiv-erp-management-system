import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export interface SaveTextFileOptions {
  defaultPath: string;
  content: string;
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

  console.log("Opening save dialog...");

  const filePath = await save({
    defaultPath,
    filters,
  });

  console.log("Selected path:", filePath);

  if (!filePath) {
    return null;
  }

  await writeTextFile(filePath, content);

  return filePath;
}
}

export const fileSaveService = new FileSaveService();