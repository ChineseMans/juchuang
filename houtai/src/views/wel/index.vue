<template>
    <div>
        <!-- <div class="wel__header">
          <div class="wel__info">
            <img :src="userInfo.avatar"
                 alt=""
                 class="wel__info-img">
            <div class="wel__info-content">
              <div class="wel__info-title">
                {{$t('wel.info')}}
              </div>
              <div class="wel__info-subtitle">
                {{$t('wel.dept')}}
              </div>
            </div>
          </div>
          <div class="wel__extra">
            <div class="wel__extra-item">
              <p class="wel__extra-title">
                {{ $t('wel.count')}}
              </p>
              <p class="wel__extra-subtitle">
                56
              </p>
            </div>
            <div class="wel__extra-item">
              <p class="wel__extra-title">
                {{ $t('wel.team')}}
              </p>
              <p class="wel__extra-subtitle">
                8 <span>/ 24</span>
              </p>
            </div>
            <div class="wel__extra-item">
              <p class="wel__extra-title">

                {{ $t('wel.project')}}
              </p>
              <p class="wel__extra-subtitle">
                2,223
              </p>
            </div>
          </div>
        </div> -->
        <basic-container>
            <avue-data-box  :option="option1"></avue-data-box >
        </basic-container>

        <!-- <el-row :span="24">
          <el-col :span="18">
            <basic-container>
              <avue-data-progress :option="option3"
                                  style="margin-bottom:35px"></avue-data-progress>
              <avue-data-tabs :option="option"></avue-data-tabs>
            </basic-container>
          </el-col>
          <el-col :span="6">
            <basic-container>
              <avue-data-icons :option="option2"></avue-data-icons>
            </basic-container>
          </el-col>
        </el-row> -->
        <basic-container>
            <avue-crud :option="option4"
                       :data="data"
                       @refresh-change = "refresh"
            >
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { baseUrl } from '@/config/env';
    export default {
        name: "wel",
        data () {
            return {
                data: [],
                option1data:[],
                page:{
                    currentPage : 1,
                    pageSize : 15,
                }
            };
        },
        computed: {
            ...mapGetters(["userInfo"]),
            option1 () {
                return {
                    span: 3,
                    data: this.option1data
                };
            },

            option4(){

                return {
                    // title: '任务列表',
                    addBtn: false,
                    editBtn: false,
                    dateDefault: false,
                    searchShow: false,
                    menu: false, //是否显示操作菜单栏
                    // addBtn: true, //是否显示新增按钮
                    // editBtn: true, //是否显示编辑按钮
                    viewBtn: false,
                    delBtn: false,
                    align: 'center',
                    menuAlign: 'center',

                    column: [
                        {
                            label: "id",
                            prop: "tid",
                            hide: true,
                        },
                        {
                            label: "任务编号",
                            prop: "identifier",
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
                            label: '任务描述',
                            prop: 'caption',
                            type: "textarea",

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
                            label: "任务时间段",
                            prop:'starttime',
                            // search: true
                        },
                        {
                            label: '支付总额(元)',
                            prop: 'real_price',
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
                                    label: "<font color='#1e90ff'>待确认</font>",
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
                                    label: "<font color='orange'>任务结束</font>",
                                    value: 7
                                },
                                {
                                    label: "<font color='red'>任务结束</font>",
                                    value: 8
                                },
                                {
                                    label: "<font color='orange'>已完成</font>",
                                    value: 9
                                },



                            ],
                        }
                    ]

                }

            }
        },
        created () {
            this.getList();
            this.getCount();
        },
        methods: {
            refresh(){
                this.getList();
            },
            getList(){
                this.$getRequest(baseUrl+'/admin/task/lists',this.page).then(res=>{
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
            getCount(){
                this.$getRequest(baseUrl+'/admin/data/collect').then(res=>{
                    if(res.data.code == '200'){
                        const data = res.data.data
                        var total_task = 0,total_price = 0;
                        for(var i in data.task.price){
                            if(i == 7 || i == 8 || i == 9){
                                total_price = total_price + parseInt(data.task.price[i].real_price)/100
                            }
                        }
                        for(var j in data.task.status){
                             if(j != 0){
                                total_task = total_task+data.task.status[j]
                             }
                        }
                        //总任务
                        this.option1data.push({title:'总任务',count:total_task, icon: 'el-icon-tickets',color: 'rgb(49, 180, 141)',
                            href: "/#/task/index",
                            target: "_blank"})
                        if(data.task.status[1]){
                            this.option1data.push({title:'待审核任务',count:data.task.status[1], icon: 'el-icon-warning',color: 'rgb(56, 161, 242)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }else{
                            this.option1data.push({title:'待审核任务',count:0, icon: 'el-icon-warning',color: 'rgb(56, 161, 242)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }
                        if(data.task.status[2]){
                            this.option1data.push({title:'已审核任务',count:data.task.status[2], icon: 'el-icon-check',color: 'rgba(242, 113, 7, 1)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }else{
                            this.option1data.push({title:'已审核任务',count:0, icon: 'el-icon-warning',color: 'rgba(242, 113, 7, 1)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }
                        if(data.task.status[6]){
                            this.option1data.push({title:'进行中任务',count:data.task.status[6], icon: 'el-icon-s-promotion',color: 'rgb(117, 56, 199)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }else{
                            this.option1data.push({title:'进行中任务',count:0, icon: 'el-icon-s-promotion',color: 'rgb(117, 56, 199)',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }
                        if(data.task.status[8]){
                            this.option1data.push({title:'已确认任务',count:data.task.status[8], icon: 'el-icon-document-checked',color: '#67C23A',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }else{
                            this.option1data.push({title:'已确认任务',count:0, icon: 'el-icon-document-checked',color: '#67C23A',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }
                        if(data.task.status[9]){
                            this.option1data.push({title:'已结算任务',count:data.task.status[9], icon: 'el-icon-eleme',color: '#909399',
                                href: "/#/task/index",
                                target: "_blank"

                            })
                        }else{
                            this.option1data.push({title:'已结算任务',count:0, icon: 'el-icon-document-checked',color: '#909399',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }
                        if(data.task.status[2]){
                            this.option1data.push({title:'待付款金额',count:data.task.price[2].real_price/100, icon: 'el-icon-coin',color: '#F56C6C',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }else{
                            this.option1data.push({title:'待付款金额',count:0, icon: 'el-icon-coin',color: '#F56C6C',
                                href: "/#/task/index",
                                target: "_blank"
                            })
                        }

                        this.option1data.push({title:'已付款金额',count:total_price, icon: 'el-icon-wallet',color: '#E6A23C',
                            href: "/#/task/index",
                            target: "_blank"
                        })



                        console.log()
                    }
                })
            }
        }
    };
</script>

<style scoped="scoped" lang="scss">
    .wel {
        &__header {
            padding: 25px 40px;
            border-bottom: 1px solid #e8e8e8;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__info {
            display: flex;
            align-items: center;
            &-img {
                border-radius: 72px;
                display: block;
                width: 72px;
                height: 72px;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            &-content {
                position: relative;
                margin-left: 24px;
                color: rgba(0, 0, 0, 0.45);
                line-height: 22px;
            }
            &-title {
                font-size: 20px;
                line-height: 28px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
                margin-bottom: 12px;
            }
            &-subtitle {
                position: relative;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                line-height: 22px;
            }
        }
        &__extra {
            &-item {
                position: relative;
                padding: 0 32px;
                display: inline-block;
                &:last-child {
                    &::after {
                        display: none;
                    }
                }
                &:after {
                    background-color: #e8e8e8;
                    position: absolute;
                    top: 30px;
                    right: 0;
                    width: 1px;
                    height: 40px;
                    content: "";
                }
            }
            &-title {
                color: rgba(0, 0, 0, 0.45);
                font-size: 14px;
                line-height: 22px;
                margin-bottom: 4px;
            }
            &-subtitle {
                color: rgba(0, 0, 0, 0.85);
                font-size: 30px;
                line-height: 38px;
                margin: 0;
                span {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 20px;
                }
            }
        }
    }
</style>
