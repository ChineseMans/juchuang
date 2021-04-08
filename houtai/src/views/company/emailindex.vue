<template>
    <basic-container>

        <avue-crud :option="option" :data="data" :page="page"

                   @refresh-change = "refresh">

                <template slot-scope="scope" slot="menu" >
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
<!--                    <el-button type="success"-->
<!--                               size="mini"-->
<!--                               class="btn"-->
<!--                               icon="el-icon-check"-->
<!--                               @click="checkBtn(scope.row)"-->
<!--                               v-if="scope.row.status == 1"-->
<!--                    >通过</el-button>-->
<!--                    <el-button type="danger"-->
<!--                               size="mini"-->
<!--                               class="btn"-->
<!--                               icon="el-icon-close"-->
<!--                               @click="closeBtn(scope.row)"-->
<!--                               v-if="scope.row.status == 1"-->
<!--                    >拒绝</el-button>-->
                </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";
    import option from "@/const/company/emailinfo";
    export default {
        name: "emailindex",
        data(){
            return {
                data:  [],
                page:{
                    pageSizes:[10,20,30,40],
                    currentPage : 1,
                    pageSize : 10,
                    total:0,
                    status:'',
                    search:''
                },
                option:option

            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.$getRequest(baseUrl+'/admin/address/lists',this.page).then(res=>{
                    this.data = res.data.data.list
                    this.page.total = res.data.data.total
                })
            },
            // searchChange(params,done) {
            //     this.page.identifier = params.identifier;
            //     this.page.title = params.title;
            //     this.page.currentPage = 1;
            //     this.getList();
            //     done();
            // },
            // sizeChange(val) {
            //     this.page.currentPage = 1
            //     this.page.pageSize = val
            //     this.getList()
            // },
            // currentChange(val) {
            //     this.page.currentPage = val
            //     this.getList()
            // },
            refresh(){
                this.getList();
            },
            delBtn(row){
                var obj={};
                obj.rid = row.rid
                obj.status = 0
                // console.log(obj)
                this.$postRequest(baseUrl+'/admin/receipt/upd',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('删除成功');
                        row.status = 0;
                    }else{
                        this.$message.success('删除失败，请重新尝试');
                    }
                })
            },
            checkBtn(row){
                var obj={};
                obj = row;
                obj.status = 2
                this.$postRequest(baseUrl+'/admin/receipt/upd',obj).then(res=>{
                   if(res.data.code == '200'){
                       this.$message.success('审核通过');
                       row.status = 2;
                   }else{
                       this.$message.success('审核失败，请重新尝试');
                   }
                })
            },
            closeBtn(row){
                var obj={};
                obj = row;
                obj.status = 3
                this.$postRequest(baseUrl+'/admin/receipt/upd',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('拒绝通过');
                        row.status = 3;
                    }else{
                        this.$message.success('拒绝失败，请重新尝试');
                    }
                })
            }
        }



    }
</script>

<style scoped>
    .btn{
        display: inline-block;
    }
</style>    