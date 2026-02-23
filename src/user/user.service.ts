import { Injectable } from '@nestjs/common';
import { parse } from 'path';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
    // injecting services from other module

    constructor(private readonly helloService: HelloService) { }

    getAllUser() {
        return [
            {
                id: 1,
                name: 'Micky',
                email: 'micky@gmail.com'
            },
            {
                id: 2,
                name: 'Mai Trung Hau',
                email: 'mtrunghau@mstsoftware.com'
            },
            {
                id: 3,
                name: 'Donald',
                email: 'donald@gmail.com'
            }
        ]
    }

    getUserById(id: number) {
        const user = this.getAllUser().find(u => u.id === id);
        return user ? user : `User with id ${id} not found`;
    }

    getWelcomeMessage(userId: number) {
        const user = this.getUserById(userId);
        if (typeof user === 'string')
            return user;

        return this.helloService.getHelloWithName(user.name);
    }
}
