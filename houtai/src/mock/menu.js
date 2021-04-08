import Mock from 'mockjs'
const top = []
const first = [{
        label: "首页",
        path: '/wel',
        component: 'views/wel/index',
        icon: 'icon-huanyingye',
        children: []
    }, {
        label: "事件提醒",
        path: '/job',
        icon: 'icon-info',
        component: 'views/job/index',
    },
   
    // {
    //     label: "资金模块",
    //     path: '/money',
    //     icon: 'icon-recharge',
    //     children: [{
    //         label: "交易流水",
    //         path: 'index',
    //         icon: 'icon-recharge',
    //         component: 'views/money/index',
    //         children: [

    //         ],
    //     }]
    // },
      {
      label: "承包商管理",
      path: '/contractor',
      icon: 'icon-friendadd',
      children: [{
        label: "承包商列表",
        path: 'index',
        icon: 'icon-friendadd',
        component: 'views/contractor/index',
        children: [],
      },]
    },
    {
        label: "代理管理",
        path: '/agent',
        icon: 'icon-group_fill',
        
    },
    {
        label: "任务管理",
        path: '/task',
        icon: 'icon-newshot',
        component: 'views/task/index',
        children: [{
            label: "任务列表",
            path: 'index',
            icon: 'icon-newshot',
            component: 'views/task/index',
            meta: {},
            children: []
        },
        {
            label: "服务费管理",
            path: 'money',
            icon: 'icon-newshot',
            component: 'views/task/money',
            meta: {},
            children: []
        }]
    }, {
        label: "企业管理",
        path: '/company',
        icon: 'icon-group_fill',
        children: [{
            label: "企业账号列表",
            path: 'account',
            icon: 'icon-group_fill',
            meta: {},
            children: []
        }, {
            label: "企业列表",
            path: 'index',
            icon: 'icon-friendadd',
            meta: {},
            children: []
        }, ]
    }, {
        label: "发票管理",
        path: '/email',
        component: 'views/email/index',
        icon: 'icon-recharge',

        children: []
    },
    // {
    //   label: "数据统计",
    //   path: '/form',
    //   component: 'views/util/form',
    //   icon: 'icon-rankfill',
    //
    //   children: []
    // },
    {
        label: "咨询提醒",
        path: '/consult',
        icon: 'icon-info',
        component: 'views/consult/index',
    },
    {
        label: "设置",
        path: '/setting',
        icon: 'icon-caidan',
        children: [{

                label: "任务分类管理",
                path: 'category',
                icon: 'icon-caidanguanli',
                meta: {},
                children: []
            },
            //   {
            
            //   label: "法律条款设置",
            //   path: 'law',
            //   icon: 'icon-caidanguanli',
            //   component: 'views/setting/law',
            //   meta: {},
            //   children: []
            // },
            //   {
            
            //   label: "账号管理",
            //   path: 'account',
            //   icon: 'icon-caidanguanli',
            //   component: 'views/setting/account',
            //   meta: {},
            //   children: []
            // },
            {

                label: "网站设置",
                path: 'web_setting',
                icon: 'icon-caidanguanli',
                component: 'views/setting/web_setting',
                meta: {},
                children: []
            }
        ]
    }
]
const second = []

export default () => {
    let menu = [first, second];
    Mock.mock('/user/getMenu', 'get', (res) => {
        let body = JSON.parse(res.body);
        return {
            data: menu[body.type] || []
        }
    })
    Mock.mock('/user/getTopMenu', 'get', () => {
        return {
            data: top
        }
    })

}