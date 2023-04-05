import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Story from "../models/Story";

export const getPastStories: RequestHandler = async (req, res, next) => {
  try {
    //fetch past stories from DB
    const allStories = await Story.aggregate([
      { 
        $project: 
          {
            _id: 0,
            by: 1,
            score: 1,
            time: 1,
            title: 1,
            url: 1
          } 
      }
    ])
    if(!allStories || allStories.length === 0){
      return res.status(404).json({
        message: "Stories do not exist, try hitting /top-stories at least once"
      })
    }
    res.status(200).json(allStories);
  } catch (error) {
    if(error instanceof Error){
      console.log("Error while fetching past Stories ", error.message);
      return next(createHttpError.InternalServerError);
    }
  }
}