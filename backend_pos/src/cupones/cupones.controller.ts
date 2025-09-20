import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode} from '@nestjs/common';
import {CuponesService} from './cupones.service';
import {CreateCuponeDto} from './dto/create-cupone.dto';
import {UpdateCuponeDto} from './dto/update-cupone.dto';
import {IdValidationPipe} from "../common/pipes/id-validation/id-validation.pipe";
import {AplicarCuponDtoTs} from "./dto/aplicar-cupon.dto.ts";

@Controller('cupones')
export class CuponesController {
    constructor(private readonly cuponesService: CuponesService) {
    }

    @Post()
    create(@Body() createCuponeDto: CreateCuponeDto) {
        return this.cuponesService.create(createCuponeDto);
    }

    @Get()
    findAll() {
        return this.cuponesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.cuponesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updateCuponeDto: UpdateCuponeDto) {
        return this.cuponesService.update(+id, updateCuponeDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.cuponesService.remove(+id);
    }

    @Post("/aplicar_cupon")
    @HttpCode(200)
    aplicar_cupon(@Body() aplicarCuponDto: AplicarCuponDtoTs) {
        return this.cuponesService.aplicar_cupon(aplicarCuponDto);
    }
}
