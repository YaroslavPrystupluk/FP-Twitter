import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':postId')
  addFavorite(@Param('postId') postId: string, @Req() req) {
    const userId = req.user.id;
    return this.favoritesService.addFavorite(userId, postId);
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  async findAllWhithPaginationFavorite(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.favoritesService.findAllWhithPaginationFavorite(
      req.user.id,
      +page,
      +limit,
    );
  }

  @Delete(':postId')
  removeFavorite(@Param('postId') postId: string, @Req() req) {
    const userId = req.user.id;
    return this.favoritesService.removeFavorite(userId, postId);
  }
}
