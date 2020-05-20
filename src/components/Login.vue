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

        <div class="demo-input ">
          账号:
          <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
        </div>
        <br><br>
        <div class="demo-input-suffix">
          密码:
          <el-input v-model="pwd" placeholder="请输入用户密码" clearable  show-password></el-input>
        </div>

        <br />
        <br />
        <el-button type="primary" round id="loginBtn" @click="login">登录</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      username: "",
      pwd: "",

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
    login() {
      alert("登录成功");
      this.$router.push("/index");
    }
  }
};
</script>
<style scoped>
.el-input{
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