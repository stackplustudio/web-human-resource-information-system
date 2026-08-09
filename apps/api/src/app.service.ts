import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🚀 StackPlus HRIS API is Running Smoothly!';
  }
}