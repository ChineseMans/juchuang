<template>
    <basic-container>

        <avue-crud
                :option="option"
                :data="data"
                :page="page"
                v-model="obj"
                @search-change="searchChange"
                @size-change="sizeChange"
                @current-change="currentChange"
                @refresh-change = "refresh">
        >
            <template slot-scope="scope" slot="menu" >
                <el-button  icon="el-icon-check" type="text" size="small"  v-if="scope.row.status == 1 " @click="handleClick(scope.row)">确认回访</el-button>
                <el-button  icon="el-icon-edit" type="text" size="small"   @click="openBtn(scope.row)">备注</el-button>
           </template>
        </avue-crud>
        <el-dialog title="备注" :visible.sync="dialogPayVisible" :modal=false>
            <el-form :model="form">
             
                    <el-form-item>
                         <el-input type="textarea" v-model="form.note"></el-input>
                        <!-- <el-textarea v-model="form.remarks" autocomplete="off"></el-textarea> -->
                    </el-form-item>

                <!-- <hr> -->
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="colos()">取 消</el-button>
                <el-button type="primary" @click="checkBtn()">确 定</el-button>
            </div>
        </el-dialog>
    </basic-container>
</template>

<script>

    import {baseUrl} from "@/config/env";
    export default {
        name: "index",
        data(){
            return {
                obj:{},
                stringtoken:'',
                dialogPayVisible: false,
                page:{
                    pageSizes:[10,20,30,40],
                    currentPage : 1,
                    pageSize : 10,
                    total:0,
                    status:'',
                    search:''
                },
                data:  [],
                form: {
                  id:'',
                  note:''
                },
               
                option:{
                    title:'咨询列表',
                    // menu:false,
                    addBtn:false,
                    editBtn:false,
                    delBtn:false,
                    dateDefault:true,
                    searchShow:false,

                    align:'center',
                    menuAlign:'center',
                    column:[
                        {
                            label: "id",
                            prop: "id",
                            hide:true

                        },

                        {
                            label: "姓名",
                            prop: "cname",
                            search:true
                        },
                        {
                            label:'公司名称',
                            prop:'firmname',
                            search:true
                        },
                        {
                            label:'电话',
                            prop:'tel',

                        },
                        
                        {
                            label:'状态',
                            prop:'status',
                            dicData:[
                               {
                                    label: "<font color='green'>已回访</font>",
                                    value: 2
                                },
                                {
                                    label: "<font color='#1e90ff'>待回访</font>",
                                    value: 1
                                },
                            ]
                        },

                       {
                            label: "备注",
                            prop: "note",
                            type:'text'
                        },
                        {
                            label: "咨询时间",
                            prop: "ctime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",

                        },
                     
                    ]
                }
            }
        },
        created(){
            this.getList();
        },
        methods:{
            searchChange(params,done) {
                this.page.cname = params.cname;
                this.page.firmname = params.firmname;
                this.page.currentPage = 1;
                this.getList();
                done();
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
            refresh(){
                this.getList();
            },
            getList(){
                this.$getRequest(baseUrl+'/admin/consult/lists',this.page).then(res=>{
                    if(res.data.code == '200'){
                        this.data = res.data.data.list
                    }
                })
            },
            openBtn(row){
                this.dialogPayVisible = true;
                this.form.id = row.id;
            },
            colos(){
                 this.dialogPayVisible = false;
            },
            handleClick(row){
                this.form.id = row.id;
                this.$postRequest(baseUrl+'/admin/consult/dispose',this.form).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success(res.data.data.msg);
                        this.getList();
                    }else{
                        this.$message.error(res.data.data.msg);
                    }
                })
            },
            checkBtn(){
                this.dialogPayVisible = false;
                this.$postRequest(baseUrl+'/admin/consult/dispose',this.form).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success(res.data.data.msg);
                        this.getList();
                    }else{
                        this.$message.error(res.data.data.msg);
                    }
                })
            }
          
        }



    }
</script>

<style scoped>

</style>