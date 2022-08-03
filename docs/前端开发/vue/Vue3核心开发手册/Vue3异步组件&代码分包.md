---
title: Vue3异步组件&代码分包
date: 2021-08-03 11:50
categories:
- vue
tags:
- vue
- vite
---

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且减少主包的体积，这时候就可以使用异步组件，那么你们有没有尝试过顶层使用await的呢？
<!-- more -->

```javascript
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```
::: tip
`<script setup>` 中可以使用顶层await。结果代码会被编译成 async setup()
:::


父组件引用子组件 通过defineAsyncComponent加载异步配合import函数模式便可以分包
```vue
<script setup>
import { reactive, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'
const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))
</script>
```

## suspense
`<suspense>`组件有两个插槽，它们都只接收一个直接子节点。default插槽里的节点会尽可能展示出来，如果不能则展示 fallback 插槽里的节点，一般展示的都是Loading
```vue
<Suspense>
    <template #default>
        <Dialog>
            <template #default>
                <div>我在哪儿</div>
            </template>
        </Dialog>
    </template>
    <template #fallback>
        <div>loading...</div>
    </template>
</Suspense>
```

