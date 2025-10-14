import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    Query,
    UseInterceptors, UploadedFile
} from '@nestjs/common';
import {ProductosService} from './productos.service';
import {CreateProductoDto} from './dto/create-producto.dto';
import {UpdateProductoDto} from './dto/update-producto.dto';
import {IdValidationPipe} from "../common/pipes/id-validation/id-validation.pipe";
import {GetProductosQueryDTO} from "./dto/get-producto.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadImagesService} from "../upload_images/upload_images.service";

@Controller('productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService,
        private readonly uploadImageService: UploadImagesService
    ) {}

    @Post()
    create(@Body() createProductoDto: CreateProductoDto) {
        return this.productosService.create(createProductoDto);
    }

    @Get()
    findAll(@Query() query: GetProductosQueryDTO) {
        return this.productosService.findAll(query.categoria_id, query.take, query.page);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.productosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
        return this.productosService.update(+id, updateProductoDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.productosService.remove(+id);
    }

    @Post("upload_images")
    @UseInterceptors(FileInterceptor("image"))
    upload_images(@UploadedFile() image: Express.Multer.File) {
        if (!image) {
            throw new HttpException("La imagen es obligatoria", HttpStatus.BAD_REQUEST);
        }
        return this.uploadImageService.upload_images(image);
    }
}
