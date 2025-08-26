import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_FILE_PATH } from './upload';

@Controller('uploads')
export class UploadsController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_FILE_PATH,
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${file.fieldname}-${uniqueSuffix}.json`;
          cb(null, filename);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/json') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only JSON files are allowed!'), false);
        }
      },
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File Upload Successfully', filename: file.filename };
  }
}
