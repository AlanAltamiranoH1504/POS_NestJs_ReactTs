import {v2 as cloudinary} from 'cloudinary';
import * as process from "node:process";
export const upload_images_provider = {
    provide: "CLOUDINARY",
    useFactory: () => {
        return cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.API_KEY_CLOUDINARY,
            api_secret: process.env.API_SECRET_CLOUDINARY
        });
    }
}