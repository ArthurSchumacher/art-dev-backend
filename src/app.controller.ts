import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { SendEmailDto } from './dtos/send-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cv')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="Profile.pdf"')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'Profile.pdf'));
    return new StreamableFile(file);
  }

  @Post('/sendMail')
  contactMail(@Body() body: SendEmailDto) {
    return this.appService.sendMail(body);
  }
}
