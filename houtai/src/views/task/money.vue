<template>
    <div class="user-info">
        <el-row :span="24">

            <el-col :span="24">
                <basic-container>
                    <avue-tabs :option="option"
                               ref="form"
                               
                               @submit="handleSubmit"></avue-tabs>
                </basic-container>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import option from "@/const/setting/money";
    import { baseUrl } from '@/config/env';
    export default {
        data () {
            return {
                type: "account",
                option: option,
            };
        },
        created () {
        this.getList();
        },
        methods: {
            getList(){
                this.$postRequest(baseUrl+'/admin/system/getmoney').then(res=>{
                    if(res.data.code == '200'){
						console.log(this);
                        var data = res.data.data;
                        this.form.section1 = data.section1;
                        this.form.section2 = data.section2;
                        this.form.rate1 = data.rate1;
                        this.form.rate2 = data.rate2;
                        
                    }else{
                        this.$message.error('数据获取失败');
                    }
                })
            },
            handleSubmit(done){
                
                this.$postRequest(baseUrl+'/admin/system/setmoney',this.form).then(res=>{
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
    };
</script>

<style lang="scss">
    .user-info {
        .avue-tabs {
            padding: 0 10px;
        }
        .el-tabs__content {
            padding: 20px 0;
        }
        &__img {
            display: block;
            margin: 0 auto;
            border-radius: 100%;
            width: 100px;
            height: 100px;
        }
        &__name {
            text-align: center;
            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 0;
            margin-top: 10px;
        }
        &__setting {
            margin-bottom: 12px;
            display: block;
            font-size: 12px;
            color: #409eff;
            text-align: center;
        }
        &__desc {
            text-align: center;
            width: 200px;
            margin: 0 auto;
        }
        &__detail-desc {
            margin-top: 50px;
            font-size: 14px;
            p {
                margin-bottom: 10px;
            }
            span {
                margin-left: 10px;
            }
        }
        &__divider {
            border-top: 1px dashed #e8e8e8;
            display: block;
            height: 0;
            width: 100%;
            margin: 24px 0;
            clear: both;
        }
        &__tags {
            .el-tag {
                margin: 0 5px 5px 0;
            }
        }
    }
</style>
