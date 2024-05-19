import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { AuthorGuard } from 'src/guards/author.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create(createPostDto, req.user);
  }

  @Get('/pagination')
  @UsePipes(new ValidationPipe())
  findAllWhithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.postService.findAllWhithPagination(req.user.id, +page, +limit);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  findAll(@Req() req) {
    return this.postService.findAll(req.user);
  }

  @Get(':textOrId')
  @UsePipes(new ValidationPipe())
  findOne(@Param('textOrId') textOrId: string) {
    return this.postService.findOne(textOrId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthorGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthorGuard)
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Post('/toggleFavorite')
  @UsePipes(new ValidationPipe())
  toggleFavorite(@Body('id') id: string, @Req() req) {
    return this.postService.toggleFavorite(id, req.user);
  }
}
