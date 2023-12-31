import { Request, Response } from 'express';

import * as service from '../services/Audio';

export function showIndexContent(req: Request, res: Response) {
  const { method } = req;

  res.send({
    msg: `${method}请求 - 音频工具`,
    code: 0,
    data: null
  });
}

export async function transferNcmAudio(req: Request, res: Response) {
  res.setHeader('Content-Type', 'multipart/form-data');

  try {
    const data = await service.transferNcmAudio(req.file, false);

    res.json({
      code: 0,
      msg: '音频转换成功',
      data
    });
  } catch (e) {
    const errMsg: string = e instanceof Error ? e.message : `${e}`;

    res.json({
      code: -1,
      msg: `转码出错啦：${errMsg}`
    });
  }
}

export async function transferNcmVideos(req: Request, res: Response) {
  try {
    const files = req.files;

    if (!Array.isArray(files)) {
      throw new TypeError('"files" must to be an array for transfer!!!');
    }
    if (files.length > 10) {
      throw new Error(`"Files" \s size can not over than 10!!!`);
    }

    const data = await service.transferNcmAudioList(files);

    res.send({
      code: 0,
      msg: 'ok',
      data,
    });
  } catch (e) {
    const errMsg: string = e instanceof Error ? e.message : `${e}`;

    res.send({
      code: -1,
      msg: `转码出错啦：${errMsg}`
    });
  }
}

export async function getPaginationAudioList(req: Request, res: Response) {
  const param = req.method.toLowerCase() === 'get' ? req.query : req.body;
  const page: number = Number(param.page) || 1;
  const pageSize: number = Number(param.page_size) || Number(param.pageSize) || 10;

  try {
    const data = service.getAllAudios(true, { page, pageSize });

    res.send({
      msg: 'ok',
      code: 0,
      data
    });
  } catch (e) {
    const errMsg: string = e instanceof Error ? e.message : `${e}`;

    res.json({
      code: -1,
      msg: `获取失败：${errMsg}`
    });
  }
}

export async function removeAudio(req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('id is required');
    }
    service.removeAudio(id);
    res.send({
      msg: 'ok',
      code: 0
    });
  } catch (e) {
    const errMsg: string = e instanceof Error ? e.message : `${e}`;
    res.send({
      code: -1,
      msg: `删除失败：${errMsg}`
    });
  }
}
