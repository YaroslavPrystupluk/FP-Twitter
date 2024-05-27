import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritesDto } from './create-favorites.dto';

export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {}
