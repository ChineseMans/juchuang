<template>
    <basic-container>
        <avue-form ref="form" v-model="obj" :option="option" @submit="submit">

        </avue-form>

    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";
    import option from "@/const/company/addinfo";
    export default {
        name: "edit",
        data(){

            return{
                obj:{},
                option:option
            }
        },
        created(){
            this.obj = this.$route.query.detail;
           
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.firm_name = this.$route.query.detail.firm_name;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
            // this.obj.tel = this.$route.query.detail.tel;
        },
        methods:{
            submit(from,done){
                this.$postRequest(baseUrl+'/admin/receipt/upd',from).then(res=>{
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