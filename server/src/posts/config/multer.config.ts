import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const ext = file.originalname.split('.')[1];
      cb(null, `${name}-${Date.now()}.${ext}`);
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
};
