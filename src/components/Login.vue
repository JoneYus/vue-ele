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
import nimConfig from '../config/nim-config.js'
export default {
  props: {},
  data() {
    return {
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
      },
      data: {},
    };
  },
  watch: {},
  methods: {
    onConnect() {
      this.$store.commit("setNim", this.nim);
      this.$cookies.set('isLogin',false)
      console.log("Special way to show SDK connect!!!");
      console.log(this.$cookies.get('isLogin'))
      console.log(nimConfig.appKey)
    },
    onDisconnect() {
      this.$store.commit("removeNim");
      console.log("SDK断开连接" + this.$store.state.nim);
    },

    onSyncFriendAction(obj) {
      console.log(obj);
      switch (obj.type) {
        case "addFriend":
          console.log(
            "你在其它端直接加了一个好友" + obj.account + ", 附言" + obj.ps
          );
          onAddFriend(obj.friend);
          break;
        case "applyFriend":
          console.log(
            "你在其它端申请加了一个好友" + obj.account + ", 附言" + obj.ps
          );
          break;
        case "passFriendApply":
          console.log(
            "你在其它端通过了一个好友申请" + obj.account + ", 附言" + obj.ps
          );
          onAddFriend(obj.friend);
          break;
        case "rejectFriendApply":
          console.log(
            "你在其它端拒绝了一个好友申请" + obj.account + ", 附言" + obj.ps
          );
          break;
        case "deleteFriend":
          console.log("你在其它端删了一个好友" + obj.account);
          onDeleteFriend(obj.account);
          break;
        case "updateFriend":
          console.log("你在其它端更新了一个好友", obj.friend);
          onUpdateFriend(obj.friend);
          break;
      }
    },
    login() {
      console.log(nimConfig.appKey + "==>" + this.account + "==>" + MD5(this.pwd));
      this.nim = this.$store.state.NIM.getInstance({
        appKey: nimConfig.appKey,
        account: this.account,
        token: MD5(this.pwd),
        db: false, //若不要开启数据库请设置false。SDK默认为true。
        // privateConf: {}, // 私有化部署方案所需的配置
        onconnect: this.onConnect(),
        // 好友关系
        onfriends: this.onFriends,
        onmyinfo: this.onMyInfo,
        onsyncfriendaction: this.onSyncFriendAction,
        onwillreconnect: function(obj) {
          console.log("SDK即将重新连接");
        },
        ondisconnect: obj => {
          //
          this.$store.commit("removeNim");
          console.log("SDK断开连接" + this.$store.state.nim);
        },
        onerror: function(obj) {
          console.log("SDK连接错误");
        },
        onMyInfo(user) {
          console.log("收到我的名片", user);
          this.$store.state.data.myInfo = user;
        }
      });
      this.$store.commit("setNim", this.nim);
      console.log(this.$store.state.nim);
      console.log("===>");
      console.log(this.$store.state.data);
      this.$router.push("/index");
    },
    onFriends(friends) {
      console.log("收到好友列表", friends);
      console.log(this.nim);
      this.$store.state.data.friends = this.nim.mergeFriends(
        this.data.friends,
        friends
      );
      console.log(this.$store.state.data.friends);
      this.data.friends = this.$store.state.nim.cutFriends(
        this.data.friends,
        friends.invalid
      );
    }
  },
  mounted() {
  },
  beforeDestroy() {
    console.log("Before destroy....")
    clearInterval(this.timer);
  }
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