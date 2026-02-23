import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    // dependency injection: để ...
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
    ) { }

    async findAll(): Promise<PostEntity[]> {
        return this.postsRepository.find();
    }

    async findOne(id: number): Promise<PostEntity> {
        const singlePost = await this.postsRepository.findOneBy({ id });
        if (!singlePost)
            throw new NotFoundException(`Post with ID ${id} not found`);

        return singlePost;
    }

    async create(createPostData: CreatePostDto): Promise<PostEntity> {
        const newlyCreatedPost = this.postsRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: createPostData.authorName
        });

        return this.postsRepository.save(newlyCreatedPost);
    }

    async update(id: number, updatePostData: UpdatePostDto): Promise<PostEntity> {
        const findPostToUpdate = await this.postsRepository.findOneBy({ id });
        if (!findPostToUpdate) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        if (updatePostData.title) {
            findPostToUpdate.title = updatePostData.title;
        }

        if (updatePostData.content) {
            findPostToUpdate.content = updatePostData.content;
        }

        if (updatePostData.authorName) {
            findPostToUpdate.authorName = updatePostData.authorName;
        }

        return this.postsRepository.save(findPostToUpdate);
    }

    async remove(id: number): Promise<void> {
        const newlyRemovedPost = await this.postsRepository.findOneBy({ id });
        if (!newlyRemovedPost) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        await this.postsRepository.remove(newlyRemovedPost);
    }
}
