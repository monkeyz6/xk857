## 原主题文件改动说明
### 1.添加图标

1. 在 [图标库](https://www.iconfont.cn/) 下载图标后，加入到`node_modules\vuepress-theme-reco\fonts2`中 
2. 然后在`enhanceApp.js`文件中引入`import "@theme/fonts2/iconfont.css"`

### 2.首页文章描述信息改成超过两行显示省略号
找到`node_modules/vuepress-theme-reco/components/NoteAbstractItem.vue`
```scss
.abstract-item
……
  > * {
    pointer-events: auto;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;				//溢出内容隐藏
    text-overflow: ellipsis;		//文本溢出部分用省略号表示
    display: -webkit-box;			//特别显示模式
    -webkit-line-clamp: 2;			//行数
    line-clamp: 2;
    -webkit-box-orient: vertical;	//盒子中内容竖直排列
  }
```
