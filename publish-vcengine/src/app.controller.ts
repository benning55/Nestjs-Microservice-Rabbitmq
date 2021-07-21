import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiKeyAuthGuards } from './auth/apiKey-auth.guard';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  getHello() {
    console.log('fuck');
    this.client.emit(
      'message_printed',
      new Message('Benning is awsome', 'ddd'),
    );
    return { data: 'Hello World printed' };
  }

  @UseGuards(ApiKeyAuthGuards)
  @Post()
  sendToQueue(@Request() req, @Body() body: Message) {
    const message = new Message(body.taskID, body.qrStr);
    this.client.emit('message_printed', message);
    return { data: 'The request is in queue.' };
  }
}
