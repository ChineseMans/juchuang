<template>
    <basic-container>

        <avue-crud :option="option" :data="data" :page="page"
                   @search-change="searchChange"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   @refresh-change = "refresh">

        </avue-crud>
    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";
    export default {
        name: "account",
        data(){
            return {
                data:  [],
                page:{
                    pageSizes:[10,20,30,40],
                    currentPage : 1,
                    pageSize : 10,
                    total:0,
                    status:1,
                    search:''
                },
                option:{
                    title:'代理列表',
                    dateBtn:false,
                    dateDefault:false,
                    searchShow:false,
                    addBtn:false,
                    excelBtn: false,
                    editBtn:false,
                    delBtn:false,
                    align:'center',
                    menuAlign:'center',
                    column: [
                        {
                            label: 'ID',
                            span: 16,
                            row: true,
                            type: 'text',
                            prop: 'id'
                        },
                        {
                            label: '账号',
                            span: 16,
                            row: true,
                            type: 'text',
                            prop: 'username',
                            search:true
                        },
                        {
                            label: '密码',
                            span: 16,
                            row: true,
                            type:'text',
                            prop: 'pwd',


                        },
                        {
                            label: '发包方',
                            span: 16,
                            row: true,
                            type:'text',
                            prop: 'tel',

                        },
                        {
                            label: '企业名称',
                            span: 16,
                            row: true,
                            type:'text',
                            prop: 'firm_name',

                        },
                        {
                            label: '承包商数量',
                            span: 16,
                            row: true,
                            type:'text',
                            prop: 'num',

                        },
                        {
                            label: "注册时间",
                            prop: "regtime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                        }
                        ]





                }
            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.$getRequest(baseUrl+'/admin/company/agent',this.page).then(res=>{
                    this.data = res.data.data.list
                    this.page.total = res.data.data.total
                    // this.page.currentPage = parseInt(res.data.data.currentPage)

                })
            },
            searchChange(params,done) {
                 this.page.tel = params.tel;
                 this.page.currentPage = 1;
                 this.getList();
                 done();
            },
            sizeChange(val) {
                this.page.currentPage = 1
                this.page.pageSize = val
                this.getList()
                // this.$message.success('行数' + val)
            },
            currentChange(val) {
                this.page.currentPage = val
                this.getList()
                // this.$message.success('页码' + val)
            },
            refresh(){
                this.getList();
            },
            addFrom(){
                this.$router.push({
                    path:'/company/addaccount'
                })
            },
            editFrom(row){

                this.$router.push({
                    path:'/company/editaccount',
                    query:{
                        tel:row.tel,
                        pwd:row.pwd,
                        rate:row.rate,
                        status:row.status
                    }
                })
            },
            delBtn(row){
                this.$postRequest(baseUrl+'/admin/company/upd',{uid:row.uid,status:0}).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success(res.data.data.msg);
                        this.getList();
                    }else{
                        this.$message.error(res.data.data.msg);
                    }
                })
            },
            addCompanyInfo(row){
                this.$router.push({
                    path:'/company/add',
                    query: {
                        uid:row.uid,
                        tel:row.tel,
                    }

                })
            },
            EmailInfo(row){
                this.$router.push({
                    path:'/company/emailindex',
                    query: {
                        uid:row.uid,
                        tel:row.tel,

                    }

                })
            },
        }



    }
</script>

<style scoped>
    .btn{
        display: inline-block;
    }
</style>    