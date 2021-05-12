import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  @Get()
  getAll() {
    return this.rolesService.getAll();
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getByName(name);
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rolesService.delete(id);
  }
}
