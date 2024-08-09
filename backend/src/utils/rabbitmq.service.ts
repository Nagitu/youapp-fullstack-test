import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.connection = await amqp.connect('amqp://localhost:5672'); 
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('message_queue', { durable: true });
  }

  async sendMessage(message: string) {
    if (!this.channel) {
      await this.initialize();
    }
    this.channel.sendToQueue('message_queue', Buffer.from(message), {
      persistent: true,
    });
  }
}
