import { Injectable } from '@nestjs/common';
import * as data from '../data.json'
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Categories)private categoryRepository: Repository<Categories>){}

  async getCategories(): Promise<Categories[]> {
    return await this.categoryRepository.find();
  }

  addCategories() {

    data.map(async (product)=>{
      await this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values({name: product.category})
      .orIgnore(`("name") DO NOTHING`)
      .execute();
    })
    return 'Categories added';

  }

}
