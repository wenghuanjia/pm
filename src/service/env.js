let host = ''; // 域名地址
let imgBaseUrl = ''; // 图片所在域名地址

// 开发环境
if (process.env.NODE_ENV == 'development') {
  // host = "http://api.linkgou.net/api";
  host = "http://word1.utools.club/api";
  imgBaseUrl = "http://qiniu.gzwmdy.cn/";
  // 线上环境
} else if (process.env.NODE_ENV == 'production') {
  // host = "http://link.gzwmdy.cn/api";
  host = "http://api.linkgou.net/api";
  // host = "http://word1.cn1.utools.club/api";
  imgBaseUrl = "http://qiniu.gzwmdy.cn/";
}

export {
  host,
  imgBaseUrl,
}
