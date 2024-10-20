import { CreateAlquranInput } from './create-alquran.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAlquranInput extends PartialType(CreateAlquranInput) {
  id: number;
}
