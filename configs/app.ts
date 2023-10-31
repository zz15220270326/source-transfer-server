import { join } from 'path';
import { getIpv4Address } from '../libs/utils';

const isProduction: boolean = process.env.NODE_ENV !== 'development';

/** 静态资源公共路径 */
export const publicAssetsDir = isProduction ? join(__dirname, '../../public') : join(__dirname, '../public');

/** 视图模板引擎 */
export const viewEngine = 'ejs';

/** 项目运行的 IP 地址 */
export const ipAddress = '0.0.0.0';

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
                             ? `http://localhost:9241`
                             : process.env.NODE_ENV === 'test'
                             ? `http://${getIpv4Address()}:9241`
                             : `//s3ecz0c2b.hn-bkt.clouddn.com/dist`; // https://xianshangyumingdizhi.com

/** 启动后的提示信息 */
export const appStartLog = `
  ✅ Express server is running!!! ✅
  You can access the server by 

    Local: http://localhost:${port}

    WAN: http://${getIpv4Address()}:${port}
`;
