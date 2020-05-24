<template>
  <div>
    <div class="main">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>登录页面</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <router-link to="register">前往注册</router-link>
          </el-button>
        </div>

        <div class="demo-input">
          账号:
          <el-input v-model="account" placeholder="请输入用户名" clearable></el-input>
        </div>
        <br />
        <br />
        <div class="demo-input-suffix">
          密码:
          <el-input v-model="pwd" placeholder="请输入用户密码" clearable show-password @keyup.enter="login"></el-input>
        </div>

        <br />
        <br />
        <el-button type="primary" round id="loginBtn" @click="login">登录</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {MD5} from '../utils/Utils.js'
export default {
  props: {},
  data() {
    return {
      appKey: "45c6af3c98409b18a84451215d0bdd6e",
      account: "",
      pwd: "",
      nim: null,

      dialogProfileVisible: false,
      formProfileWidth: "120px",
      profile: {
        name: "simple",
        nickname: "抓泥鳅的阿牛哥",
        sign: "就是这么有个性的个性签名",
        url:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      }
    };
  },
  watch: {},
  methods: {
    showInit(){
    },
     onConnect() {
      console.log("连接成功");
    },
    onWillReconnect(obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log("即将重连");
      console.log(obj.retryCount);
      console.log(obj.duration);
    },
    onDisconnect(error) {
      // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log("丢失连接");
      console.log(error);
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            break;
          // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break;
          // 被踢, 请提示错误后跳转到登录页面
          case "kicked":
            break;
          default:
            break;
        }
      }
    },
    onError(error) {
      console.log(error);
    },
    login() {
      // console.log(this.$store.state.NIM.getInstance())
      console.log(this.appKey+"==>"+this.account+"==>"+MD5(this.pwd))
      this.nim=this.$store.state.NIM.getInstance({
        appKey: this.appKey,
        account: this.account,
        token: MD5(this.pwd),
        db: false, //若不要开启数据库请设置false。SDK默认为true。
        // privateConf: {}, // 私有化部署方案所需的配置
        onconnect:function(obj){
          console.log("SDK连接成功")
        },
        onwillreconnect: function(obj){
          console.log("SDK即将重新连接")
        },
        ondisconnect:(obj)=>{
          console.log("SDK快要断开连接"+this.$store.state.nim)

          this.$store.commit('removeNim')
          console.log("SDK断开连接"+this.$store.state.nim)
        },
        onerror: function(obj){
          console.log("SDK连接错误")
        },
      });
      this.$store.commit('setNim',this.nim);
      console.log(this.$store.state.nim)
      // 登录成功消息提示
      //  this.$message({
      //     showClose: true,
      //     message: '恭喜你，这是一条成功消息',
      //     type: 'success'
      //   });
      this.$router.push("/index");
    },
   
  },
   mounted(){
     var that = this
     this.showInit()
    // console.log("===>"+this.$store.state.NIM.getInstance({}))
  },
};
</script>
<style scoped>
.el-input {
  width: 80%;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
/* .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
} */

.box-card {
  width: 280px;
}
.main {
  display: flex;
  justify-content: center;
  justify-items: left;
  padding-top: 10%;
}
</style>