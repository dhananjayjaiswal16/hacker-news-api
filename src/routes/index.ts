import { Router } from "express";

const router = Router();
//@ts-ignore
import cacheService from "express-api-cache"
import { getStoryComments } from "../controllers/CommentsController";
import { getPastStories } from "../controllers/PaststoriesController";
import { getTopStories } from "../controllers/TopstoriesController";
var cache = cacheService.cache;

router.get("/top-stories", cache("15 minutes"), getTopStories)
router.get("/past-stories", getPastStories)
router.get("/comments/:id", getStoryComments)

export default router