<template>
    <basic-container>

        <avue-crud :option="option" :data="data" :page="page"
                   @search-change="searchChange"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   @refresh-change = "refresh">
                <template slot-scope="scope" slot="menuLeft">
                    <el-button type="primary"
                               size="mini"
                               class="btn"
                               @click="addFrom()" >新增企业账号</el-button>
                </template>
                <template slot-scope="scope" slot="menu">
                    <el-button type="text"
                               size="mini"
                               class="btn"
                               icon="el-icon-plus"
                               @click="addCompanyInfo(scope.row)" >添加企业信息</el-button><br/>
                    <el-button type="text"
                               size="mini"
                               class="btn"
                               icon="el-icon-s-order"
                               @click="EmailInfo(scope.row)" >邮寄信息列表</el-button><br/>
                    <el-button type="text"
                               size="mini"
                               class="btn"
                               icon="el-icon-edit"
                               @click="editFrom(scope.row)" >修改账号</el-button>
                    <el-button type="text"
                               size="mini"
                               class="btn"
                               icon="el-icon-delete"
                               @click="delBtn(scope.row)" >注销账号</el-button>
                </template>

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
                    title:'企业列表',
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
                            prop: 'uid'
                        },
                        {
                            label: '企业电话',
                            span: 16,
                            row: true,
                            type: 'text',
                            prop: 'tel',
                            search:true
                        }, {
                            label: "登录时间",
                            prop: "logintime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                        },
                        {
                            label: '费率',
                            span: 16,
                            row: true,
                            type:'text',
                            prop: 'rate',


                        },
                        {
                            label: '状态',
                            span: 16,
                            row: true,
                            type:'radio',
                            prop: 'status',
                            dicData:[
                                {label:'<font color=green>正常</font>',value:1},
                                {label:'<font color=red>禁用</font>',value:0},
                            ]

                        },
                        {
                            label: "创建时间",
                            prop: "ctime",
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
                this.$getRequest(baseUrl+'/admin/company/lists',this.page).then(res=>{
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