import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from 'src/posts/posts.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id }: { id: string } = await request.params;
    if (!id) {
      throw new NotFoundException('Post ID is missing');
    }

    const post = await this.postService.findOne(id);

    if (!post) throw new NotFoundException('Post not found');

    const user = request.user;

    if (!user) throw new NotFoundException('User not found');

    if (post.user.id !== user.id)
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

    if (post && user && post.user.id === user.id) return true;

    return false;
  }
}
