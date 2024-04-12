import { Document, Model, Query } from 'mongoose';
import { MongoError } from 'mongodb';
import { Request } from 'express';
import Product from '../models/Product';

export const paginate = async <T extends Document>(
  keyName : string,
  $query: Query<T[], T>,
  req: Request,
  perPage: number
): Promise<{[key:string] :T[] | any,  totalCount : number, perPage: number}> => {
  const pageParam = req.query.page as string | undefined;
  const pageNum =  pageParam ? parseInt(pageParam) : 1;
  const skip = (pageNum - 1) * perPage;
  const countQuery = $query.model.countDocuments($query.getFilter());
  const totalCount = await countQuery.exec();
  let items : any = {}
  try {
    if(pageParam) {
      items = await $query
        .skip(skip)
        .limit(perPage)
        .exec();
    }else{
       items = await $query.exec()

    }


   // const totalCount = 10;// await $query.countDocuments().exec();

    return { [keyName]: items, page : pageNum, totalCount, perPage : pageParam ? perPage : totalCount };
  } catch (error) {
    throw new Error('Pagination error: ' + (error as MongoError).message);
  }
};


export const paginate_aggregate = async <T extends Document>(
  keyName : string,
  query: Model<T>,
  pipeline : any[],
  req: Request,
  perPage: number
): Promise<{[key:string] :T[] | any,  totalCount : number, perPage: number}> => {
    const pageParam = req.query.page as string | undefined;
    const pageNum =  pageParam ? parseInt(pageParam) : 1;
    const skip = (pageNum - 1) * perPage;
    let data = {}
    let totalCount  = (await query.aggregate(pipeline).exec()).length


    try{
      if(pageParam){
          pipeline.push(
            { $skip: skip},
            // Limit the number of documents per page
            { $limit: perPage }
          )
      }
     
      data = await query.aggregate(pipeline).exec()
  
      return { [keyName]: data, page : pageNum, totalCount, perPage : pageParam ? perPage : totalCount};

    }catch(error){
      throw new Error('Pagination error: ' + (error as MongoError).message);
    }


    
  
}


