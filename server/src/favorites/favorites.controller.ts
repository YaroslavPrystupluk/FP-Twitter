import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':userId/:postId')
  addFavorite(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return this.favoritesService.addFavorite(userId, postId);
  }

  @Get('pagination')
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

  @Delete(':userId/:postId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return this.favoritesService.removeFavorite(userId, postId);
  }
}
