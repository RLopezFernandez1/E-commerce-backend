import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {

    constructor(private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products) private productsRepository: Repository<Products>
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string) {

        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }

        const result = await this.fileUploadRepository.uploadImage(file);

        await this.productsRepository.update(product.id, { imgUrl: result.secure_url });

        return await this.productsRepository.findOneBy({ id: productId }) // se obtiene el producto actualizado
    }
}
