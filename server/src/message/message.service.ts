import { Injectable } from '@nestjs/common';
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
  createMessage(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  getMessagesByUser(userId: string, page: number, limit: number) {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],

      order: {
        createdAt: 'DESC',
      },

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getConversation(
    userId: string,
    receiverId: string,
    page: number,
    limit: number,
  ) {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: receiverId } },
        { sender: { id: receiverId }, receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],

      order: {
        createdAt: 'DESC',
      },

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    const messageUpdated = this.messageRepository.update(id, updateMessageDto);
    return messageUpdated;
  }

  removeMessage(id: string) {
    this.messageRepository.delete(id);
    return id;
  }
}
