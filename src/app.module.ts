import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlquranModule } from './features/alquran/alquran.module';
import { GoogleModule } from './features/google/google.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './features/videos/videos.module';
import { NotesModule } from './features/notes/notes.module';
import { QuizzesModule } from './features/quizzes/quizzes.module';
import { YoutubeModule } from './features/youtube/youtube.module';
import { StoreDataService } from './help/store-data/store-data.service';

@Module({
  imports: [AlquranModule, GoogleModule, UserModule, AuthModule, VideosModule, NotesModule, QuizzesModule, YoutubeModule],
  controllers: [AppController],
  providers: [AppService, StoreDataService],
})
export class AppModule {}
