import { Request, Response } from 'express';

import * as paths from '../configs/paths';

import * as service from '../services/Video';
import { transferFileName } from '../libs/utils';

/**
 * 转换单个文件夹的 m4s 文件
 */
export async function transferVideoFile(req: Request, res: Response) {
  const {
    outputPath = `${Date.now()}.mp4`,
    clear
  } = req.body;

  if (typeof outputPath !== 'string') {
    throw new Error('outputPath must be a string');
  }

  try {
    const videoUrl: string = await service.transferVideoFileAndGetVideoUrl(outputPath, clear);

    res.send({
      msg: 'ok',
      code: 0,
      data: {
        videoUrl,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : `${e}`;
    console.log(`
      Error:
      =============================================================================
      ${message}
      =============================================================================
    `);
    res.send({
      msg: message,
      code: -1
    });
  }
}

/**
 * 获取对应的 video 文件
 */
export function getVideoFile(req: Request, res: Response) {
  const { videoName } = req.params;

  if (!videoName) {
    res.send({
      msg: 'videoName is not exists',
      code: -1
    });
    return;
  }
  res.sendFile(paths.getPathByVideoName(videoName));
}

/**
 * 获取 videoList 相关的信息
 */
export function getVideoList(req: Request, res: Response) {
  const {
    page = 1,
    page_size = 10,
  } = req.query;
  const data = service.getPaginationVideoList(Number(page), Number(page_size));

  res.send({
    msg: 'ok',
    code: 0,
    data,
  });
}

/**
 * 删除某一个视频文件
 */
export function removeVideoFile(req: Request, res: Response) {
  try {
    const { videoName } = req.params;

    if (!videoName) {
      res.send({
        msg: 'videoName is not exists',
        code: -1
      });
      return;
    }

    service.removeVideoFile(videoName);

    res.send({
      msg: 'ok',
      code: 0,
      data: {
        message: '删除成功'
      }
    });
  } catch (e) {
    res.send({
      msg: `error: remove failed! reason: ${e instanceof Error ? e.message : e}`,
      code: -1,
    });
  }
}

/**
 * 上传一个文件到 origin
 */
export function uploadVideoFile(req: Request, res: Response) {
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  res.setHeader('Content-Type', 'multipart/form-data');

  const isSuccess: boolean = service.uploadVideoFile(req.file, true);

  if (isSuccess) {
    res.send({
      msg: 'ok',
      code: 0,
      data: {
        uploadFile: req.file
      },
    });
  } else {
    res.send({
      msg: 'error',
      code: -1,
      reason: 'upload failed'
    });
  }
}
