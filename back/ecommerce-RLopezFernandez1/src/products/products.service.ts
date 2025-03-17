import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repositroy";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "src/entities/products.entity";
import * as data from '../data.json'
import { Categories } from "src/entities/categories.entity";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) 
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
) {}

    async getProducts(page: number, limit: number): Promise<Products[]> {
        const products = await this.productsRepository.find();
        const start = (+page - 1) * +limit;
        const end = start + +limit;
        return products.slice(start, end);
    } 

    async addProducts(): Promise<string> {     
    const categories = await this.categoriesRepository.find();

        if(categories.length < 1){
            throw new NotFoundException('Categories not found');
        }

    data.map(async (element)=> { 
        const category = categories.find((category) => category.name === element.category);
        const product = new Products();

        product.name = element.name
        product.description = element.description
        product.price = element.price
        product.stock = element.stock
        product.category = category

        await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orIgnore(`("name") DO NOTHING`)
        .execute();
    })
    return 'Products added';
    }

    async getProductById(id: string): Promise<Products> {
        const product = await this.productsRepository.findOne({where: { id }});
        if (!product) {
            throw new NotFoundException(`Product whith id ${id} not found`);
        }
        return product;
    }


    async createProduct(product: Partial<Products>): Promise<Products> {
        const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name },
        });
        if (existingProduct) {
            throw new BadRequestException(`Product ${product.name} already exists`);
        }

        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct);
      }


    async updateProduct(id: string, product: Partial<Products>): Promise<Products> {
        const oldProduct = await this.productsRepository.findOne({where: { id }});
        if (!oldProduct) {
            throw new NotFoundException(`Product id ${id} not found`);
        }

        const updatedProduct = { ...oldProduct, ...product };
        return await this.productsRepository.save(updatedProduct);      
    }

    async deleteProduct(id: string): Promise<{ message: string }> {
        const product = await this.productsRepository.findOne({where: { id }});
        if (!product) {
            throw new NotFoundException(`Product id ${id} not found`);
        }
        await this.productsRepository.delete(product);
        return { message: `Product with id ${id} has been successfully deleted` };
    }

}

