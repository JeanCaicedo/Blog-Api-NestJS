import { Body, Controller, Get, NotFoundException, Param, Post, Delete } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: 1,
      name: 'Mariana Lopes  ',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Nicolas Lopes',
      email: 'jane.doe@example.com',
    },
    {
      id: 3,
      name: 'Johann',
      email: 'john.smith@example.com',
    },
  ];

  @Get()
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string): User {
    const userId = parseInt(id);
    const user = this.users.find((user) => user.id === userId) as User;
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  @Post()
  createUser(@Body() body: { name: string; email: string }): User {
    // Generar automáticamente el siguiente ID disponible
    const nextId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      name: body.name,
      email: body.email,
    };

    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    const userId = parseInt(id);
    const position = this.users.findIndex((user) => user.id === userId);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(position, 1);
    return;
  }
}
