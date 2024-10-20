import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises'; // using the promise-based fs module
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';

@Injectable()
export class YoutubeService {
  private readonly youtubeKey: string;
  private readonly channelId: string;
  private readonly maxRecentTalks: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.youtubeKey = this.configService.get<string>('GOOGLE_API_KEY');
    this.channelId = this.configService.get<string>('YOUTUBE_CHANNEL_ID');
    this.maxRecentTalks = '48';
  }

  async getRecentVids(): Promise<void> {
    const videosUrl = new URL('https://youtube.googleapis.com/youtube/v3/search');
    videosUrl.searchParams.set('part', 'snippet');
    videosUrl.searchParams.set('maxResults', this.maxRecentTalks);
    videosUrl.searchParams.set('key', this.youtubeKey);
    videosUrl.searchParams.set('type', 'video');
    videosUrl.searchParams.set('channelId', this.channelId);
    videosUrl.searchParams.set('order', 'date');

    try {
      const response = await this.httpService.get(videosUrl.toString()).toPromise();
      const { items } = response.data;
      items.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime());
      
      const filteredItems = items.filter(item => item.id.kind === 'youtube#video' && item.snippet.title.includes('|'));
      await fs.writeFile('database/data/RecentVideos.json', JSON.stringify(filteredItems, null, 2));

      console.log('Data fetched and written successfully');
    } catch (error) {
      console.error(`Could not get videos: ${error.message}`);
    }
  }

  async getPlaylists(): Promise<void> {
    const playlistsUrl = new URL('https://youtube.googleapis.com/youtube/v3/playlists');
    playlistsUrl.searchParams.set('part', 'snippet');
    playlistsUrl.searchParams.set('maxResults', this.maxRecentTalks);
    playlistsUrl.searchParams.set('key', this.youtubeKey);
    playlistsUrl.searchParams.set('channelId', this.channelId);
    playlistsUrl.searchParams.set('order', 'date');

    try {
      const response = await this.httpService.get(playlistsUrl.toString()).toPromise();
      const { items } = response.data;
      await fs.writeFile('database/data/YTPlaylist.json', JSON.stringify(items, null, 2));

      console.log('Playlists fetched and written successfully');
    } catch (error) {
      if (error.response?.status === 403) {
        console.error('403 Forbidden');
      } else {
        console.error(`Could not get playlists: ${error.message}`);
      }
    }
  }

  async getChannel(): Promise<void> {
    const channelUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
    channelUrl.searchParams.set('part', 'snippet');
    channelUrl.searchParams.set('key', this.youtubeKey);
    channelUrl.searchParams.set('id', this.channelId);

    try {
      const response = await this.httpService.get(channelUrl.toString()).toPromise();
      const { items } = response.data;
      await fs.writeFile('database/data/YTChannel.json', JSON.stringify(items, null, 2));

      console.log('Channel data fetched and written successfully');
    } catch (error) {
      if (error.response?.status === 403) {
        console.error('403 Forbidden');
      } else {
        console.error(`Could not get channel: ${error.message}`);
      }
    }
  }

  async getPlaylistItem(playlists: any[]): Promise<void> {
    const playlistItems = [];

    for (let i = 2; i < playlists.length; i++) {
      const playlistUrl = new URL('https://youtube.googleapis.com/youtube/v3/playlistItems');
      playlistUrl.searchParams.set('part', 'snippet');
      playlistUrl.searchParams.set('maxResults', this.maxRecentTalks);
      playlistUrl.searchParams.set('key', this.youtubeKey);
      playlistUrl.searchParams.set('playlistId', playlists[i].id);

      try {
        const response = await this.httpService.get(playlistUrl.toString()).toPromise();
        const { items } = response.data;
        playlistItems.push(items);
        await fs.writeFile(`database/data/playlist-${i}.json`, JSON.stringify(items, null, 2));

        console.log(`Playlist-${i} fetched and written successfully`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.error('403 Forbidden');
        } else {
          console.error(`Could not get playlist items: ${error.message}`);
        }
      }
    }

    await fs.writeFile('database/data/playlistItems.json', JSON.stringify(playlistItems, null, 2));
    console.log('Playlist items written successfully');
  }

  async remap(playlists: any[], playlistItems: any[]): Promise<void> {
    const remap = {};

    for (let i = 0; i < playlists.length; i++) {
      remap[playlists[i].id] = playlistItems[i];
    }

    await fs.writeFile('database/data/playlistItems1.json', JSON.stringify(remap, null, 2));
    console.log('Remapped playlist items written successfully');
  }
}
