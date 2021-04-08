const isMobile = (rule, value, callback) => {
    // console.log(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value));
    if(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)){
        callback(new Error('必须是11位手机号码'))
    }else{
        callback();
    }
};
export default {
    title:'邮寄地址列表',
    dateBtn:false,
    dateDefault:false,
    searchShow:false,
    addBtn:false,
    excelBtn: false,
    editBtn:false,
    delBtn:false,
    align:'center',
    menuAlign:'center',
    labelWidth:120,
    submitText:'保存',
    column:[
        {
            label:'企业账号ID',
            prop:'uid',
            disabled:true
            // 
        },
        {
            label:'企业账号',
            prop:'tel',
            disabled:true
        },
        {
            label:'收件人姓名',
            prop:'d_name',
            rules:[
                { required: true, message: "必填", trigger: "blur" },
            ]
            
        },

        {
            label:'收件人地址',
            prop:'d_address',
            rules:[
                { required: true, message: "必填", trigger: "blur" },
            ]
        },
        {
            label:'收件人电话',
            prop:'d_tel',

            rules:[
                { required: true, message: "11位手机号码", trigger: "blur" },
                { min:11, max:11,message: "手机号长度为11位", trigger: "blur" },
                { validator: isMobile, trigger: 'blur' }
            ]

        },

    ]


}