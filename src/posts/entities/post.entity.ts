import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')  // ← Thêm decorator này!
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column()
    authorName: string;

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date
}