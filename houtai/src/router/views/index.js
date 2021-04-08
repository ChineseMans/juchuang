import Layout from '@/page/index/'
export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/index')
  }, {
    path: 'dashboard',
    name: '控制台',
    meta: {
      i18n: 'dashboard',
      menu: false,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/dashboard')
  }]
}, {
  path: '/form-detail',
  component: Layout,
  children: [{
    path: 'index',
    name: '详情页',
    meta: {
      i18n: 'detail'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/form-detail')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/info')
  }, {
    path: 'setting',
    name: '个人设置',
    meta: {
      i18n: 'setting'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/setting')
  }]
},
  {
    path: '/job',
    component: Layout,
    children: [{
      path: 'index',
      name: '任务处理',
      meta: {
        i18n: 'job'
      },
      component: () =>
          import( /* webpackChunkName: "views" */ '@/views/job/index')
    }]
  }
  ,
  {
    path: '/consult',
    component: Layout,
    children: [{
      path: 'index',
      name: '咨询列表',
      meta: {
        i18n: 'job'
      },
      component: () =>
          import( /* webpackChunkName: "views" */ '@/views/consult/index')
    }]
  },
  {
    path: '/agent',
    component: Layout,
    children: [{
      path: 'index',
      name: '代理列表',
      meta: {
        i18n: 'contractor'
      },
      component: () =>
          import( /* webpackChunkName: "views" */ '@/views/agent/index')
    }
    ]
  },
  {
    path: '/contractor',
    component: Layout,
    children: [{
      path: 'index',
      name: '承包商列表',
      meta: {
        i18n: 'contractor'
      },
      component: () =>
          import( /* webpackChunkName: "views" */ '@/views/contractor/index')
    },
    {
          path: 'list',
          name: '承包商任务列表',
          meta: {
            i18n: 'task'
          },
          component: () =>
              import( /* webpackChunkName: "views" */ '@/views/contractor/list')
        },
    {
          path: 'add',
          name: '添加承包商',
          meta: {
            i18n: 'task'
          },
          component: () =>
              import( /* webpackChunkName: "views" */ '@/views/contractor/add')
        },
        {
          path: 'edit',
          name: '修改承包商',
          meta: {
            i18n: 'task'
          },
          component: () =>
              import( /* webpackChunkName: "views" */ '@/views/contractor/edit')
        }
    ]
  } ,
    {
        path: '/task',
        component: Layout,
        children: [
            {
            path: 'index',
            name: '任务列表',
            meta: {
                i18n: 'task'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/task/index')
          },
          {
            path: 'task_detail',
            name: '任务详情',
            meta: {
              i18n: 'task_detail'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/task/detail')
          },
          {
            path: 'money',
            name: '服务费',
            meta: {
              i18n: 'money'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/task/money')
          }
        ]
    },
  {
    path: '/email',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '发票列表',
        meta: {
          i18n: 'email'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/email/index')
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '企业信息列表',
        meta: {
          i18n: 'company'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/index')
      },
      {
        path: 'add',
        name: '添加企业信息',
        meta: {
          i18n: 'company'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/add')
      },
      {
        path: 'edit',
        name: '修改企业信息',
        meta: {
          i18n: 'company'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/edit')
      },
      {
        path: 'account',
        name: '企业账号列表',
        meta: {
          i18n: 'company'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/account')
      },
      {
        path: 'addaccount',
        name: '添加企业账号',
        meta: {
          i18n: 'addaccount'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/addaccount')
      },
      {
        path: 'editaccount',
        name: '修改企业账号',
        meta: {
          i18n: 'editaccount'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/editaccount')
      },
      {
        path: 'emailindex',
        name: '邮寄信息列表',
        meta: {
          i18n: 'emailindex'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/emailindex')
      },
      {
        path: 'emailadd',
        name: '添加邮寄信息',
        meta: {
          i18n: 'emailadd'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/emailadd')
      },
      {
        path: 'emailedit',
        name: '修改邮寄信息',
        meta: {
          i18n: 'emailedit'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/company/emailedit')
      },
    ]
  } ,
  {
    path: '/setting',
    component: Layout,
    children: [
        {
          path: 'category',
          name: '任务分类管理',
          meta: {
            i18n: 'category'
          },
          component: () =>
              import( /* webpackChunkName: "views" */ '@/views/setting/category')
        },
          {
            path: 'web_setting',
            name: '网站设置',
            meta: {
              i18n: 'web_setting'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/setting/web_setting')
          },
          {
            path: 'account',
            name: '账号管理',
            meta: {
              i18n: 'account'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/setting/account')
          },
          {
            path: 'law',
            name: '法律条款设置',
            meta: {
              i18n: 'law'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/setting/law')
          }
      ]
  }

]