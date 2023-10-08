import { Request, Response } from 'express';
import * as videoService from '../services/Video';
import pageConfig from '../configs/page';

export function getIndexPage(req: Request, res: Response) {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.page_size) || 10;

  const videoTableInfo = videoService.getPaginationVideoList(page, pageSize);

  res.render('index.ejs', {
    title: pageConfig.index.title,
    navList: pageConfig.common.navList,
    videoTableHead: pageConfig.index.videoTableHead,
    videoTableInfo,
    path: req.path,
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
