<template>
  <div>
    <div class="main">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>注册页面</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <router-link to="login">返回登录</router-link>
          </el-button>
        </div>

        <div class="demo-input-suffix ">
          <span>账号:</span>
          <el-input v-model="username" placeholder="请输入新用户名" clearable></el-input>
        </div>
        <br><br>
        <div class="demo-input-suffix ">
          密码:
          <el-input v-model="pwd" placeholder="请输入新用户密码" clearable></el-input>
        </div>
        <br><br>
        <el-button type="primary" round id="registerBtn" @click="register">注册</el-button>
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
      register(){
          alert("注册成功");
          this.$router.push('/login')
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