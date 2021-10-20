<template>
  <div class="dialog-view">
    <el-container style="height:100%;weight100%">
      <el-header height="6%">
        <el-button @click="saveAllDialog" type="primary" plain
          >保存全部</el-button
        >
      </el-header>
      <el-container>
        <el-aside style="width: auto" max-width="20%">
          <asidedialog-list></asidedialog-list>
        </el-aside>
        <el-main>
          <dialog-edit></dialog-edit>
        </el-main>
      </el-container>
    </el-container>
    <back-btn> </back-btn>
  </div>
</template>

<script>
import event from "../../../script/tool/event";
import BackBtn from "@/components/BackBtn.vue";
import AsidedialogList from "@/components/AsideDialogList.vue";
import DialogEdit from "@/components/DialogEdit.vue";
export default {
  name: "DialogView",

  components: { BackBtn, AsidedialogList, DialogEdit },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    saveAllDialog() {
      event.$emit("saveAllDialog", this.selectName);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-view {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #8195b9;
  color: #333;
  text-align: center;
  line-height: 6vh;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}

// body > .el-container {
//   // margin-bottom: 40px;
// }
</style>
