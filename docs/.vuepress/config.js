module.exports = {
  title: 'CV大魔王的笔记',
  description: '技术类笔记，在往全栈的路上努力奋斗，主攻java，擅长微服务。前端方面熟悉vue3，ts，uniapp，原生安卓。对设计模式有所了解，正在恶补数据结构和算法',
  head: [
    ['link', {rel: 'icon', href: 'https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/07/logo.png'}]
  ],

  theme: '@qcyblm/vpx',
  themeConfig: {
    lastUpdated: '上次更新',
    logo: "https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/07/logo.png",
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    activeHeaderLinks: false,
    displayAllHeaders: true,
    footer:{  // 页脚信息
      createYear: '2020', // 创建年份 (可选，author、authorLink 启动时必选)
      author: 'cv大魔王', // 作者 (可选)
      beianLink: 'https://beian.miit.gov.cn/#/Integrated/index', // 备案链接 (可选)
      beian: '皖ICP备20012269号-1', // ICP 备号
    }
  },
  plugins: [
    '@vuepress/active-header-links', {sidebarLinkSelector: '.sidebar-link', headerAnchorSelector: '.header-anchor'},
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/search', {searchMaxSuggestions: 10},
  ]
}
