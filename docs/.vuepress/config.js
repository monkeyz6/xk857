const moment = require('moment');
module.exports = {
  title: '星空小屋',
  description: '技术类笔记，在往全栈的路上努力奋斗，主攻java，擅长微服务。前端方面熟悉vue3，ts，uniapp，原生安卓。对设计模式有所了解，正在恶补数据结构和算法',
  head: [
    [
      'link', {rel: 'icon', href: 'https://oss.xk857.com/images/20220808/3a23288316be4f1d9e29453ceba07eb4.png'},
    ],
    [
      'link', {href: "https://cdn.jsdelivr.net/npm/@docsearch/css@3", rel: "stylesheet"}
    ],
    [
      'script', {src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3"}
    ]
  ],

  // theme: '@qcyblm/vpx',
  theme: 'reco',
  themeConfig: {
    author: 'cv大魔王',
    lastUpdated: '上次更新',
    type: 'blog',
    base: "./",
    authorAvatar: 'https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220731204655849.png',
    // logo: "https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/logo.png",
    logo: "https://oss.xk857.com/images/20220808/LGGO_MINI.png",
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    activeHeaderLinks: false,
    displayAllHeaders: true,
    // 备案
    record: '皖ICP备20012269号-1',
    recordLink: 'https://beian.miit.gov.cn/#/Integrated/index',
    // 项目开始时间，只填写年份
    startYear: '2020',
    loading: '',
    valineConfig: {
      appId: 'UdAhhnSzFfnsBzA22zoT6BaF-gzGzoHsz',// your appId
      appKey: 'z3p2CHOsy3LCfqJqpzrWQtPN', // your appKey
    },
    algolia: {
      appId: '33985UTRSK',
      apiKey: 'ee880b62a5ada5c3cc9c0e30c85fca7f',
      indexName: 'xk857'
    }
  },
  plugins: [
    ["vuepress-plugin-code-copy", {
      successText: "复制成功",
      color: "#3eaf7c",
      backgroundColor: "#d8efe5"
    }],
    '@vuepress/active-header-links', {sidebarLinkSelector: '.sidebar-link', headerAnchorSelector: '.header-anchor'},
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/search', {searchMaxSuggestions: 10},
    '@vuepress-reco/extract-code',
    ['@vuepress/last-updated', {
      transformer: (timestamp) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale('zh-CN')
        return moment(timestamp).fromNow()
      }
    }],
  ]
}
