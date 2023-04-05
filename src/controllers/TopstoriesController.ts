import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { SingleStoryType } from "../@types";
import Story from "../models/Story";
import { getTopStoriesData, getHackerNewsData } from "../helper"
export const getTopStories: RequestHandler = async (req, res, next) => {
  try {
    // fetch IDs of latest stories
    const storiesId = await getTopStoriesData();
    const topStories: SingleStoryType[] = [];

    await Promise.all(storiesId.map(async (storyId: number) => {
      const data = await getHackerNewsData(storyId);
      //to fetch stories in last 15 minutes
      let singleStory: SingleStoryType = {
        by: data?.by,
        score: data?.score,
        time: data?.time,
        title: data?.title,
        url: data?.url
      }
      if(((Date.now()/1000) - data.time) <= 900){
        topStories.push(singleStory)
        return data;
      }
    }))
    //sort stories based on score
    const stories = topStories.sort((a,b) => a.score > b.score ? -1 : 1)
    stories.slice(0,10).map(async (story) => {
      await Story.create({
        by: story?.by,
        score: story?.score,
        time: story?.time,
        title: story?.title,
        url: story?.url
      })
    })
    res.status(200).json(stories.slice(0,10))
  } catch (error) { 
    if(error instanceof Error) {
      console.log("Error while fetching top Stories ", error.message);
      return next(createHttpError.InternalServerError);
    }
  }
}