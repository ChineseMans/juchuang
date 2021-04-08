<template>
    <basic-container>
        <avue-form ref="form" v-model="obj" :option="option" :upload-error="uploadError" :upload-before="uploadBefore" :upload-delete="uploadDelete" :upload-after="uploadAfter" @submit="submit">

        </avue-form>

    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";
    import option from "@/const/company/staffinfo";
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
            uploadDelete(column,file) {
              //console.log(column,file)
              return this.$confirm(`这里是自定义的，是否确定移除该选项？`);
            },
            uploadBefore(file, done, loading,column) {
              //console.log(file,column)
              //如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
              // var newFile = new File([file], '1234', { type: file.type });
              // done(newFile)
			  done()
              //this.$message.success('上传前的方法')
            },
            uploadError(error, column) {
              this.$message.success('上传失败')
              console.log(error, column)
            },
            uploadAfter(res, done, loading,column) {
              //console.log(res,column);
              //console.log(this.obj);
              this.$message.success('上传成功');
              loading();
              return this.obj[column.prop] = "http://admin.juchuang.voil.vip:999"+res.data.path;
              
              //console.log(this.obj.url1);
              done()
              
            },

            submit(from,done){
                this.$postRequest(baseUrl+'/admin/contractor/add',from).then(res=>{
                    const data = res.data.data;
                    if(res.data.code == '200'){
                        this.$message.success('添加成功');
                        this.$router.push({
                            path:'/contractor/index'
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