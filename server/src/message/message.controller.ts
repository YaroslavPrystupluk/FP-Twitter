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
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create/:receiverId')
  @UsePipes(new ValidationPipe())
  async createMessage(
    @Param('receiverId') receiverId: string,
    @Body() createMessageDto: CreateMessageDto,
    @Req() req,
  ) {
    const senderId = req.user.id;

    return await this.messageService.createMessage(
      receiverId,
      senderId,
      createMessageDto,
    );
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  async getAllMessagesWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user.id;
    return await this.messageService.getMessagesByUser(userId, +page, +limit);
  }

  @Get('pagination/:receiverId')
  async getConversation(
    @Param('receiverId') receiverId: string,
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user.id;
    return await this.messageService.getConversation(
      userId,
      receiverId,
      +page,
      +limit,
    );
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.updateMessage(id, updateMessageDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async removeMessage(@Param('id') id: string) {
    return await this.messageService.removeMessage(id);
  }
}
