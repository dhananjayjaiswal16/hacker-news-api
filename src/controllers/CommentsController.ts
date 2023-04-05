import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { CommentType } from "../@types"
import { getHackerNewsData } from "../helper";
export const getStoryComments: RequestHandler = async (req, res, next) => {
  try {
    //fetch past stories from DB
    const id = req.params.id;
    const data = await getHackerNewsData(Number(id));
    if(!data?.kids || data?.kids?.length === 0){
      return res.status(404).json({
        message: "No comments exist on this post"
      })
    }
    if(data?.type !== "story"){
      return res.status(403).json({
        message: `The given id: ${id} is not of type story`
      });
    }
    //Get all comment Ids of story
    const { kids }: { kids: Array<number> } = data;
    const comments: CommentType[] = []
    //get total number of child comments
    await Promise.all(kids?.map(async(comment) => {
      const data = await getHackerNewsData(comment)
      const totalComments = data?.kids ? data?.kids?.length : 0
      comments.push({
        by: data?.by,
        text: data?.text,
        totalComments: totalComments
      })
    }))
    //sort array based on number of child comments
    comments.sort((a,b) => a.totalComments > b.totalComments ? -1 : 1)
    res.status(200).json(comments.slice(0,10));
  } catch (error) {
    if(error instanceof Error){
      console.log("Error while fetching comments ", error.message);
      return next(createHttpError.InternalServerError);
    }
  }
}