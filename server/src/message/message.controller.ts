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

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  getAllMessagesWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user.id;
    return this.messageService.getMessagesByUser(userId, +page, +limit);
  }

  @Get('pagination/:receiverId')
  getConversation(
    @Param('receiverId') receiverId: string,
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user.id;
    return this.messageService.getConversation(
      userId,
      receiverId,
      +page,
      +limit,
    );
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.updateMessage(id, updateMessageDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  removeMessage(@Param('id') id: string) {
    return this.messageService.removeMessage(id);
  }
}
