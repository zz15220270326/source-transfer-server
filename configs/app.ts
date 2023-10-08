/** 静态资源公共路径 */
export const publicAssetsDir = 'public';

/** 视图模板引擎 */
export const viewEngine = 'ejs';

/** 项目运行的端口号 */
export const port = 9240;

/** 路由模块 */
export const routeModules = {
  index: '/',

  videos: '/videos',

  audios: '/audios',
};

/** 前端脚本链接 */
export const frontEndingHost = process.env.NODE_ENV === 'development'
                             ? 'http://localhost:9241'
                             : 'https://xianshangyumingdizhi.com';

/** 启动后的提示信息 */
export const appStartLog = `Express server is running at port : ${port}`;
