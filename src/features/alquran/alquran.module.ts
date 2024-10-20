import { Module } from '@nestjs/common';
import { AlquranService } from './alquran.service';
import { AlquranResolver } from './alquran.resolver';
import { SurahService } from './components/surah/surah.service';
import { AyahService } from './ayah/ayah.service';
import { JuzService } from './juz/juz.service';

@Module({
  providers: [AlquranResolver, AlquranService, SurahService, AyahService, JuzService],
})
export class AlquranModule {}
