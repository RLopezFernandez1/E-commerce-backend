import { ArrayMinSize, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000'})
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ description: 'List of products in the order', type: [Products], example: [{ id: 'abc123' }, { id: 'def456' }] })
    @IsNotEmpty()
    @ArrayMinSize(1)
    products: Partial<Products>[];
}