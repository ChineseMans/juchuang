<template>
    <basic-container>
        <avue-form ref="form" v-model="obj" :option="option" @submit="submit">

        </avue-form>

    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";
    // import { isMobile } from '@/util/validate'
    export default {
        name: "editaccount",
        data(){
            const isMobile = (rule, value, callback) => {
                // console.log(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value));
               if(!/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)){
                   callback(new Error('必须是11位手机号码'))
               }else{
                   callback();
               }
            };
            return{
                obj:{},
                option:{
                    searchShow:false,
                    column:[
                        {
                            label:'企业电话',
                            prop:'tel',
                            disabled:true,
                            row:true,
                            rules:[
                                { required: true, message: "11位手机号码", trigger: "blur" },
                                 { min:11, max:11,message: "手机号长度为11位", trigger: "blur" },
                                { validator: isMobile, trigger: 'blur' }
                            ]
                        },
                        {
                            label:'登录密码',
                            prop:'pwd',
                            type: 'password',
                            row:true,
                            rules:[

                                    { required: true, message: "请输入密码", trigger: "blur" },
                                    { min: 6, message: "密码长度最少为6位", trigger: "blur" }

                            ]

                        },
                        {
                            label:'费率设置',
                            prop:'rate',
                            type: 'number',
                            precision:1,
                            row:true,
                            // value:0,
                            rules:[
                                { required: true, message: "请输入费率", trigger: "blur" },
                                // { min: 6, message: "密码长度最少为6位", trigger: "blur" }

                            ]

                        },
                        {
                            label: "状态",
                            prop: "status",
                            type: "radio",
                            dicData: [
                                {label:'正常',value:1},
                                {label:'禁用',value:0}
                                ],
                            valueDefault:1
                        }
                    ]
                }
            }
        },
        created(){
            this.obj.tel = this.$route.query.tel;
            this.obj.pwd =  this.$route.query.pwd;
            this.obj.rate =  this.$route.query.rate;
            this.obj.status = this.$route.query.status
        },
        methods:{
            submit(from,done){
                this.$postRequest(baseUrl+'/admin/company/upd',from).then(res=>{
                    const data = res.data.data;
                    if(res.data.code == '200'){
                        this.$message.success('修改成功');
                        this.$router.push({
                            path:'/company/index'
                        })
                    }else{
                        this.$message.error(data.msg)

                    }
                    setTimeout(()=>{
                        done()
                    },2000)
                })
            }



        }
    }
</script>

<style scoped>

</style>