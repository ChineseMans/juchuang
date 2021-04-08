<template>
    <basic-container>
        <avue-ueditor v-model="text" class='law'></avue-ueditor>
        <el-button type="primary" class=btn>提交</el-button>

    </basic-container>
</template>

<script>
    export default {
        name: "law",
        data() {
            return {
               text:''
            };
        }

    }
</script>
<!--input/select/radio/checkbox/textarea/cascader/date/time/datetime/daterange/timerange/datetimerange/week/month/year/dates/ueditor/password/switch/tree	input-->
<style scoped lang="scss">
    .btn{
        margin: auto;
    }
    .law{
        width:70%
    }
</style>