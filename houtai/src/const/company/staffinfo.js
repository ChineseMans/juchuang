const isMobile = (rule, value, callback) => {
    // console.log(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value));
    if (!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
        callback(new Error('必须是11位手机号码'))
    } else {
        callback();
    }
};
export default {
    title: '承包商列表',
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
    column: [
    {
            label: '识别码',
            prop: 'ident',
            disabled: true
                // 
        },
        
        {
            label: '姓名',
            prop: 'name',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]

        },
        {
            label: '电话',
            prop: 'tel',
            rules: [
                { required: true, message: "11位手机号码", trigger: "blur" },
                { min: 11, max: 11, message: "手机号长度为11位", trigger: "blur" },
                { validator: isMobile, trigger: 'blur' }
            ]


        },
		{
		    label: '密码',
		    prop: 'password',
		    rules: [
		        { required: true, message: "必填", trigger: "blur" },
		    ]
		
		},
        {
            label: '身份证号码',
            prop: 'idcrod',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]


        },
        {
            label: '开户银行',
            prop: 'bank',
            rules: [
                { required: true, message: "必填", trigger: "blur" },

            ]


        },
        {
            label: '银行卡号',
            prop: 'bank_cid',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]
        },
        
        {
            label: '开户人',
            prop: 'bank_holder',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]
        },
        {
            label: '地址',
            prop: 'address',
            rules: [
                { required: true, message: "必填", trigger: "blur" },
            ]
        },
		{
		    disabled: true,
			hidden:true
		},
        {
            label: '身份证正面照',
            prop: 'url1',
            type: 'upload',
            propsHttp: {
              home: '',
              url: 'path',
              name: 'path'
            },
            listType: 'picture-img',
            loadText: '图片上传中，请稍等',
            tip: '只能上传jpg/png用户头像，且不超过500kb',
            action: 'http://admin.juchuang.voil.vip:999/admin/contractor/upload'
          },
          {
            label: '身份证反面照',
            prop: 'url2',
            type: 'upload',
            propsHttp: {
              home: '',
              url: 'path',
              name: 'path'
            },
            listType: 'picture-img',
            loadText: '图片上传中，请稍等',
            tip: '只能上传jpg/png用户头像，且不超过500kb',
            action: 'http://admin.juchuang.voil.vip:999/admin/contractor/upload'
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
        

    ]


}