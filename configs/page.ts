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
    stylesheets: [
      frontEndingHost + '/css/sourceList.css',
    ],
    scripts: [
      frontEndingHost + '/js/sourceList.js',
    ],
  },

  index: {
    title: '首页',
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
