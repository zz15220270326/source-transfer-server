export default {
  ak: process.env.QINIU_AK,
  sk: process.env.QINIU_SK,
  buckets: {
    ['video-and-audio']: {
      name: 'video-and-audio',
    }
  },
  upload_url: process.env.QINIU_UPLOAD_URL,
};
