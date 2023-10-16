import { Request, Response } from 'express';

import * as videoService from '../services/Video';
import * as audioService from '../services/Audio';

import pageConfig from '../configs/page';
import { getPaginationListData, orderByCreateTime } from '../libs/utils';

export async function getIndexPage(req: Request, res: Response) {
  await res.render('index.ejs', {
    title: pageConfig.index.title,
    pageTitle: pageConfig.index.pageTitle,
    pageIcon: pageConfig.index.pageIcon,
    pageList: pageConfig.index.pageList,
    relativeContentList: pageConfig.index.relativeContentList,
    scripts: [
      ...pageConfig.index.scripts
    ],
    stylesheets: [
      ...pageConfig.index.stylesheets
    ]
  });
}

export function getSourceListPage(req: Request, res: Response) {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.page_size) || 10;
  const keyword: string = req.query.keyword === undefined ? '' : String(req.query.keyword);
  const sourceType: string = req.query.source_type === undefined ? '' : String(req.query.source_type);

  const videoList = videoService.getFilterVideos(keyword, sourceType);
  const audioList = audioService.getFilterAudios(keyword, sourceType);
  const totalList = orderByCreateTime([
    ...videoList,
    ...audioList
  ], true);
  const tableInfo = getPaginationListData(totalList, page, pageSize);

  res.render('sourceList.ejs', {
    title: pageConfig.sourceList.title,
    navList: pageConfig.common.navList,
    sourceTypeList: pageConfig.sourceList.sourceTypeList,
    sourceType,
    sourceTableHead: pageConfig.sourceList.sourceTableHead,
    tableInfo,
    path: req.path,
    keyword,
    scripts: pageConfig.sourceList.scripts,
    stylesheets: [
      ...pageConfig.sourceList.stylesheets
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

export function getDetailPage(req: Request, res: Response) {
  const { id } = req.params;
  const totalList = [
    ...videoService.getFilterVideos(),
    ...audioService.getFilterAudios()
  ];
  const curItem = totalList.find(item => item.id == id);

  res.render('detail.ejs', {
    title: pageConfig.detail.title,
    pageTitle: pageConfig.detail.pageTitle,
    item: curItem,
    scripts: pageConfig.detail.scripts,
    stylesheets: [
      ...pageConfig.detail.stylesheets
    ]
  });
}
