import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Mariana Lopes  ',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Nicolas Lopes',
      email: 'jane.doe@example.com',
    },
    {
      id: '3',
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
    return this.users.find((user) => user.id === id) as User;
  }
}
