import app from "../../app";
//@ts-ignore
import request from "supertest";

describe("Route testing /top-stories", () => {
  it("return 200 if all test cases pass", async () => {
    try {
      const res = await request(app)
      .get('/top-stories')
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toBeUndefined();
      expect(res.body).not.toBeNull();
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.map((data: object) => {
        expect(data).toHaveProperty("by")
        expect(data).toHaveProperty("score")
        expect(data).toHaveProperty("time")
        expect(data).toHaveProperty("title")
      })
    } catch (error) {
      if(error instanceof Error)
      throw error;
    }
  }, 100000);
});

describe("Route testing /past-stories", () => {
  it("return 200 if all test cases pass", async () => {
    try {
      const res = await request(app)
      .get('/past-stories')
      if(res.statusCode === 404){
        throw Error(res.body.message)
      }
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toBeUndefined();
      expect(res.body).not.toBeNull();
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.map((data: object) => {
        expect(data).toHaveProperty("by")
        expect(data).toHaveProperty("score")
        expect(data).toHaveProperty("time")
        expect(data).toHaveProperty("title")
      })
    } catch (error) {
      if(error instanceof Error)
      throw error;
    }
  }, 100000);
});

describe("Route testing /comments", () => {
  it("return 200 if all test cases pass for comments", async () => {
    try {
      const res = await request(app)
      .get('/comments/8863')
      if(res.statusCode === 403 || res.statusCode === 404){
        throw Error(res.body.message)
      }
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toBeUndefined();
      expect(res.body).not.toBeNull();
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.map((data: object) => {
        expect(data).toHaveProperty("by")
        expect(data).toHaveProperty("text")
      })
    } catch (error){
      if(error instanceof Error)
      throw error;
    }
  }, 100000);
});

afterAll((done) => done())
