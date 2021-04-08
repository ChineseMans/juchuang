<template>
    <basic-container>

        <avue-crud
                :option="option"
                :data="data"
                :page="page"
                v-model="obj"
                @search-change="searchChange"
        >
<!--            <template slot-scope="scope" slot="menu">-->

<!--            </template>-->
            <template slot-scope="scope" slot="menu" >
<!--                <el-button  icon="el-icon-view" type="text" size="small"  v-if="scope.row.status < 4"  @click="handleClick(scope.row)">查看方案</el-button>-->
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
                >开票</el-button>

            </template>
        </avue-crud>
        <el-dialog title="邮寄信息" :visible.sync="dialogVisible" :modal=false>
            <el-form :model="form">

                <el-form-item label="快递商" :label-width="formLabelWidth">
                    <el-input v-model="form.courier" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="快递号" :label-width="formLabelWidth">
                    <el-input v-model="form.courier_number" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="colos_pay()">取 消</el-button>
                <el-button type="primary" @click="submit_pay()">确 定</el-button>
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
                data:  [],
                form:{
                    mid:'',
                    courier:'',
                    courier_number:''
                },
                formLabelWidth:"120px",
                option:{


                    title: '发票列表',
                    addBtn: false,
                    editBtn: false,
                    delBtn: false,
                    dateDefault: true,
                    searchShow: false,
                    menu: true, //是否显示操作菜单栏
                    // addBtn: true, //是否显示新增按钮
                    // editBtn: true, //是否显示编辑按钮
                    viewBtn: false,
                    align: 'center',
                    menuAlign: 'center',
                    column: [{
                        label: "id",
                        prop: "id",
                        hide: true,
                        editDisplay: false, //编辑表单隐藏
                        addDisplay: false //新增表单隐藏

                    },
                        {
                            label: "公司名称",
                            prop: "firm_name",
                            // search: true,
                            editDisplay: false, //编辑表单隐藏
                            addDisplay: false //新增表单隐藏
                        },
                        {
                            label: '任务名称',
                            prop: 'title',
                            // search: true
                        },

                        {
                            label: '任务总金额',
                            prop: 'task_price',

                        },
                        {
                            label: '任务分类',
                            prop: 'cptitle',
                        },
                        {
                            label: '开票类型',
                            prop: 'ctitle',
                        },
                        {
                            label: '发票类型',
                            prop: 'tax_type',
                            dicData:[
                                {label:'普票',value:1},
                                {label:'专票',value:2}
                            ]
                        },
                        {
                            label: '开票总额(元)',
                            prop: 'real_price',
                            // search:true
                        },
                        {
                            label: '快递商',
                            prop: 'courier',
                            // search:true
                        },
                        {
                            label: '快递单号',
                            prop: 'courier_number',
                            // search:true
                        },

                        {
                            label: '状态',
                            prop: 'status',
                            type: 'select',
                            // search: true,
                            // editDisplay: false, //编辑表单隐藏
                            addDisplay: false, //新增表单隐藏
                            dicData: [
                                {
                                    label: "待开票",
                                    value: 1
                                },
                                {
                                    label: "已邮寄，待确认",
                                    value: 2
                                },
                                {
                                    label: "已确认",
                                    value: 3
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
                this.$getRequest(baseUrl+'/admin/mail/lists',this.page).then(res=>{
                    if(res.data.code == '200'){
                        this.data = res.data.data.list
                        for(var i in  res.data.data.list){
                            this.data[i].real_price = parseFloat(res.data.data.list[i].real_price/100,2);
                            this.data[i].task_price = parseFloat(res.data.data.list[i].task_price/100,2);
                        }
                        this.page.total = res.data.data.total
                    }
                })
            },
            searchChange(params) {
                this.$message.success(JSON.stringify(params));
            },
            handleClick(row){
                this.$router.push({
                    path:'/task/task_detail',
                    query:{id:row.tid}
                });
            },
            checkBtn(row){
                this.dialogVisible = true
                this.form.mid = row.mid
            },

            colos_pay(){
                this.dialogVisible = false;
            },
            submit_pay(){
                if(this.form.courier != ''){
                    if(this.form.courier_number == ''){
                        this.$message.error('请输入快递单号');
                    }else{
                        this.dialogVisible = false;
                        this.$postRequest(baseUrl+'/admin/mail/send',this.form).then(res=>{
                            if(res.data.code == '200'){
                                this.$message.success(res.data.data.msg)

                                this.getList();
                            }else{
                                this.$message.error(res.data.data.msg)
                            }
                        })

                    }
                }else{
                    this.$message.error('请输入快递商');
                }

            }

        }



    }
</script>

<style scoped>

</style>