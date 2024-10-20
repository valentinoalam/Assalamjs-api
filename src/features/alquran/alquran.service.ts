import { Injectable } from '@nestjs/common';
import { CreateAlquranInput } from './dto/create-alquran.input';
import { UpdateAlquranInput } from './dto/update-alquran.input';
import { DatabaseService } from '@/core/database/database.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlquranService {
  constructor(
    private db: DatabaseService,
    private config: ConfigService,
  ) {}
  async getSurah(no: number) {
    try {
      const surah = await this.db.surah.findFirst({where: {no} });
      return surah;
    } catch (error) {
      console.error('Error fetching surah:', error);
      throw new Error('Internal server error');
    }
  }

  async getAyah(id: number) {
    try {
      const ayah = await this.db.ayah.findFirst({ where: { id } });
      return ayah;
    } catch (error) {
      console.error('Error fetching ayah:', error);
      throw new Error('Internal server error');
    }
  }

  async getAyahsBySurah(surahNo: number) {
    try {
      const ayahs = await this.db.ayah.findFirst({ where: { surahNo } });
      return ayahs;
    } catch (error) {
      console.error('Error fetching ayahs for surah:', error);
      throw new Error('Internal server error');
    }
  }

  async getDoa(id: number) {
    try {
      const doa = await this.db.doa.findFirst({ where: { id } });
      return doa;
    } catch (error) {
      console.error('Error fetching doa:', error);
      throw new Error('Internal server error');
    }
  }

  async getAllDoa() {
    try {
      const doas = await this.db.doa.findMany({
        select:{
          id:true, 
          judul:true, 
          doa:true, 
          latin:true, 
          arti:true
      }});
      return doas;
    } catch (error) {
      console.error('Error fetching doa:', error);
      throw new Error('Internal server error');
    }
  }

  // Method to store Quran data
  // async storeQuranPageHandler(): Promise<any> {
  //   try {
  //     const quranData = await storeQuranData();
  //     return quranData;
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Internal server error. Please try again later.',
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // // Method to retrieve Asmaul Husna
  // async getAsmaulHusnaHandler(): Promise<any> {
  //   try {
  //     const asmaulHusnaPath = '../database/data/asmaulHusna.json';
  //     const asmaulHusna = fs.readFileSync(asmaulHusnaPath, 'utf-8');
  //     return JSON.parse(asmaulHusna);
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Internal server error. Please try again later.',
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // // Method to retrieve prayer times
  // async getPrayerTimeHandler(): Promise<any> {
  //   try {
  //     const response = await fetch('https://muslimsalat.com/jakasampurna.json?key=31fe1873c85abccb09e618ee9cf37d8a');
      
  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new HttpException({
  //           statusCode: HttpStatus.FORBIDDEN,
  //           message: 'Forbidden',
  //         }, HttpStatus.FORBIDDEN);
  //       }
  //       throw new HttpException({
  //         statusCode: response.status,
  //         message: `HTTP error: ${response.status}`,
  //       }, HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
      
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Internal server error. Please try again later.',
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  
}
