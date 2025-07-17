import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidateParamsPipe } from '../common/pipes/validate-params.pipe';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(){
        return this.usersService.getAllUsers();
    }
    @Get(":id")
    async findOne(@Param(ValidateParamsPipe) params: FindUserDto) {
        const user = await this.usersService.getOneUser(params.id);
    
        if (!user) {
          throw new NotFoundException(`User with ID ${params.id} not found`);
        }
    
        return user;
      }

    @Get(':id/net-salary')
    async getNetSalary(@Param(ValidateParamsPipe) params: FindUserDto) {
        try {
          return await this.usersService.calculateNetSalary(params.id);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }

}
