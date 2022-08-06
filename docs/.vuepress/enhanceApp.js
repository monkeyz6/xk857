export default ({ router, Vue, isServer }) => {
  Vue.mixin({
    mounted() {
      // 不加 setTimeout 会有报错，但不影响效果
      setTimeout(() => {
        try {
          docsearch({
            appId: "33985UTRSK",
            apiKey: "ee880b62a5ada5c3cc9c0e30c85fca7f",
            indexName: "xk857",
            container: '.search-box',
            debug: false
          });
        } catch(e) {
          console.log(e);
        }
      }, 100)
    },
  });
}
