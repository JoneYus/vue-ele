<template>
  <div>
    <el-container>
      <el-aside width="224px">
        <div id="avator">
          <!-- 用户头像,信息 -->
          <el-row class="demo-avatar demo-basic">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
              </div>
              <div class="sub-title" @click="logout">退出</div>
            </el-col>
            <el-col :span="12">
              <div @click="editProfile">
                <i class="el-icon-edit"></i>
                修改信息
              </div>
              <div id="selfName">circle</div>
            </el-col>
          </el-row>
        </div>
        <!-- 历史消息,好友列表 -->
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-message-solid"></i>历史记录
            </span>
            <div class="listDetail">
              <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="i in 10" :key="i" class="infinite-list-item">{{ i }}</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-user"></i>好友列表
            </span>
            <div class="listDetail">
              <ul>
                <li>
                  <i class="el-icon-user-solid"></i> are daling
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    msg: String
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      count: 0
    };
  },
  methods: {
    editProfile() {
      alert("修改用户信息");
    },
    load() {
      this.count += 2;
    },
    logout(){
      alert('退出登录成功')
      this.$router.push('login')
    }
  }
};
</script>

<style scoped>
.listDetail {
  height: 670px;
  /* overflow: scroll; */
}
#selfName {
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
}
#avator {
  height: 100px;
  width: 224px;
  background: lightcyan;
  padding-top: 20px;
}
li {
  list-style: none;
  margin: 5px 0;
}
* {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* 左边框 */
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  /* height: auto; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 600px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
