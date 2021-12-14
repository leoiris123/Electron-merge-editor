<template>
  <el-dialog
    width="80%"
    title="选择对话"
    :visible.sync="innerchooseDialogVisible"
    append-to-body
  >
    <el-row
      v-if="received.type !== 'add_group' && received.type !== 'add_next'"
    >
      <el-col :span="5">
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
      <el-col :span="19">
        <el-checkbox-group v-model="checkList">
          <el-row v-for="(message, index) in messageList" :key="index">
            <el-checkbox :label="message.id">{{ message.zh }}</el-checkbox>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-row type="flex-end" style="margin-bottom: 10px">
        <el-button @click="innerchooseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(received)"
          >确定</el-button
        >
        <el-select
          style="width: 155px; margin-left: 10px"
          v-if="
            (checkList.length > 0 && received.type == 'add_choice') ||
            received.type == 'add_next'
          "
          v-model="nextState"
          filterable
          allow-create
          placeholder="请选择nextState"
        >
          <el-option
            v-for="(item, index) in 10"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>

        <!-- 添加分组 -->
        <el-select
          style="width: 165px; margin-left: 10px"
          v-if="received.type == 'add_group'"
          v-model="addGroupNum"
          filterable
          allow-create
          placeholder="请选择GroupNum"
        >
          <el-option
            v-for="(item, index) in GroupNumList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
import event from "../../script/tool/event";
// import throttle from "../../script/tool/tool";
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
      addGroupNum: null,
      value: "",
      addNormalHelper: 0,
      GroupNumList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    };
  },

  mounted() {
    event.$on("innerchooseDialog", (received) => {
      console.log("received:", received);
      if (!received) return;

      this.innerchooseDialogVisible = true;
      this.received = received;
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
    changeType(str) {
      return parseInt(str);
    },

    handleConfirm(received) {
      let checkList = this.checkList;

      if (
        this.checkList.length < 1 &&
        received.type !== "add_next" &&
        received.type !== "add_group"
      ) {
        this.$message.error("请选择,err1");
        return;
      }
      if (received.type == "add_choice" || received.type == "add_next") {
        if (!this.nextState) {
          this.$message.error("请选择,err2");
          return;
        }
        received.nextState = this.nextState;
      }
      if (received.type == "add_group") {
        if (!this.addGroupNum) {
          this.$message.error("请选择,err3");
          return;
        }
        received.addGroupNum = this.addGroupNum;
      }
      received.helper = checkList;
      console.log("received=>:", received);
      this.$store.dispatch("section/UPDATA_SECTION", received);
      this.checkList = [];
      this.nextState = null;
      this.addGroupNum = null;
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
