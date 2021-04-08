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
    column:[
            {
                label:'编号',
                prop:'sid',
                search:true
            },
            {
                label:'姓名',
                prop:'name',
                search:true
            },
            {
                label:'电话',
                prop:'tel',
                search:true

            },
            {
                label:'证件号',
                prop:'idcrod',
                search:true

            },
            {
            label: "身份证正面照",
            width:"80",
            type:"img",
            prop: "url1",
            dataType: 'string',
          },
          {
            label: "身份证反面照",
            width:"80",
            type:"img",
            alone:true,
            prop: "url2",
            dataType: 'string',
          },
          {
                label:'银行名称',
                prop:'bank',
                search:true

            },
            {
                label:'卡号',
                prop:'bank_cid',
                search:true

            },
            {
                label:'地址',
                prop:'address',
                search:true

            },
            {
                label:'累计交易金额',
                prop:'all_price',
                search:true

            },
            {
                label:'本月累计金额',
                prop:'m_price',
                search:true

            },
            {
                label: "导入时间",
                prop: "ctime",
                type: "date",
                format: "yyyy-MM-dd hh:mm:ss",
                valueFormat: "yyyy-MM-dd hh:mm:ss",
            }
        ]


}