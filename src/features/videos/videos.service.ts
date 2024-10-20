import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideosService {
  create(createVideoInput: CreateVideoInput) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all videos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
