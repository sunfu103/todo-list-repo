import {createApp, close, createHttpRequest} from "@midwayjs/mock";
import {Framework} from "@midwayjs/web";
import {Application} from "egg";

describe("test/controller/api.test.ts", () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it("should POST /api/todo/get", async () => {
    // make request
    const result = await createHttpRequest(app)
        .get("/api/todo/get")
        .query({ id: 1 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("OK");

  });


  it("should POST /api/todo/save", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/todo/save")
      .send({ name: 'name12', owner: 12, status: 1});

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("OK");
  });

});
