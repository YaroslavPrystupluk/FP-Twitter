import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: path.join(__dirname, '../../../uploads'),
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      cb(null, `${name}-${Date.now()}`);
    },
  }),
  fileFilter(req, file: Express.Multer.File, cb) {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
      return cb(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
};
