import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(50, { message: 'Title must be at most 50 characters long' })
    title: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(5, { message: 'Content must be at least 10 characters long' })
    @MaxLength(1000, { message: 'Content must be at most 1000 characters long' })
    content: string;

    @IsNotEmpty({ message: 'Author name is required' })
    @IsString({ message: 'Author name must be a string' })
    @MinLength(2, { message: 'Author name must be at least 3 characters long' })
    @MaxLength(25, { message: 'Author name must be at most 50 characters long' })
    authorName: string
}