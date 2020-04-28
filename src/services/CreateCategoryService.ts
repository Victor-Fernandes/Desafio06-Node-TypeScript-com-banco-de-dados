import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryExist = categoryRepository.findOne({ where: title });

    if (!categoryExist) {
      throw new AppError('This title alredy exist.');
    }

    const category = categoryRepository.create({ title });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
