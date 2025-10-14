import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import {ClodinaryResponse} from "./upload_images.response";
import streamifier from "streamifier";

@Injectable()
export class UploadImagesService {
    upload_images(image: Express.Multer.File): Promise<ClodinaryResponse> {
        return new Promise<ClodinaryResponse>((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(new Error(`Error subida de archivo a cloudinary: ${error.message}`));
                    if (!result) return reject(new Error('Respuesta no obtenida de cloudinary'));
                    resolve(result);
                }
            )
            streamifier.createReadStream(image.buffer).pipe(upload_stream);
        })
    }
}
