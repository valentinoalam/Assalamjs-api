// surah.model.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Surah {
  @Field(() => Int)
  no: number;

  @Field()
  nama: string;

  @Field()
  nama_panjang: string;

  @Field()
  nama_latin: string;

  @Field()
  arti: string;

  @Field({ nullable: true })
  translation?: string;

  @Field()
  tempat_turun: string;

  @Field({ nullable: true })
  tafsir?: string;

  @Field(() => Int)
  jumlah_ayat: number;

  @Field()
  audio_url: string;
}
