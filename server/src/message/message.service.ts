import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
  ) {}
  async createMessage(
    receiverId: string,
    senderId: string,
    createMessageDto: CreateMessageDto,
  ) {
    const receiver = await this.userService.findOne(receiverId);

    const sender = await this.userService.findOne(senderId);

    if (!receiver || !sender) {
      throw new NotFoundException('User not found');
    }

    if (receiverId === String(senderId)) {
      throw new BadRequestException('User cannot send message to themselves');
    }

    const newMessage = {
      ...createMessageDto,
      sender,
      receiver,
    };
    return await this.messageRepository.save(newMessage);
  }

  async getMessagesByUser(userId: string, page: number, limit: number) {
    return await this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      order: {
        createdAt: 'DESC',
      },
      relations: ['sender', 'receiver'],

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getConversation(
    userId: string,
    receiverId: string,
    page: number,
    limit: number,
  ) {
    return await this.messageRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: receiverId } },
        { sender: { id: receiverId }, receiver: { id: userId } },
      ],
      order: {
        createdAt: 'DESC',
      },
      relations: ['sender', 'receiver'],

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    const messageUpdated = this.messageRepository.update(id, updateMessageDto);
    return messageUpdated;
  }

  async removeMessage(id: string) {
    this.messageRepository.delete(id);
    return id;
  }
}
