import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@WebSocketGateway()
export class PostGateway {
  constructor(private readonly postService: PostService) {}

  @SubscribeMessage('createPost')
  create(@MessageBody() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @SubscribeMessage('findAllPost')
  findAll() {
    return this.postService.findAll();
  }

  @SubscribeMessage('findOnePost')
  findOne(@MessageBody() id: number) {
    return this.postService.findOne(id);
  }

  @SubscribeMessage('updatePost')
  update(@MessageBody() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto.id, updatePostDto);
  }

  @SubscribeMessage('removePost')
  remove(@MessageBody() id: number) {
    return this.postService.remove(id);
  }
}
