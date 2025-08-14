import { Body, Controller, Get, NotFoundException, Param, Post, Delete, Put } from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User) {
    const userIndex = this.users.findIndex((user) => user.id === Number(id))

    if (userIndex === -1) {
      return { error: 'User not found' }
    }

    const originalUser = this.users[userIndex]

    this.users[userIndex] = {
      id: Number(id),
      name: user.name || originalUser.name,
      email: user.email || originalUser.email,
    }

    return this.users[userIndex]
  }
}
