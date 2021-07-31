<template>
  <div class="home">
     <el-button plain icon="el-icon-chat-line-round" @click="goMainView">进入主界面</el-button>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
    
  },
  methods: {
    goMainView(){
      console.log("==>进入主界面")
      this.$router.push({path:"./MainView"})
    }
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  position: absolute;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.top-list {
  background-color: #f1bcd7;
}
</style>
