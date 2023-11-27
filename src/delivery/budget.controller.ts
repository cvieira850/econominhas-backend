import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { UserDataDto } from './dtos';
import { UserData } from './decorators/user-data';
import { BudgetService } from 'src/usecases/budget/budget.service';
import { CreateDto } from './dtos/budget';

@Controller('budgets')
@UseGuards(AuthGuard())
export class BudgetController {
	constructor(private readonly budgetService: BudgetService) {}

	@Post('')
	create(
		@UserData()
		userData: UserDataDto,
		@Body()
		body: CreateDto,
	) {
		return this.budgetService.create({
			...body,
			accountId: userData.accountId,
		});
	}
}
