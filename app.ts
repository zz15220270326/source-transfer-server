import express, { Application } from 'express';
import bodyParser from 'body-parser';

import * as middlewares from './middlewares';

import * as appConfig from './configs/app';

import indexRoute from './routes/indexRoute';
import videoRoute from './routes/videoRoute';
import audioRoute from './routes/audioRoute';

const app: Application = express();

// 设置接收 POST 请求参数
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 设置渲染的模板引擎
app.use(express.static(appConfig.publicAssetsDir));
app.set('view engine', appConfig.viewEngine);

app.all('*', middlewares.statApiTime);
app.all('*', middlewares.setHeaders);

// register routers
app.use(appConfig.routeModules.index, indexRoute);
app.use(appConfig.routeModules.videos, videoRoute);
app.use(appConfig.routeModules.audios, audioRoute);

app.listen(appConfig.port, appConfig.ipAddress, () => {
  console.log(appConfig.appStartLog);
});
