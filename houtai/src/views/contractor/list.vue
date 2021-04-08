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
<!--            <template slot-scope="scope" slot="menu">-->

<!--            </template>-->
            <template slot-scope="scope" slot="menu" >
                <el-button  icon="el-icon-view" type="text" size="small"  v-if="scope.row.status < 4"  @click="handleClick(scope.row)">查看方案</el-button>
<!--                <el-button type="text"-->
<!--                           size="mini"-->
<!--                           class="btn"-->
<!--                           icon="el-icon-edit"-->
<!--                           @click="editFrom(scope.row)"-->
<!--                           v-if="scope.row.status == 2"-->
<!--                >修改</el-button>-->
<!--                <el-button type="text"-->
<!--                           size="mini"-->
<!--                           class="btn"-->
<!--                           icon="el-icon-delete"-->
<!--                           @click="delBtn(scope.row)"-->
<!--                           v-if="scope.row.status == 2"-->
<!--                >删除</el-button>-->
<!--                <el-button type="warning" @click="handleGet" class="btn" size="mini"  v-if="scope.row.status == 1 && scope.row.people == 0" style=margin-bottom:5px;>下载模版</el-button>-->
<!--                <el-upload-->
<!--                        :show-file-list="false"-->
<!--                        name="staff"-->
<!--                        action='http://task.voil.vip:999/admin/excel/updstaff'-->
<!--                        class="btn"-->
<!--                        :data="{tid:scope.row.tid}"-->
<!--                        :headers="{token:stringtoken}">-->
<!--                    <el-button type="success" size="mini"  v-if="scope.row.status == 1 && scope.row.people == 0" >上传承包商</el-button>-->
<!--                    <el-button type="success" size="mini"  v-if="scope.row.status == 1 && scope.row.people != 0" >修改承包商</el-button>-->
<!--                </el-upload>-->
                <el-button type="text"
                           size="mini"
                           class="btn"
                           icon="el-icon-check"
                           @click="checkBtn(scope.row)"
                           v-if="scope.row.status == 1 "
                >通过</el-button>
                <el-button type="text"
                           size="mini"
                           class="btn"
                           icon="el-icon-close"
                           @click="closeBtn(scope.row)"
                           v-if="scope.row.status == 1"
                >拒绝</el-button>
               <el-button type="text"
                           size="mini"
                           class="btn"
                           icon="el-icon-check"
                           @click="openPayBtn(scope.row)"
                           v-if="scope.row.status == 4 "
                >确认收款</el-button>
                <el-button type="text"
                           size="mini"
                           class="btn"
                           icon="el-icon-close"
                           @click="closePayBtn(scope.row)"
                           v-if="scope.row.status == 4 "
                >未收到款</el-button>

                <el-button type="text"
                           size="mini"
                           class="btn"
                           icon="el-icon-check"
                           @click="fixPeoBtn(scope.row)"
                           v-if="scope.row.status == 7 ||  scope.row.status == 8"
                >结单</el-button>

<!--                <el-button type="text"-->
<!--                           size="mini"-->
<!--                           class="btn"-->
<!--                           icon="el-icon-check"-->
<!--                           @click="fixPeoBtn(scope.row)"-->
<!--                           v-if="scope.row.status == 7 ||  scope.row.status == 8"-->
<!--                >完结任务</el-button>-->
            </template>
        </avue-crud>
    <el-dialog title="银行流水号" :visible.sync="dialogPayVisible" :modal=false>
        <el-form :model="form">
         
                <el-form-item label="银行流水号" :label-width="formLabelWidth">
                    <el-input v-model="form.remarks" autocomplete="off"></el-input>
                </el-form-item>

            <hr>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="colos_pay()">取 消</el-button>
            <el-button type="primary" @click="checkPayBtn()">确 定</el-button>
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

                option:{
                    title:'承包商任务列表',

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
                            prop: "tid",
                            hide:true

                        },

                        {
                            label: "任务单号",
                            prop: "identifier",
                            search:true
                        },
                        {
                            label:'任务名称',
                            prop:'title',
                            search:true
                        },
                        {
                            label:'任务类型',
                            prop:'ctitle',

                        },
                        {
                            label:'参与人数',
                            prop:'people',


                        },
                        {
                            label:'任务周期',
                            prop:'starttime',


                        },
                        {
                            label:'任务佣金(元)',
                            prop:'task_price',


                        },
                        {
                            label:'需支付总额(元)',
                            prop:'real_price',


                        },
                        // {
                        //     label:'支付方式',
                        //     prop:'paytype',
                        //
                        //
                        // },
                        {
                            label: "发布时间",
                            prop: "ctime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",

                        },
                        {
                            label: '状态',
                            prop:'status',

                            dicData: [

                                {
                                    label: "<font color='green'>待审核</font>",
                                    value: 1
                                },
                                {
                                    label: "<font color='#1e90ff'>待付款</font>",
                                    value: 2
                                },
                                {
                                    label: "<font color='green'>已拒绝</font>",
                                    value: 3
                                },
                                {
                                    label: "<font color='#1e90ff'>已打款，待确认</font>",
                                    value: 4
                                },
                                {
                                    label: "<font color='orange'>任务已放弃</font>",
                                    value: 5
                                },
                                {
                                    label: "<font color='green'>开始任务</font>",
                                    value: 6
                                },
                                {
                                    label: "<font color='orange'>任务结束（自动结束）</font>",
                                    value: 7
                                },
                                {
                                    label: "<font color='red'>任务结束（已确认）</font>",
                                    value: 8
                                },
                                {
                                    label: "<font color='red'>已完成</font>",
                                    value: 9
                                },

                            ],

                        },

                    ]
                }
            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.$getRequest(baseUrl+'/admin/task/clists?sid='+37,this.page).then(res=>{
                    if(res.data.code == '200'){
                        this.data = res.data.data.list
                        for(var i in  res.data.data.list){
                            this.data[i].real_price = parseFloat(res.data.data.list[i].real_price/100,2);
                            this.data[i].task_price = parseFloat(res.data.data.list[i].task_price/100,2);
                            this.data[i].starttime = res.data.data.list[i].starttime.substr(0,10)+'<br/>'+res.data.data.list[i].endtime.substr(0,10)
                        }
                        this.page.total = res.data.data.total
                    }
                })
            },
            searchChange(params,done) {
                this.page.identifier = params.identifier;
                this.page.title = params.title;
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
            handleClick(row){
                this.$router.push({
                    path:'/task/task_detail',
                    query:{id:row.tid}
                });
            },
            checkBtn(row){
                var obj={};
                obj.tid  = row.tid;
                if(obj.people == 0){
                    this.$message.error('参与人数为0,请先查看方案是否分配对应承包商');
                    return false;
                }
                obj.status = 2
                this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('审核通过');
                        row.status = 2;
                    }else{
                        this.$message.error('审核失败，请重新尝试');
                    }
                })
            },
            closeBtn(row){
                var obj={};
                obj.tid  = row.tid;
                obj.status = 3
                // this.dialogVisible = true;
                this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('拒绝通过');
                        row.status = 3;
                    }else{
                        this.$message.error('拒绝失败，请重新尝试');
                    }
                })
            },
            checkPayBtn(){
                var obj={};
               
                obj.tid  = this.form.tid;
                obj.remarks = this.form.remarks;
                this.dialogPayVisible = false;
                obj.status = 6
                this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('已收款，开始任务');
                        // row.status = 6;
                    }else{
                        this.$message.error('审核失败，请重新尝试');
                    }
                })
            },
            openPayBtn(row){
                this.dialogPayVisible = true;
                this.form.tid = row.tid;
            },
            colos_pay(){
                 this.dialogPayVisible = false;
            },
            closePayBtn(row){
                var obj={};
                obj.tid  = row.tid;
                obj.status = 3
                this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('任务失败，未收到款');
                        row.status = 3;
                    }else{
                        this.$message.error('拒绝失败，请重新尝试');
                    }
                })
            },
            // payPeoBtn(row){
            //     var obj={};
            //     obj.tid  = row.tid;
            //     obj.status = 8
            //     this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
            //         if(res.data.code == '200'){
            //             this.$message.success('任务结束');
            //             row.status = 8;
            //         }else{
            //             this.$message.error('请求失败，请重新尝试');
            //         }
            //     })
            // },
            fixPeoBtn(row){
                var obj={};
                obj.tid  = row.tid;
                obj.status = 9

                this.$postRequest(baseUrl+'/admin/task/setStatus',obj).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('已完结');
                        row.status = 9;
                    }else{
                        this.$message.error('请求失败，请重新尝试');
                    }
                })
            },
        }



    }
</script>

<style scoped>

</style>