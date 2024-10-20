import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';


@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
