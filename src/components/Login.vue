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
          <el-input
            v-model="pwd"
            placeholder="请输入用户密码"
            clearable
            show-password
            @keyup.enter="login"
          ></el-input>
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
import { MD5 } from "../utils/Utils.js";
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
    onConnect() {
       // console.log(this.$store.state.nim.account);
      console.log("Special way to show SDK connect!!!");
    },
    onDisconnect() {
      this.$store.commit("removeNim");
      console.log("SDK断开连接" + this.$store.state.nim);
    },
    onFriends(friends){
      console.log('收到好友列表', friends);
    },
    login() {
      // console.log(this.$store.state.NIM.getInstance())
      console.log(this.appKey + "==>" + this.account + "==>" + MD5(this.pwd));
      this.nim = this.$store.state.NIM.getInstance({
        appKey: this.appKey,
        account: this.account,
        token: MD5(this.pwd),
        db: false, //若不要开启数据库请设置false。SDK默认为true。
        // privateConf: {}, // 私有化部署方案所需的配置
        onconnect: this.onConnect(),
        onwillreconnect: function(obj) {
          console.log("SDK即将重新连接");
        },
        ondisconnect: obj => {
          // console.log(this.$store.state.nim.account);
          this.$store.state.nim.onFriends()
          this.$store.commit("removeNim");
          console.log("SDK断开连接" + this.$store.state.nim);
        },
        onFriends:this.onFriends(),
        onerror: function(obj) {
          console.log("SDK连接错误");
        }
      });
      this.$store.commit("setNim", this.nim);
      console.log(this.$store.state.nim);
      console.log("===>");
      console.log(this.$store.state.data);
      this.$router.push("/index");
    }
  },
  mounted() {}
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