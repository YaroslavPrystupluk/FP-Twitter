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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { AuthorGuard } from 'src/guards/author.guard';
import { multerConfig } from '../config/multer.config';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 10 }], multerConfig),
  )
  @UsePipes(new ValidationPipe())
  async create(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ) {
    return await this.postService.create(createPostDto, req.user, files);
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  async findAllWhithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.postService.findAllWhithPagination(
      req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async findAll(@Req() req) {
    return await this.postService.findAll(req.user.id);
  }

  @Get('search/:textOrId')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('textOrId') textOrId: string) {
    return await this.postService.findOne(textOrId);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 20 }], multerConfig),
  )
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthorGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
  ) {
    return await this.postService.update(id, updatePostDto, files);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthorGuard)
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }

  @Delete(':id/:imageName')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthorGuard)
  async deleteFile(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
  ) {
    return await this.postService.removeFile(id, imageName);
  }
}
