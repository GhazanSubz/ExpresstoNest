import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { validate } from 'class-validator';
  
  @Injectable()
  export class ValidateParamsPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
  
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
  
      if (errors.length > 0) {
        const message = errors
          .map(err => Object.values(err.constraints || {}).join(', '))
          .join(', ');
        throw new BadRequestException(message);
      }
  
      return object;
    }
  
    private toValidate(metatype: any): boolean {
      const types: any[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
  }