import * as fs from 'fs';
import { resolve } from 'path';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import axios from 'axios';
import { Logger } from 'winston';
import { GoogleAuth } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { DatabaseService } from '@/core/database/database.service';



@Injectable()
export class GoogleService {
  private client: any;
  private readonly serveRoot = '/img/';
  private masterSheetId = '1TwbZ-D_mIXKguA0avPWhj8ngQtC6AsUHekFpbAZh9k8';
  private onlineformId = '17odpB81bf4J7gCYSaG3N0Pn_6WsYelqeFbz4uMtY16w';
  private absensiSheetId = '1Q2_8cZgv36rxchiHtd4NW9qju5lFftz3_UbVsdUM4xI';

  constructor(
    private db: DatabaseService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.authenticate(); // Authenticate during module initialization
  }
  
  private async authenticate(): Promise<void> {
    const keys = JSON.parse(fs.readFileSync('client_secret.json', 'utf8'));
    const SCOPES = [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.photos.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ];

    const auth = new GoogleAuth({
      credentials: keys,
      scopes: SCOPES,
    });

    this.client = await auth.getClient();
  }
  public getClient() {
    return this.client;
  }

  async connectGSheet() {
    const doc = new GoogleSpreadsheet(this.absensiSheetId, this.getClient());
    await doc.loadInfo();
    return doc;
  }

  async readMasterSheet() {
    const doc = new GoogleSpreadsheet(this.masterSheetId, this.getClient());
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Master Data'];
    await sheet.loadHeaderRow(5);
    return sheet;
  }

  async readMySheet() {
    const doc = new GoogleSpreadsheet(this.onlineformId, this.getClient());
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const sheet2 = doc.sheetsByIndex[1];
    return { sheet, sheet2 };
  }
}
