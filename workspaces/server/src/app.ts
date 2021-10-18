import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Obs, obss } from './obs';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { getCombinedNodeFlags } from 'typescript';
import { RespondGetInstances, RespondGetScenes } from './types';
import path from 'path';

const app: express.Application = express();

app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello World');
});

function ah(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    callback(req, res, next).catch(next);
  };
}

function getObs(indexStr: string): Obs {
  const index = Number(indexStr);
  const obs = obss[index];
  if (!obs) {
    throw createError(400, `obs index out of range`);
  }
  return obs;
}

app.get('/getInstances', async (req, res) => {
  const data: RespondGetInstances = obss.map((obs) => obs.name);
  res.json(data);
});

app.get(
  '/getScenes/:index',
  ah(async (req, res) => {
    const obs = getObs(req.params.index);
    const data: RespondGetScenes = await obs.getScenes();
    res.json(data);
  })
);

app.post(
  '/setScene/:index/:scene',
  ah(async (req, res) => {
    const obs = getObs(req.params.index);
    const scene = req.params.scene;
    await obs.setScrene(scene);
    res.json('ok');
  })
);

app.get(
  '/getScreenShot/:index/:scene?',
  ah(async (req, res) => {
    const obs = getObs(req.params.index);
    const scene = req.params.scene || obs.currentScene;
    const width = Number(req.query.width) || 480;

    const data: string = await obs.getScreenshot(scene, width);

    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end(Buffer.from(data, 'binary'));
  })
);

app.post(
  '/openProjector',
  ah(async (req, res) => {
    const mainObs = obss[0];
    await mainObs.openProjector(0);
    const tvObs = obss[2];
    //await tvObs.oprnProjector(0);
    res.json('ok');
  })
);

app.get('/users/:name', (req: Request, res: Response) => {
  return res.json(`Hello ${req.params.name}`);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((error: createError.HttpError, req: Request, res: Response) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

export default app;
