<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="icon-mima"></i>
      </el-input>
    </el-form-item>
<!--    <el-form-item prop="code">-->
<!--      <el-row :span="24">-->
<!--        <el-col :span="16">-->
<!--          <el-input size="small"-->
<!--                    @keyup.enter.native="handleLogin"-->
<!--                    :maxlength="code.len"-->
<!--                    v-model="loginForm.captcha"-->
<!--                    auto-complete="off"-->
<!--                    :placeholder="$t('login.code')">-->
<!--            <i slot="prefix"-->
<!--               class="icon-yanzhengma"></i>-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="login-code">-->

<!--            <img :src="code.src"-->
<!--                 class="login-code-img"-->
<!--                 @click="refreshCode"-->
<!--                 />-->
<!--            &lt;!&ndash; <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> &ndash;&gt;-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->

<!--    </el-form-item>-->

    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { baseUrl } from '@/config/env';
export default {
  name: "userlogin",
  data() {
    // const validateCode = (rule, value, callback) => {
    //   if (this.code.value != value) {
    //     this.loginForm.code = "";
    //     this.refreshCode();
    //     callback(new Error("请输入正确的验证码"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      loginForm: {
        username: "",
        password: "",
        // captcha: "",
      },
      checked: false,
      code: {
        src: baseUrl+'/captcha',
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        // captcha: [
        //   { required: true, message: "请输入验证码", trigger: "blur" },
        //   { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
        //   { required: true, trigger: "blur" }
        // ]
      },
      passwordType: "password"
    };
  },
  created() {

  },
  mounted() {

  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    // refreshCode() {
    //   this.code.src = baseUrl+'/captcha?'+Math.random()
    // },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {

            this.$router.push({ path: this.tagWel.value });
          });
        }
      });
      //   var that = this
      //   this.$postRequest(baseUrl+'/login',this.loginForm).then(function(res){
      //         if(res.data.code == '200'){
      //           console.log(1);
      //           that.$router.push({ path: '/wel/index' });
      //         }else{
      //           that.$message.error(res.data.data.msg);
      //         }
      //   })

    }
  }
};
</script>

<style>
</style>
