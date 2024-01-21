import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @IsNotEmpty()
    userId: string

    parentId: null | string
}
