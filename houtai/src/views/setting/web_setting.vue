<template>
    <basic-container>
        <avue-tabs :option="option"
                   v-model="form"
                   @submit="submit2"
                  ></avue-tabs>
<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <h3 class=title>网站基本信息设置</h3>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--        <avue-form ref="form" v-model="obj" :option="option" @reset-change="emptytChange" @submit="submit">-->

<!--        </avue-form>-->
<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <h3 class=title>短信接口配置</h3>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--        <avue-form ref="form2" v-model="obj2" :option="option2"  @submit="submit2">-->

<!--        </avue-form>-->
    </basic-container>
</template>

<script>
    import option from '@/const/setting/web_setting';
    import { baseUrl } from '@/config/env';
    export default {
        name: "web_setting",
        data() {
            return {
                option:option,
                form:{
                    sms_account:'',
                    sms_account_token:'',
                    sms_appId:'',
                    sms_active:'',
                    sms_templet:'',
                    tax_rate:'',
                    sms_allow:'',
                    max_amount_receipt:'',
                    max_amount_address:'',
                },
            }
        },
        computed: {
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.$postRequest(baseUrl+'/admin/system/setget').then(res=>{
                    if(res.data.code == '200'){
                        const data = res.data.data;
                        this.form.tax_rate = data.tax_rate;
                        this.form.sms_account = data.sms_account;
                        this.form.sms_account_token = data.sms_account_token;
                        this.form.sms_appId = data.sms_appId;
                        this.form.sms_active = data.sms_active;
                        this.form.sms_templet = data.sms_templet;
                        if(data.sms_allow == 1){
                            this.form.sms_allow = true
                        }else{
                            this.form.sms_allow = false
                        }

                        this.form.max_amount_receipt = data.max_amount_receipt;
                        this.form.max_amount_address = data.max_amount_address;
                    }else{
                        this.$message.error('数据获取失败');
                    }
                })
            },
            submit2(done){
                if(this.form.sms_allow == true){
                    this.form.sms_allow = 1
                }else{
                    this.form.sms_allow = 0
                }
                this.$postRequest(baseUrl+'/admin/system/setupd',this.form).then(res=>{
                    if(res.data.code == '200'){
                        if(this.form.sms_allow == 1){
                            this.form.sms_allow = true
                        }else{
                            this.form.sms_allow = false
                        }
                        this.$message.success('提交成功');
                    }else{
                        this.$message.error('提交失败');
                    }
                })
                done();
            }

        }
    }
</script>

<style scoped lang='scss'>
    .title{
        padding: 0px 0px 0px 10px;
        font-size: 22px;
        font-weight: 700;
    }
    .el-tabs{
        margin-left: 10px;
        margin-top: 15px;
    }
    .box{
        border:1px solid #ccc;

        padding: 10px;
        width: 99%;
        margin-left: 10px;
        font-size: 14px;
        .el-row{
            line-height: 27px;
            height:27px;
        }
    }

</style>