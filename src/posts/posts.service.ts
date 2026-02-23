import { Injectable, NotFoundException } from '@nestjs/common';
import type { PostInterface } from './interface/post.interface';

@Injectable()
export class PostsService {
    private posts: PostInterface[] = [
        {
            id: 1,
            title: 'first post',
            content: 'this is my first post',
            authorName: 'maaitlunghau',
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'second post',
            content: 'learning NestJS is awesome',
            authorName: 'maaitlunghau',
            createdAt: new Date(),
        },
        {
            id: 3,
            title: 'third post',
            content: 'building REST API with NestJS',
            authorName: 'maaitlunghau',
            createdAt: new Date(),
        }
    ]

    findAll(): PostInterface[] {
        return this.posts;
    }

    findOne(postId: number): PostInterface {
        const singlePost = this.posts.find(post => post.id === postId);
        if (!singlePost)
            throw new NotFoundException(`Post with ID ${postId} not found`);

        return singlePost;
    }

    create(createPostData: Omit<PostInterface, 'id' | 'createdAt'>): PostInterface {
        const newPost: PostInterface = {
            id: this.getNextId(),
            ...createPostData,
            createdAt: new Date
        }

        this.posts.push(newPost);
        return newPost;
    }

    update(postId: number, updatePostData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>): PostInterface {
        const currentPostIndex = this.posts.findIndex(post => post.id === postId);
        if (currentPostIndex === -1) {
            throw new NotFoundException(`Post with ID ${postId} not found`);
        }

        this.posts[currentPostIndex] = {
            ...this.posts[currentPostIndex],
            ...updatePostData,
            updatedAt: new Date()
        }

        return this.posts[currentPostIndex];
    }

    remove(postId: number): void {
        const currentPostIndex = this.posts.findIndex(post => post.id === postId);
        if (currentPostIndex === -1) {
            throw new NotFoundException(`Post with ID ${postId} not found`);
        }

        this.posts.splice(currentPostIndex, 1);
    }

    private getNextId() {
        return this.posts.length > 0
            ? Math.max(...this.posts.map(post => post.id)) + 1
            : 1;
    }
}
