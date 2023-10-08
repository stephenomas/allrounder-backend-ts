import { Document, Model, Query } from 'mongoose';
import { MongoError } from 'mongodb';
import { Request } from 'express';

export const paginate = async <T extends Document>(
  keyName : string,
  $query: Query<T[], T>,
  req: Request,
  perPage: number
): Promise<{[key:string] :T[] | any,  totalCount : number, perPage: number}> => {
  const pageParam = req.query.page as string | undefined;
  const pageNum =  pageParam ? parseInt(pageParam) : 1;
  const skip = (pageNum - 1) * perPage;

  try {
    const countQuery = $query.model.find().countDocuments();
    const totalCount = await countQuery.exec();
    const items = await $query
      .skip(skip)
      .limit(perPage)
      .exec();

   // const totalCount = 10;// await $query.countDocuments().exec();

    return { [keyName]: items, page : pageNum, totalCount, perPage};
  } catch (error) {
    throw new Error('Pagination error: ' + (error as MongoError).message);
  }
};