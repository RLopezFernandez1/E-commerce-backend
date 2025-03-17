import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Products } from "src/entities/products.entity";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    getProducts(@Query("page") page: number, @Query("limit") limit: number){
        if(page && limit){
            return this.productsService.getProducts(page, limit);
        }
        return this.productsService.getProducts(1, 5);
    }
    @Get("seeder")
    addProducts(){
        return this.productsService.addProducts();
    }

    @Get(":id")
    getProductById(@Param("id") id: string){
        return this.productsService.getProductById(id);
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() product: Partial<Products>){   //luego probar un Partial<Product>
        return this.productsService.createProduct(product);

    }

    @ApiBearerAuth()
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param("id") id: string, @Body() product: Partial<Products>){  //luego probar un Partial<Product>
        return this.productsService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteProduct(@Param("id") id: string){
        return this.productsService.deleteProduct(id);
    }
}
