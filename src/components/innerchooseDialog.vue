<template>
  <el-dialog
    width="50%"
    title="选择对话"
    :visible.sync="innerchooseDialogVisible"
    append-to-body
  >
    <el-row>
      <el-col :span="8">
        <el-select
          @change="handleNamechange"
          v-model="property"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dialogNameList"
            :key="item.property"
            :label="item.property"
            :value="item.property"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-checkbox-group v-model="checkList">
          <el-row v-for="(message, index) in messageList" :key="index">
            <el-checkbox :label="message.id">{{ message.txt }}</el-checkbox>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <button @click="handleClick">handleClick</button>
      <el-button @click="innerchooseDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('modify_normal')"
        >修改</el-button
      >
      <el-button type="primary" @click="handleConfirm('add_normal')"
        >新增</el-button
      >
      <el-button type="primary" @click="handleConfirm('delete_normal')"
        >删除</el-button
      >
      <el-button type="danger" @click="handleConfirm('add_branch')"
        >新增分支</el-button
      >
      <el-select
        v-if="addBranch"
        v-model="nextState"
        multiple
        placeholder="请选择nextState"
      >
        <el-option v-for="item in 10" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </span>
  </el-dialog>
</template>

<script>
import event from "../../script/tool/event";
export default {
  name: "EasyInnerchoosedialog",

  components: {},

  directives: {},

  data() {
    return {
      innerchooseDialogVisible: false,
      received: {},
      property: "", //所选择的类别名
      checkList: [], //右侧选中
      addBranch: false,
      nextState: null,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },

  mounted() {
    event.$on("innerchooseDialog", (received) => {
      this.innerchooseDialogVisible = true;
      this.received = received;
      this.addBranch = false;
      this.nextState = null;
      console.log(received, "received--");
    });
  },
  computed: {
    dialogListGet: {
      get() {
        let dialogListGet = this.$store.getters["section/dialogListGet"];
        return dialogListGet;
      },
    },
    dialogNameList() {
      let dialogListGet = this.dialogListGet;
      let dialogNameList = [];
      Object.keys(dialogListGet).map((item) => {
        dialogNameList.push({
          property: item,
          //  txt:dialogListGet[item].txt
        });
      });
      return dialogNameList;
    },
    messageList() {
      let dialogListGet = this.dialogListGet;
      let property = this.property;
      return dialogListGet[property];
    },
  },

  methods: {
    handleConfirm(type) {
      let checkList = this.checkList;
      if (this.checkList.length < 1) {
        // this.innerchooseDialogVisible = false;
        console.warn("选择失败");
        return;
      }

      if (type == "add_branch") {
        if (!this.addBranch) {
          this.addBranch = true;
          return;
        }

        let msgbranch = {};
        Object.assign(
          msgbranch,
          {
            type: type,
            messageId: checkList[0], //后续增加多选功能
            choice: [
              {
                messageId: checkList[0],
                nextState: this.nextState[0],
              },
              {
                messageId: checkList[1],
                nextState: this.nextState[1],
              },
            ],
          },
          this.received
        );
        console.log(msgbranch, "msgbranch");
        this.$store.dispatch("section/UPDATA_SECTION_LIST", msgbranch);
        this.$notify({
          title: "成功",
          message: "成功",
          type: "success",
          duration: 1100,
        });
        return;
      }

      let msg = {};
      Object.assign(
        msg,
        {
          type: type,
          messageId: checkList[0], //后续增加多选功能
        },
        this.received
      );
      this.$notify({
        title: "成功",
        message: "成功",
        type: "success",
        duration: 1100,
      });
      this.$store.dispatch("section/UPDATA_SECTION_LIST", msg);
    },
    handleNamechange() {
      this.checkList = [];
    },
    handleClick() {
      console.log(this.dialogListGet, "dialogListGet--");
      console.log(this.dialogNameList, "dialogNameList--");
      console.log(this.messageList, "messageList--");
      console.log(this.checkList, "checkList--");
      console.log(this.received, "received--");
      console.log(this.nextState, "nextState--");
    },
  },
};
</script>

<style lang="scss" scoped></style>
