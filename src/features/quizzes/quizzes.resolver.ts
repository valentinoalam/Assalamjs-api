import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Resolver(() => Quiz)
export class QuizzesResolver {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizzesService.create(createQuizInput);
  }

  @Query(() => [Quiz], { name: 'quizzes' })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizzesService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(@Args('updateQuizInput') updateQuizInput: UpdateQuizInput) {
    return this.quizzesService.update(updateQuizInput.id, updateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => Int }) id: number) {
    return this.quizzesService.remove(id);
  }
}
