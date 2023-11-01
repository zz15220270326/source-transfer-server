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
    /** 备案信息 */
    beian: `粤ICP备2023123390号`,
    stylesheets: [
      frontEndingHost + '/css/reset.css'
    ],
  },

  index: {
    title: '首页',
    pageTitle: '张三的资源管理系统',
    pageIcon: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/favicon.ico?e=1698849639&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:DfR42lt4Qnjpj9UC-4aKBvAdMAU=',
    pageList: [
      {
        title: '资源列表页面',
        description: '一个可以统一管理资源列表的页面（查询资源列表，查询资源详情，删除资源）',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/source-list-banner.jpg?e=1698848660&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:ua3lxJOZbjWNuQpm-a7O3qQwSWQ=',
        href: '/source-list'
      },
      {
        title: 'B站视频上传页面',
        description: '一个可以将B站视频(*.m4s)转化为 MP4 资源的页面（上传 & 转化）',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/bilibili-banner.jpg?e=1698848693&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:A2zsXOTJjLzdToAjSYEhZQpNz_g=',
        href: '/transfer-video'
      },
      {
        title: '网易音乐上传页面',
        description: '一个可以将网易音乐(*.ncm)转化为 MP3 资源的页面（上传 & 转化）',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/netease-banner.jpg?e=1698848720&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:2XMYcNEcnmWHc7U1_6mkXP0xsNQ=',
        href: '/transfer-audio'
      }
    ],
    relativeContentList: [
      {
        title: '我的语雀博客',
        description: '一些关于张三的个人介绍',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/blog-banner.jpg?e=1698848768&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:kyGjzjcgkfyuGus-GBd3r0weQgw=',
        href: '//www.yuque.com/jackcheung-pshcv/at8wu2/index',
      },
      {
        title: '我的掘金',
        description: '对外的掘金技术交流',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/juejin-banner.jpg?e=1698849036&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:iWv9bVQqFapQAHfaPoeVmcphc9w=',
        href: '//juejin.cn/user/4309726841287277',
      },
      {
        title: '驾照题库-App',
        description: '一个可以刷驾照考题的 App',
        banner: '//s3ecz0c2b.hn-bkt.clouddn.com/imgs/jiazhao-test.jpg?e=1698849397&token=WO8DULO9FIsHnPpG2_qXrwSqua2RSfUKL_3li9UE:uHqz5DZ5p5GIQiPCvrUDjzgYa0Q=',
        href: '//jiazhao-test.bklove-zz.cn'
      }
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
