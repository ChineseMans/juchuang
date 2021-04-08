const isMobile = (rule, value, callback) => {
    // console.log(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value));
    if (!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
        callback(new Error('必须是11位手机号码'))
    } else {
        callback();
    }
};
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
    labelWidth: 120,
    submitText: '保存',
    column: [{
            label: '企业账号ID',
            prop: 'uid',
            disabled: true
                // 
        },
        {
            label: '企业账号',
            prop: 'tel',
            disabled: true
        },
        {
            label: '公司名称',
            prop: 'firm_name',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]

        },
        {
            label: '税务编号',
            prop: 'tax_number',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]


        },
        {
            label: '交易银行',
            prop: 'bank',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]


        },
        {
            label: '交易卡号',
            prop: 'bank_cid',
            rules: [
                { required: true, message: "必填", trigger: "blur" },

            ]


        },
        {
            label: '公司注册地址',
            prop: 'firm_address',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]
        },
        // {
        //     label: '法人姓名',
        //     prop: 'firm_holder',
        //     rules: [
        //         { required: true, message: "必填", trigger: "blur" },
        //     ]
        // },
        {
            label: '法人电话',
            prop: 'firm_tel',

            rules: [
                { required: true, message: "11位手机号码", trigger: "blur" },
                { min: 11, max: 11, message: "手机号长度为11位", trigger: "blur" },
                { validator: isMobile, trigger: 'blur' }
            ]

        },
        // {
        //     label: '交易银行',
        //     prop: 'brank',
        //     rules: [
        //         { required: true, message: "必填", trigger: "blur" },
        //     ]


        // },
        // {
        //     label: '交易卡号',
        //     prop: 'brank_cid',
        //     rules: [
        //         { required: true, message: "必填", trigger: "blur" },
        //     ]


        // },
        {
            label: '交易卡主',
            prop: 'firm_holder',
            rules: [
                { required: true, message: "必填", trigger: "blur" },

            ]


        },

    ]


}