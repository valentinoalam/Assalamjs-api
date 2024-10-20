// ayah.model.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Surah } from './surah.model';

@ObjectType()
export class Ayah {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  nomor: number;

  @Field()
  arab: string;

  @Field()
  latin: string;

  @Field()
  terjemahan: string;

  @Field({ nullable: true })
  catatan_kaki?: string;

  @Field(() => Int)
  hal: number;

  @Field(() => Int)
  juz: number;

  @Field({ nullable: true })
  audio_url?: string;

  @Field(() => Surah)
  surah: Surah;
}
