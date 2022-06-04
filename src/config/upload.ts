import multer from "multer";
import { resolve } from "path"
import crypto from 'crypto'

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (_request, file, cb) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const filename = `${fileHash}-${file.originalname}`

          return cb(null, filename);
        }
      })
    }
  }
}