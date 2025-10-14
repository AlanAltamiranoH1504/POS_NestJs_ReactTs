import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload_images.service';
import { upload_images_provider } from './upload_images';

@Module({
  providers: [UploadImagesService, upload_images_provider]
})
export class UploadImagesModule {}
