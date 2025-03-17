import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategories(): string;
}
