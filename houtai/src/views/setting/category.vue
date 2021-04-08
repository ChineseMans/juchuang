<template>
    <basic-container>
<!--        <v-button-group>-->
<!--            <v-button type="primary" icon="plus-square" @click="addTopNode" title="增加一个顶级节点"></v-button>-->
<!--            <v-button type="primary" icon="edit" :disabled="!selectNode" @click="modalVisible = true" title="编辑节点(改名)"></v-button>-->
<!--            <v-button type="primary" icon="plus" :disabled="!selectNode" @click='addNode' title="插入一个子节点"></v-button>-->
<!--            <v-button type="primary" icon="close" :disabled="!selectNode" @click='delNode' title="删除节点"></v-button>-->
<!--        </v-button-group>-->
<!--        <v-tree :data="list" show-line></v-tree>-->
        <avue-tree :option="option" :data="list"  v-model="form" @update="update" @save="save" @del="del">
<!--            <template slot-scope="scope" slot="menuBtn">-->
<!--                <el-dropdown-item @click="save(scope.node,scope.data)">增加</el-dropdown-item>-->
<!--            </template>-->
        </avue-tree>
    </basic-container>
</template>

<script>
    import {baseUrl} from "@/config/env";

    export default {
        name: "category",
        data(){
            return{

                list:[],
                form:{},
                option:{
                    nodeKey:'cid',
                    size:'small',
                    formOption:{
                        labelWidth:100,
                        column:[{
                            label:'排序',
                            prop:'ord'
                        }],
                    },
                    props:{
                        labelText:'分类名称',
                        label:'ctitle',
                        value:'cid',
                        children:'children'
                    }
                }


            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.$getRequest(baseUrl+'/admin/task_class/lists').then(res=>{
                    if(res.data.code == '200'){
                        this.list = res.data.data
                    }else{
                        this.$message.success('数据拉去失败，请重新尝试');
                    }
                })
            },
            del(data,node,done){

                var del = {}
                if('data' in node){
                    del.cid = node.data.cid
                }else{
                    del.cid = 0
                }
                this.$postRequest(baseUrl+'/admin/task_class/del',del).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success(res.data.data.msg);
                    }else{
                        this.$message.error(res.data.data.msg);
                    }
                })
                done();
            },
            update(data,node,done){
                this.$message.success('更新回调')
                done();
            },
            save(data,node,done){
                var add = {}
                if('data' in node){
                    add.pid = node.data.cid
                }else{
                    add.pid = 0
                }
                add.ctitle = this.form.ctitle
                add.ord = this.form.ord
                this.$postRequest(baseUrl+'/admin/task_class/add',add).then(res=>{
                    if(res.data.code == '200'){
                        this.$message.success('添加成功');
                    }else{
                        this.$message.error('添加失败');
                    }
                })
                done();



            }
            // nodeClick(data){
            //     this.$message.success(JSON.stringify(data))
            // }


        }

    }
</script>

<style scoped>

</style>