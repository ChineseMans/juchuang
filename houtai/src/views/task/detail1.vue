<template>
  <basic-container>
    <el-row>
      <el-col :span="24">
        <h3 class="title">任务信息</h3>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-row>
        <el-col :span="6">名称：{{task.title}}</el-col>
        <el-col :span="6">任务类别：{{task.rid}}</el-col>
        <el-col :span="6">任务编号：{{task.identifier}}</el-col>
        <el-col :span="6">任务描述：{{task.caption}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">时间段：{{task.starttime}}-{{task.endtime}}</el-col>
        
        <el-col :span="6">
          任务总金额：
          <font color="red" size="4">{{task.real_price/100}}元</font>
        </el-col>
        <el-col :span="6">人员描述：{{task.requirement}}</el-col>
        <el-col :span="6">发票地址：{{task.firm_address}}</el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h3 class="title">发票信息及邮寄地址</h3>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-row>
        <el-col :span="6">企业名称：{{task.firm_name}}</el-col>
        <el-col :span="6">税务编号：{{task.tax_number}}</el-col>
        <el-col :span="6">开户银行卡：{{task.bank}}</el-col>
        <el-col :span="6">银行卡号：{{task.bank_cid}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">地址：{{task.d_address}}</el-col>
        <el-col :span="6">电话：{{task.d_tel}}</el-col>
        <el-col :span="6">姓名：{{task.d_name}}</el-col>
        <el-col :span="6">累计金额：{{task.count}}</el-col>
      </el-row>
    </el-row>

    <el-tabs type="border-card">
      <el-tab-pane label="承包商列表">
        <avue-crud ref="crud" :option="option" :data="list" :page="page" v-model="obj" @row-update="addUpdate">
          <template slot-scope="scope" slot="menuLeft">
            <el-button
              type="warning"
              @click="handleGet"
              class="btn"
              size="mini"
              style="margin-bottom:5px;"
            >下载模版</el-button>
            <el-upload
              :show-file-list="false"
              name="staff"
              action="http://admin.juchuang.voil.vip:999/admin/excel/updstaff"
              class="btn"
              :data="{tid:tid}"
              :headers="{token:stringtoken}"
              :on-success="upload_success"
            >
              <el-button type="success" size="mini">上传方案</el-button>
              <!--                            <el-button type="success" size="mini"  >修改承包商</el-button>-->
            </el-upload>
            <el-button  type="success" size="mini"   @click="openBtn(scope.row)">选择承包商</el-button>
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="选择承包商" :visible.sync="dialogPayVisible" :modal=false >
            <el-form :model="form">
                    <el-form-item>
                         <avue-crud :option="options" :data="lists" :page="pages" v-model="obj"  @size-change="sizeChange" @current-change="currentChange"
                @selection-change="selectionChange"></avue-crud>
                    </el-form-item>
                    
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="colos()">取 消</el-button>
                <el-button type="primary" @click="checkBtn()">确 定</el-button>
            </div>
        </el-dialog>
  </basic-container>
  
</template>

<script>
import { baseUrl } from "@/config/env";
import { getToken } from "@/util/auth";
export default {
  name: "task_detail",
  data() {
    return {
      stringtoken: "",
      dialogPayVisible: false,
      page:{
                    pageSizes:[10,20,30,40],
                    currentPage : 1,
                    pageSize : 10,
                    total:0,
                    status:'',
                    search:''
                },
      pages:{
          pageSizes:[10,20,30,40],
          currentPage : 1,
          pageSize : 10,
          total:0,
          status:'',
          search:''
      },
      task: {},
      tid: this.$route.query.id,
      obj: {},
      form: {
                  sid:[],
                  note:''
                },
      list: [],
      lists: [],
      option: {
        addBtn: false,
        delBtn: false,
        menu: true,
        editBtn:false,
        menuWidth:"80",
        cellBtn:true,
        column: [
          {
            label: "承包商名称",
            prop: "name"
          },
          {
            label: "电话号码",
            prop: "tel"
          },
          {
            label: "身份证号码",
            prop: "idcrod"
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
            label: "报价",
            width:"150",
            prop: "price",
            cell: true,
            type:"number",
            min:0
            
          },
          {
            label: "开户银行",
            prop: "bank"
          },
          {
            label: "银行卡号",
            prop: "bank_cid"
          },
          {
            label: "开户人",
            prop: "bank_holder"
          },
          {
            label: "地址",
            prop: "address"
          },
          {
            label: "任务描述",
            width:"120",
            prop: "details",
            cell: true,
            type: "textarea"
          },
          {
            label: "费率",
            width:"150",
            prop: "rate"
          },
          {
            label: "实际需支付",
            width:"150",
            prop: "zprice"
          }
        ]
      },
      options: {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        menu: false,
        selection:true,
        refreshBtn:false,
        columnBtn:false,
        header:false,
        column: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "电话号码",
            prop: "tel"
          },
          {
            label: "证件号",
            prop: "idcrod"
          },
          {
            label: "开户银行",
            prop: "bank"
          },
          {
            label: "银行卡号",
            prop: "bank_cid"
          },
          {
            label: "本月累计金额",
            prop: "m_price"
          },
          {
            label: "累计交易金额",
            prop: "all_price"
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
    };
  },
  created() {
    this.stringtoken = getToken();
    this.getList();
    this.getLists();
    this.$getRequest(baseUrl + "/admin/task/info", {
      tid: this.$route.query.id
    }).then(res => {
      if (res.data.code == "200") {
        this.task = res.data.data;
        this.task.starttime = this.task.starttime.substr(0, 10);
        this.task.endtime = this.task.endtime.substr(0, 10);
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  methods: {
    getList() {
      this.$postRequest(baseUrl + "/admin/task/getStaff", {
        tid: this.$route.query.id
      }).then(res => {
        if (res.data.code == "200") {
          // this.$message.success('上传成功')
          this.list = res.data.data.list;
          for (var i in res.data.data.list) {
            this.list[i].price = res.data.data.list[i].price / 100;
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getLists(){
        this.$getRequest(baseUrl+'/admin/staff/lists',this.pages).then(res=>{
            if(res.data.code == '200'){
                this.lists = res.data.data.list
                
                this.pages.total = res.data.data.total
            }
        })
    },
    addUpdate(form,index,done,loading){
      var data = {};
      data.price = '';
      data.id = form.id;
      data.price = form.price;
      data.details = form.details;
      data.tid = this.$route.query.id;
      
      if(typeof(data.price) == 'undefined'){
      this.$message.error("请输入报价");loading();return false;done();
      }
      //console.log(data.price);return;
      if(data.price <= 0 || data.price == ''){
       this.$message.error("请输入报价");loading();return false;done();
      }
      this.$postRequest(baseUrl+'/admin/task/update_receive_log',data).then(res=>{
            if(res.data.code == '200'){
                this.$message.success(res.data.data.msg);
                this.getList();
                this.$getRequest(baseUrl + "/admin/task/info", {
                tid: this.$route.query.id
              }).then(res => {
                if (res.data.code == "200") {
                  this.task = res.data.data;
                  this.task.starttime = this.task.starttime.substr(0, 10);
                  this.task.endtime = this.task.endtime.substr(0, 10);
                } else {
                  this.$message.error(res.data.msg);
                }
              });
                setTimeout(() => {
                  
                  loading();
                }, 2000)
                
            }else{
                this.$message.error(res.data.data.msg);
            }
        })
      done()
    },
    selectionChange(list){
    this.form.sid = [];
    for (var i in list) {
          this.form.sid.push(list[i].sid);
      }
      },
    sizeChange(val) {
        this.pages.currentPage = 1
        this.pages.pageSize = val
        this.getLists()
    },
    currentChange(val) {
        this.pages.currentPage = val
        this.getLists()
    },
    openBtn(row){
                this.dialogPayVisible = true;
    },
    colos(){
                 this.dialogPayVisible = false;
    },
    checkBtn(){
                this.dialogPayVisible = false;
                var data = {};
                data.sid = this.form.sid;
                data.tid = this.$route.query.id;

                this.$postRequest(baseUrl+'/admin/task/add_receive_log',data).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success(res.data.data.msg);
                        this.getList();
                    }else{
                        this.$message.error(res.data.data.msg);
                    }
                })
    },
    handleGet() {
      window.open(baseUrl + "/normal/excel/person");
    },
    upload_success(res) {
      // console.log(res);
      if (res.code == 200) {
        this.$message.success("上传成功");
        this.getList();
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.title {
  padding: 0px 0px 0px 10px;
  font-size: 22px;
  font-weight: 700;
}
.el-tabs {
  margin-left: 10px;
  margin-top: 15px;
}
.box {
  border: 1px solid #ccc;

  padding: 10px;
  width: 99%;
  margin-left: 10px;
  font-size: 14px;
  .el-row {
    line-height: 27px;
    height: 27px;
  }
}
.btn {
  display: inline-block;
}
.el-dialog{
  width:70%;
}
</style>