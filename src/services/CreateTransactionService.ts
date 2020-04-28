import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionRepository);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('This type is not valid.');
    }

    const transactions = transactionsRepository.create({
      title,
      value,
      type,
    });

    await transactionsRepository.save(transactions);

    return transactions;
  }
}

export default CreateTransactionService;
