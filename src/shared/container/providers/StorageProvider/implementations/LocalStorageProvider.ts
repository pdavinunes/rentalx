import { IStorageProvider } from "../IStorageProvider";

import fs from "fs/promises";
import { resolve } from "path";
import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {

  async save(file: string, folder: string): Promise<string> {
    await fs.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      await fs.stat(filename);
    } catch {
      return;
    }
    fs.unlink(filename);
  }

}

export { LocalStorageProvider }