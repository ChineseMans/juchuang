var DIC = {

    STATUS: [
        {
            value: false
        },
        {
            value: true,
        }],
    STATUS2: [
        {
            value: false
        },
        {
            value: true,
        }
    ]
}
export default {
    column: [{
        label: '网站基本信息设置',
        prop:'webinfo',
        option: {
            emptyBtn:false,
            submitText: '保存',
            column: [
                {
                    label: "全站费率设置",
                    prop: "tax_rate",
                    type: 'number',
                    labelWidth:'100',
                    span: 6,
                    precision:2,
                    valueDefault: 10,
                    minRows: 0,
                    maxRows: 100,
                    row:true,
                },
                {
                    label: "收款人",
                    labelWidth: '100',
                    span: 6,
                    prop: "payee",
                    row: true,
                },
                {
                    label: "收款银行",
                    labelWidth: '100',
                    span: 15,
                    prop: "bank",
                    row: true,
                },
                {
                    label: "收款银行卡号",
                    labelWidth: '100',
                    span: 15,
                    prop: "bank_account",
                    row: true,
                },
                // {
                //     label: "承包商查询",
                //     labelWidth:'100',
                //     prop: "switch",
                //     span: 6,
                //     type: "switch",
                //     dicData: DIC.STATUS,
                //     valueDefault: 1,
                //     hide: true,
                //     row:true,
                // }
            ]
        }
    }, {
        label: '短信接口配置',
        prop: 'sms',
        option: {
            submitText: '保存',
            column: [
                {
                    label: "主账号",
                    labelWidth: '100',
                    span: 15,
                    prop: "sms_account",
                    row: true,
                },
                {
                    label: "主账号Token",
                    labelWidth: '100',
                    span: 15,
                    prop: "sms_account_token",
                    row: true,
                },
                {
                    label: "appId",
                    labelWidth: '100',
                    span: 15,
                    prop: "sms_appId",
                    row: true,
                },
                {
                    label: "有效时间",
                    labelWidth: '100',
                    span: 10,
                    prop: "sms_active",
                    row: true,
                },
                {
                    label: "短信模板",
                    labelWidth: '100',
                    span: 21,
                    prop: "sms_templet",
                    row: true,
                },
                {
                    label: "是否启用短信",
                    labelWidth: '100',
                    prop: "sms_allow",
                    span: 6,
                    type: "switch",
                    dicData: DIC.STATUS2,
                    valueDefault: true,
                    row: true,
                }
            ]
        }
    },{
        label: '企业账号信息配置',
        prop: 'company',
        option: {
            submitText: '保存',
            column: [
                {
                    label: "企业账号对应公司数量",
                    labelWidth: '200',
                    span: 6,
                    prop: "max_amount_receipt",
                    row: true,
                },
                {
                    label: "企业账号对应邮寄地址数量",
                    labelWidth: '200',
                    span: 6,
                    prop: "max_amount_address",
                    row: true,
                },

            ]
        }
    },


    ]
}