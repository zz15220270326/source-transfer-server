import multer from 'multer';

import * as paths from '../configs/paths';

const formVideoUpload = multer({
  dest: paths.originDir,
  fileFilter: (req, file, next) => {
    const { originalname } = file;
    file.originalname = Buffer.from(originalname, 'latin1').toString('utf8');
    next(null, true);
  }
});

/** 导出单个视频需要注册的中间件 */
export const uploadSingleVideo = formVideoUpload.single('file');

/** 导出多个视频需要注册的中间件 */
export const uploadMultipleVideos = formVideoUpload.array('files', 128);
