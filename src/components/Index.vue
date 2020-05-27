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
                  <el-avatar shape="circle" :size="50" fit="fill" :src="profile.avatar"></el-avatar>
                </div>
              </div>
              <div class="sub-title" @click="logout">退出</div>
            </el-col>
            <el-col :span="12">
              <!-- 修改用户名,昵称,个性签名 -->
              <el-button type="text" @click="dialogProfileVisible = true">
                <i class="el-icon-edit"></i>修改信息
              </el-button>
              <el-dialog title="用户信息修改" :visible.sync="dialogProfileVisible">
                <!-- 文件上传 -->
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                >
                  <el-avatar shape="circle" :size="100" fit="fill" :src="profile.avatar"></el-avatar>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </div>
                </el-upload>
                <!-- 用户信息修改 -->
                <el-form :model="profile">
                  <el-form-item label="用户名称" :label-width="formProfileWidth">
                    <el-input v-model="profile.account" autocomplete="off" placeholder="nicai"></el-input>
                  </el-form-item>
                  <el-form-item label="用户昵称" :label-width="formProfileWidth">
                    <el-input v-model="profile.nick" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="个性签名" :label-width="formProfileWidth">
                    <el-input v-model="profile.sign" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogProfileVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogProfileVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <div id="selfName">{{profile.account}}</div>
            </el-col>
          </el-row>
        </div>
        <!-- 历史消息,好友列表 -->
        <el-tabs type="border-card">
          <!-- 历史消息 -->
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-message-solid"></i>历史记录
            </span>
            <div class="listDetail">
              <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li>
                  <div  class="friendList" v-for="friend in this.$store.state.data.friends" :key="friend.id" @click="openHistoryChat(friend.id)">
                    <div   class="friendAvator" :style="backgroundImg(friend.url)"></div>
                    <div class="friendName">{{friend.account}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <!-- 好友列表 -->
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-user"></i>好友列表
            </span>
            <div class="listDetail">
              <ul>
                <!-- 搜索添加好友 -->
                <li>
                  <!-- <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">搜索好友添加</el-button> -->
                  <div @click="dialogFormVisible = true" id="searchBtn">
                    <i class="el-icon-search"></i>搜索好友添加
                  </div>
                  <el-dialog title="搜索用户" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="用户昵称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="AddFriend(form)">确 定</el-button>
                    </div>
                  </el-dialog>
                </li>
                <li>
                  <div  class="friendList" v-for="friend in this.$store.state.data.friends" :key="friend.id" @click="openChat(friend.account)">
                    <div   class="friendAvator" :style="backgroundImg(friend.url)"></div>
                    <div class="friendName">{{friend.account}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header>{{this.$store.state.data.myInfo}}</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      count: 0,

      dialogProfileVisible: false,
      formProfileWidth: "120px",
      // profile: {
      //   account: "simple1",
      //   nick: "simple",
      //   sign: "就是这么有个性的个性签名",
      //   avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      // },
      profile:this.$store.state.data.myInfo,
      dialogFormVisible: false,
      form: {
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      timer:null,
      friendList:null
    };
  },
  methods: {
    AddFriend(account){
      this.$store.state.nim.addFriend({
        account: account,
        ps: 'ps',
        done: this.addFriendDone
      });
    },
    addFriendDone(error, obj) {
      console.log('直接加为好友' + (!error?'成功':'失败'), error, obj);
      if (!error) {
          this.onAddFriend(obj.friend);
      }
    },
    onAddFriend(friend) {
        this.$store.state.data.friends = this.$store.state.nim.mergeFriends(this.$store.state.data.friends, friend);
        // refreshFriendsUI();
    },
    openHistoryChat(index){
      alert("打开与"+index+"的历史聊天记录")
    },
    openChat(index){
      alert("打开聊天页面"+index)
    },
    backgroundImg(url) {
      url= url==null?this.circleUrl:url
      return "background-image:url(" + url + ");background-size: contain;";
    },
    editProfile() {
      alert("修改用户信息");
    },
    logout() {
      this.$cookies.remove('isLogin')
      this.$store.state.nim.disconnect();
      alert("退出登录成功");
      console.log(this.$store.state.nim);

      this.$router.push("login").catch(err => err);
    },
    load(){
      return this.count+=2
    },
    checkNim() {
      if (this.$store.state.nim == null) {
        this.$router.push("login");
      }
      console.log("checkNim is running ... ");
    },
    heartBeatTest(){
      console.log("setinterval"+this.load())
    },
    getUsersDone(error,users){
      console.log(error);
      console.log(users);
      console.log('获取用户资料数组' + (!error?'成功':'失败'));
    }
  },
  watch(){
    profile:this.$store.commit('getDate','myInfo')
    friendList:this.$store.commit('getDate','friends')
  },
  computed:{
    myPofile:function(){
      return  this.$store.state.data.myInfo
    }
  },
  beforeCreate() {
  },
  created() {
    this.friendList = this.$store.state.data.friends
  },
  mounted(){
    // this.timer=setInterval(this.heartBeatTest, 2000);
    console.log(this.$store.state.data)
    this.checkNim();
  },
  beforeDestroy(){
    // clearInterval(this.timer)
  }
};
</script>

<style scoped>
.friendName {
  position: absolute;
  font-size: 18px;
  margin: 20px 10px 20px 80px;
}
.friendAvator {
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 5px 0 5px 5px;
  background-color: papayawhip;
}
.friendList {
  height: 60px;
  width: auto;
  border-bottom: 1px solid #eaeeef;
  /* background-color: red; */
}
#searchBtn {
  width: 190px;
  height: 26px;
  border: 2px dashed #f00;
  border-radius: 5px;
  font-size: 18px;
  background-color: lightcyan;
  margin-top: -5px;
}
.listDetail {
  height: 670px;
  /* overflow: scroll; */
}
#selfName {
  text-align: center;
  margin-top: 15px;
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
