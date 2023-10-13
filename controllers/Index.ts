import { Request, Response } from 'express';
import * as videoService from '../services/Video';
import pageConfig from '../configs/page';

export function getIndexPage(req: Request, res: Response) {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.page_size) || 10;
  const keyword: string = req.query.keyword === undefined ? '' : String(req.query.keyword);

  const videoTableInfo = videoService.getPaginationList(page, pageSize, keyword);

  res.render('index.ejs', {
    title: pageConfig.index.title,
    navList: pageConfig.common.navList,
    sourceTableHead: pageConfig.index.sourceTableHead,
    videoTableInfo,
    path: req.path,
    keyword,
    scripts: pageConfig.index.scripts,
    stylesheets: [
      ...pageConfig.index.stylesheets
    ]
  });
}

export function getVideoTransferPage(req: Request, res: Response) {
  res.render('videoTransfer.ejs', {
    title: pageConfig.videoTransfer.title,
    navList: pageConfig.common.navList,
    path: req.path,
    scripts: pageConfig.videoTransfer.scripts,
    stylesheets: [
      ...pageConfig.videoTransfer.stylesheets
    ]
  })
}

export function getAudioTransferPage(req: Request, res: Response) {
  res.render('audioTransfer.ejs', {
    title: pageConfig.audioTransfer.title,
    navList: pageConfig.common.navList,
    path: req.path,
    scripts: pageConfig.audioTransfer.scripts,
    stylesheets: [
      ...pageConfig.audioTransfer.stylesheets
    ]
  });
}
