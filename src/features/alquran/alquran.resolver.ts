import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AlquranService } from './alquran.service';
import { CreateAlquranInput } from './dto/create-alquran.input';
import { UpdateAlquranInput } from './dto/update-alquran.input';

@Resolver('Alquran')
export class AlquranResolver {
  constructor(private readonly quranService: AlquranService) {}

  @Mutation('createAlquran')
  create(@Args('createAlquranInput') createAlquranInput: CreateAlquranInput) {
    return this.quranService.create(createAlquranInput);
  }

  @Query('alquran')
  findAll() {
    return this.quranService.findAll();
  }

  @Query('alquran')
  findOne(@Args('id') id: number) {
    return this.quranService.findOne(id);
  }

  @Mutation('updateAlquran')
  update(@Args('updateAlquranInput') updateAlquranInput: UpdateAlquranInput) {
    return this.quranService.update(updateAlquranInput.id, updateAlquranInput);
  }

  @Mutation('removeAlquran')
  remove(@Args('id') id: number) {
    return this.quranService.remove(id);
  }

  @Query(() => Surah)
  async surah(@Args('no', { type: () => Int }) no: number): Promise<Surah> {
    return this.quranService.getSurah(no);
  }

  @Query(() => Ayah, { nullable: true })
  async ayah(@Args('id', { type: () => Int }) id: number): Promise<Ayah | null> {
    return this.quranService.getAyah(id);
  }

  @Query(() => [Ayah])
  async ayahsBySurah(@Args('surahNo', { type: () => Int }) surahNo: number): Promise<Ayah[]> {
    return this.quranService.getAyahsBySurah(surahNo);
  }

  @Query(() => Doa)
  async doa(@Args('id', { type: () => Int }) id: number): Promise<Doa> {
    return this.quranService.getDoa(id);
  }

  @Query(() => [Doa])
  async allDoa(): Promise<Doa[]> {
    return this.quranService.getAllDoa();
  }
}
