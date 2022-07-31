module.exports = {
  title: 'CV大魔王的笔记',
  description: '技术类笔记，在往全栈的路上努力奋斗，主攻java，擅长微服务。前端方面熟悉vue3，ts，uniapp，原生安卓。对设计模式有所了解，正在恶补数据结构和算法',
  head: [
    ['link', {rel: 'icon', href: 'https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/logo.png'}]
  ],

  // theme: '@qcyblm/vpx',
  theme: 'reco',
  themeConfig: {
    author: 'cv大魔王',
    lastUpdated: '上次更新',
    type: 'blog',
    base: "./",
    authorAvatar: 'https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220731204655849.png',
    logo: "https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/logo.png",
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    activeHeaderLinks: false,
    displayAllHeaders: true,
    // 备案
    record: '皖ICP备20012269号-1',
    recordLink: 'https://beian.miit.gov.cn/#/Integrated/index',
    // 项目开始时间，只填写年份
    startYear: '2020',
    valineConfig: {
      appId: 'UdAhhnSzFfnsBzA22zoT6BaF-gzGzoHsz',// your appId
      appKey: 'z3p2CHOsy3LCfqJqpzrWQtPN', // your appKey
    }
  },
  plugins: [
    '@vuepress/active-header-links', {sidebarLinkSelector: '.sidebar-link', headerAnchorSelector: '.header-anchor'},
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/search', {searchMaxSuggestions: 10},
  ]
}
