import multer from 'multer';

import * as paths from '../configs/paths';

const formVideoUpload = multer({
  dest: paths.originDir
});

/** 导出单个视频需要注册的中间件 */
export const uploadSingleVideo = formVideoUpload.single('file');

/** 导出多个视频需要注册的中间件 */
export const uploadMultipleVideos = formVideoUpload.array('files', 128);
