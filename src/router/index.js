import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 选择方向页面
    {
      path: '/',
      redirect: '/select'
    },
    {
      path: '/select',
      component: () => import('../views/SelectDirection/SelectDirection.vue')
    },


    // 三个输入框页面
    // 污水处理厂低碳运行评价技术规范
    {
      path: '/inputstandard',
      component: () => import('../views/InputBox/InputBoxStandard.vue')
    },
    // 城镇污水处理厂污染物去除协同控制温室气体核算技术指南（试行）
    {
      path: '/inputfingerpost',
      component: () => import('../views/InputBox/InputBoxFingerpost.vue')
    },
    // 城镇污水处理厂碳减排评估标准
    {
      path: '/inputevasta',
      component: () => import('../views/InputBox/InputBoxEvaSta.vue')
    },



    // 三个展示界面
    // 污水处理厂低碳运行评价技术规范
    {
      path: '/showstandard',
      component: () => import('../views/ShowData/ShowDataStandard.vue')
    },
    // 城镇污水处理厂污染物去除协同控制温室气体核算技术指南（试行）
    {
      path: '/showfingerpost',
      component: () => import('../views/ShowData/ShowDataFingerpost.vue')
    },
    // 城镇污水处理厂碳减排评估标准
    {
      path: '/showevasta',
      component: () => import('../views/ShowData/ShowDataEvaSta.vue')
    },


    // 修改后台数据页面
    {
      path:'/changedata',
      component: () => import('../views/ChangeData.vue')
    }
  ]
})

export default router
