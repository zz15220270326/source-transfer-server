import { frontEndingHost } from './app';

const pageConfig = {
  common: {
    navList: [
      {
        name: '首页',
        path: '/'
      },
      {
        name: '资源列表页面',
        path: '/source-list'
      },
      {
        name: '视频转换',
        path: '/transfer-video'
      },
      {
        name: '音频转换',
        path: '/transfer-audio'
      }
    ],
    stylesheets: [
      frontEndingHost + '/css/reset.css'
    ],
  },

  index: {
    title: '首页',
    pageTitle: '张三的资源管理系统',
    pageIcon: '/imgs/favicon.ico',
    pageList: [
      {
        title: '资源列表页面',
        description: '一个可以统一管理资源列表的页面（查询资源列表，查询资源详情，删除资源）',
        banner: '/imgs/source-list-banner.jpg',
        href: '/source-list'
      },
      {
        title: 'B站视频上传页面',
        description: '一个可以将B站视频(*.m4s)转化为 MP4 资源的页面（上传 & 转化）',
        banner: '/imgs/bilibili-banner.jpg',
        href: '/transfer-video'
      },
      {
        title: '网易音乐上传页面',
        description: '一个可以将网易音乐(*.ncm)转化为 MP3 资源的页面（上传 & 转化）',
        banner: '/imgs/netease-banner.jpg',
        href: '/transfer-audio'
      }
    ],
    relativeContentList: [
      {
        title: '我的个人博客',
        description: '一些关于张三的个人介绍',
        banner: '/imgs/blog-banner.jpg',
        href: '//www.yuque.com/jackcheung-pshcv/at8wu2/index',
      },
    ],
    stylesheets: [
      frontEndingHost + '/css/index.css',
    ],
    scripts: [
      frontEndingHost + '/js/index.js',
    ],
  },

  sourceList: {
    title: '资源列表',
    sourceTableHead: [
      {
        key: 'id',
        label: 'ID',
        width: '100px',
        align: 'left'
      },
      {
        key: 'originalname',
        label: '资源名称',
        width: '300px',
        align: 'left'
      },
      {
        key: 'sourceType',
        label: '资源类型',
        width: '100px',
        align: 'left'
      },
      {
        key: 'banner',
        label: '资源封面',
        width: '280px',
        align: 'left'
      },
      {
        key: 'playUrl',
        label: '资源链接',
        // width: '500px',
        width: '250px',
        align: 'left'
      },
      {
        key: 'ctime',
        label: '创建时间',
        align: 'left',
        width: '320px'
      },
      {
        key: 'mtime',
        label: '修改时间',
        align: 'left',
        width: '320px',
      },
      {
        key: 'operations',
        label: '操作',
        align: 'left',
        width: '200px'
      }
    ],
    sourceTypeList: [
      {
        label: '全部',
        value: '',
      },
      {
        label: '视频',
        value: 'video'
      },
      {
        label: '音频',
        value: 'audio'
      }
    ],
    stylesheets: [
      frontEndingHost + '/css/sourceList.css',
    ],
    scripts: [
      frontEndingHost + '/js/sourceList.js',
    ],
  },

  videoTransfer: {
    title: '视频转换',
    stylesheets: [
      frontEndingHost + '/css/videoTransfer.css',
    ],
    scripts: [
      frontEndingHost + '/js/videoTransfer.js',
    ],
  },

  audioTransfer: {
    title: '音频转换',
    stylesheets: [
      frontEndingHost + '/css/audioTransfer.css',
    ],
    scripts: [
      frontEndingHost + '/js/audioTransfer.js',
    ],
  },

  detail: {
    title: '详情',
    pageTitle: '张三的资源管理系统-详情页',
    stylesheets: [
      frontEndingHost + '/css/detail.css',
    ],
    scripts: [
      frontEndingHost + '/js/detail.js',
    ],
  },
};

export default pageConfig;
