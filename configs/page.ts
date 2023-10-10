import { frontEndingHost } from './app';

const pageConfig = {
  common: {
    navList: [
      {
        name: '首页',
        path: '/'
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
    videoTableHead: [
      {
        key: 'videoName',
        label: '视频名称',
        width: '300px',
        align: 'left'
      },
      {
        key: 'videoCover',
        label: '视频封面',
        width: '280px',
        align: 'left'
      },
      {
        key: 'videoLink',
        label: '视频链接',
        width: '500px',
        align: 'left'
      },
      {
        key: 'ctime',
        label: '创建时间',
        align: 'left',
        width: '400px'
      },
      {
        key: 'mtime',
        label: '修改时间',
        align: 'left',
        width: '400px',
      },
      {
        key: 'operations',
        label: '操作',
        align: 'left',
        width: '200px'
      }
    ],
    stylesheets: [
      frontEndingHost + '/css/index.css',
    ],
    scripts: [
      frontEndingHost + '/js/index.js',
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
  }
};

export default pageConfig;
