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
        name: "add",
        data(){
            return{
                obj:{},
                option:option
            }
        },
        created(){
            this.obj.tel = this.$route.query.tel;
            this.obj.uid = this.$route.query.uid
        },
        methods:{
            submit(from,done){
                this.$postRequest(baseUrl+'/admin/receipt/add',from).then(res=>{
                    const data = res.data.data;
                    if(res.data.code == '200'){
                        this.$message.success('添加成功');
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