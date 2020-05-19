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

        <div class="demo-input-suffix rowLine">
          <span>账号:</span>
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </div>
        <br><br>
        <div class="demo-input-suffix rowLine">
          密码:
          <el-input v-model="pwd" placeholder="请输入用户密码"></el-input>
        </div>
        <br><br>
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
      username:'',
      pwd:''
    };
  },
  watch: {},
  methods: {
      login(){
          alert("登录成功")
          this.$router.push('/index')
      }
  }
};
</script>
<style scoped>
.rowLine {
  display: inline-flex;
  flex-direction: row;
  justify-items: right;
}
.rowLine span{
    direction: ltr;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 280px;
}
.main {
  display: flex;
  direction: ltr;
  justify-content: center;
  justify-items: center;
  padding-top: 10%;
}
</style>