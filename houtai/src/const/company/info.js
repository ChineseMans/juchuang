export default {

    title: '企业列表',
    dateBtn: false,
    dateDefault: false,
    searchShow: false,
    addBtn: false,
    excelBtn: false,
    editBtn: false,
    delBtn: false,
    align: 'center',
    menuAlign: 'center',
    column: [{
            label: 'Uid',
            prop: 'uid',
            hide: true

        },
        {
            label: 'Rid',
            prop: 'rid',
            hide: true
        },
        {
            label: '账号',
            prop: 'tel',

            search: true

        },
        {
            label: '公司名称',
            prop: 'firm_name',
            search: true
        },
        {
            label: '税务编号',
            prop: 'tax_number',
            // search:true

        },
        {
            label: '开户银行',
            prop: 'bank',
            // search:true

        },
        {
            label: '开户卡号',
            prop: 'bank_cid',
            // search:true

        },
        {
            label: '公司注册地址',
            prop: 'firm_address',
            // search:true

        },


        {
            label: '法人电话',
            prop: 'firm_tel',
            // search:true

        },
        {
            label: '交易银行',
            prop: 'brank',
            hide: true,
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]


        },
        {
            label: '交易卡号',
            prop: 'brank_cid',
            hide: true,
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]


        },
        {
            label: '交易卡主',
            prop: 'firm_holder',
            rules: [
                { required: true, message: "必填", trigger: "blur" },

            ]


        },
        {
            label: "添加时间",
            prop: "utime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
        },
        {
            label: '状态',
            prop: 'status',
            type: "radio",
            dicData: [{
                    label: "<font color='#8b0000'>已禁用</font>",
                    value: 0
                },
                {
                    label: "<font color='green'>待审核</font>",
                    value: 1
                },
                {
                    label: "<font color='#1e90ff'>已审核</font>",
                    value: 2
                },
                {
                    label: "<font color='red'>已拒绝</font>",
                    value: 3
                }
            ],
            // search:true,

        }

    ]


}