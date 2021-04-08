<template>
    <basic-container>
        <avue-crud :option="option" :data="data" :page="page" v-model="obj" @search-change="searchChange" @size-change="sizeChange"
                @current-change="currentChange"
                @refresh-change = "refresh">
                <template slot-scope="scope" slot="menuLeft">
                    <el-button type="primary" size="mini" class="btn" @click="addFrom()" >新增</el-button>
                    <!--<el-button type="warning" @click="handleGet" class="btn" size="mini">下载模版</el-button>
                    <el-upload :show-file-list="false" action="action" class="btn"  :on-change="handleChange">
                        <el-button type="success" size="mini">导入 excel</el-button>
                    </el-upload>-->

                </template>
                <template slot-scope="scope" slot="menu" >
                <el-button type="text"
                       size="mini"
                       class="btn"
                       icon=""
                       @click="getLists(scope.row)"
                       
            >查看任务列表</el-button>
            <el-button type="text"
                       size="mini"
                       class="btn"
                       icon="el-icon-edit"
                       @click="editFrom(scope.row)"
                       
            >修改</el-button>
            <el-button type="text"
                       size="mini"
                       class="btn"
                       icon="el-icon-delete"
                       @click="delBtn(scope.row)"
                       
            >删除</el-button>
        </template>


        </avue-crud>
    </basic-container>
</template>

<script>
import {baseUrl} from "@/config/env";
import option from "@/const/company/staff";
    export default {
        name: "index",
        data(){
            return {
                obj:{},
                stringtoken:'',
                dialogVisible: false,
                page:{
                    pageSizes:[10,20,30,40],
                    currentPage : 1,
                    pageSize : 10,
                    total:0,
                    status:'',
                    search:''
                },
                dialogPayVisible:false,
                form: {
                  tid:'',
                  remarks:''
                },
                formLabelWidth: '120px',
                data:  [],
                option:option

            }
        },
        created(){
            this.getList();
        },
        methods:{
        refresh(){
                this.getList();
            },
            getList(){
                this.$getRequest(baseUrl+'/admin/staff/lists',this.page).then(res=>{
                    if(res.data.code == '200'){
                        this.data = res.data.data.list
                        
                        this.page.total = res.data.data.total
                    }
                })
            },
            searchChange(params) {
                this.$message.success(JSON.stringify(params));
            },
            sizeChange(val) {
                this.page.currentPage = 1
                this.page.pageSize = val
                this.getList()
            },
            currentChange(val) {
                this.page.currentPage = val
                this.getList()
            },
            handleGet(){
                // window.open('D:/VUE/juchuang/demo.xlsx')
            },
            handleChange(file) {

                this.$export.xlsx(file.raw)
                    .then(data => {
                        console.log(data)
                        this.data=data.results;
                    })
            },
            editFrom(row){
                 console.log(row);
                this.$router.push({
                    path:'/contractor/edit',
                    query:{detail:row}
                })
            },
            getLists(row){
                 //console.log(row.id);return false;
                this.$router.push({
                    path:'/contractor/list?sid='+row.id,
                    query:{detail:row}
                })
            },
            delBtn(row){
                var obj={};
                obj.sid = row.sid
                obj.status = 0
                // console.log(obj)
                this.$postRequest(baseUrl+'/admin/contractor/del',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('删除成功');
                        this.getList();
                        this.reload=true;
                        this.$router.push({
                            path:'/contractor/index'
                        })
                    }else{
                        this.$message.success('删除失败，请重新尝试');
                    }
                })
            },
            addFrom(){
                this.$router.push({
                    path:'/contractor/add'
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