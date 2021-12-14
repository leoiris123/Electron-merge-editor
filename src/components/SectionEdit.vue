<template>
  <div class="sectionEdit">
    <el-table
      ref="edit"
      :row-class-name="tableRowClassName"
      highlight-current-row
      @current-change="handleCurrentChange"
      :border="true"
      @row-click="handleRowClick"
      @row-dblclick="handleDoubleClick"
      show-overflow-tooltip
      :header-cell-style="tableHeaderColor"
      :cell-class-name="cellClassName"
      :data="statesDataArrange"
      @row-contextmenu="menuShow"
      style="width: 100%"
    >
      <el-table-column prop="groupName" label="GROUP" width="75">
        <template slot-scope="scope">
          <div style="text-align: center">{{ scope.row.groupName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="messageId" label="MESSAGE_ID" min-width="730">
        <template slot-scope="scope">
          <div>
            {{
              dialogListArrange[scope.row.messageId]
                ? dialogListArrange[scope.row.messageId].zh
                : scope.row.messageId
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="CHOICE" max-width="550" min-width="350">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.choice" :key="index">
            <el-row :class="handleColumnClass(item.nextState)" type="flex">
              <p
                style="
                  margin: 3px;
                  line-height: 18px;
                  max-width: 70%;
                  text-overflow: ellipsis;
                "
              >
                text:
                {{
                  item && dialogListArrange[item.messageId]
                    ? dialogListArrange[item.messageId].zh
                    : "无"
                }}
              </p>
              <p
                style="margin: 3px; line-height: 18px; text-overflow: ellipsis"
              >
                nextTo: {{ item ? item.nextState : "无" }}
              </p>
            </el-row>
          </div>
          <div
            style="
              height: 48px;
              font-size: 18px;
              line-height: 48px;
              text-align: center;
            "
            :class="handleColumnClass(scope.row.next)"
            v-if="scope.row.next"
          >
            {{ scope.row.next ? "next:" + scope.row.next : "" }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <innerchoose-dialog></innerchoose-dialog>
    <menu-tip :options="options" :stateTip="stateTip"></menu-tip>
  </div>
</template>

<script>
import event from "../../script/tool/event";
import InnerchooseDialog from "./innerchooseDialog.vue";
import menuTip from "./menu.vue";
import { deepClone } from "../../script/tool/tool";
import { throttle } from "../../script/tool/tool";
export default {
  name: "SectionEdit",

  components: {
    InnerchooseDialog,
    menuTip,
  },

  directives: {},

  data() {
    return {
      sectionName: null,
      stateGroupName: "1",
      // statesData:{},
      activeIndex: 0,
      inputaddstate: "",
      inputadddialog: "",
      options: [
        {
          name: "新增",
          onClick: this.tipClick("add_normal"),
        },
        {
          name: "删除",
          onClick: this.tipClick("delete_normal"),
        },
        {
          name: "替换",
          onClick: this.tipClick("replace_normal"),
        },
        {
          name: "添加新分支",
          onClick: this.tipClick("add_choice"),
        },
        {
          name: "添加next",
          onClick: this.tipClick("add_next"),
        },
        {
          name: "添加分组",
          onClick: this.tipClick("add_group"),
        },
        {
          name: "删除分支",
          onClick: this.tipClick("delete_choice"),
        },
        {
          name: "删除next",
          onClick: this.tipClick("delete_next"),
        },
        {
          name: "删除分组",
          onClick: this.tipClick("delete_group"),
        },
      ],
      stateTip: {
        state: false,
        pos: {
          x: 0,
          y: 0,
        },
      },
      msg: null,
    };
  },
  beforeDestroy() {},
  mounted() {
    event.$on("selectNameChange", this.selectNameChange);
    event.$on("sectionChange2", (val) => {});
    document.querySelector(".sectionEdit").onmouseup = (e) => {
      // console.log("E", e);
      if (e.button == 2) {
        this.stateTip = {
          state: true,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
        };
      } else {
        //确保自定义tip的事件被触发
        setTimeout(() => {
          this.stateTip = {
            state: false,
            pos: {
              x: e.clientX,
              y: e.clientY,
            },
          };
        }, 0);
      }
    };
  },
  computed: {
    sectionListAll: {
      get() {
        return this.$store.getters["section/sectionListGet"];
      },
    },
    statesData: {
      get() {
        let statesData = this.sectionListAll;
        if (!this.sectionName) {
          return {};
        }
        if (statesData[this.sectionName]) {
          return statesData[this.sectionName].states;
        } else {
          return {};
        }
      },
    },
    statesDataArrange: {
      get() {
        let statesData = deepClone(this.statesData);
        let statesDataArrange = [];
        for (let key in statesData) {
          statesData[key].forEach((item) => {
            item["groupName"] = key;
          });
          statesDataArrange = statesDataArrange.concat(statesData[key]);
        }
        return statesDataArrange;
      },
    },
    dialogListArrange: {
      get() {
        let dialogListArrange =
          this.$store.getters["section/dialogListArrangeGet"];
        return dialogListArrange;
      },
    },
  },

  methods: {
    handleColumnClass(val) {
      if (val) {
        return `group_${val}`;
      }
    },
    tipClick(type) {
      //返回函数
      return () => {
        console.log("type:", type);
        console.log("this.msg:", this.msg);
        if (!this.msg && type !== "add_group") {
          return;
        }
        if (!this.msg && type == "add_group") {
          this.msg = {
            sectionName: this.sectionName,
          };
        }
        this.msg.type = type;

        let msg = this.msg;

        switch (type) {
          case "add_normal":
            //
            console.log("self_type:", type);
            throttle(event.$emit("innerchooseDialog", this.msg), 1000);
            break;
          case "delete_normal":
            this.$store.dispatch("section/UPDATA_SECTION", msg);
            console.log("self_type:", type);
            break;
          case "replace_normal":
            throttle(event.$emit("innerchooseDialog", this.msg), 1000);
            console.log("self_type:", type);
            break;
          case "add_choice":
            throttle(event.$emit("innerchooseDialog", this.msg), 1000);
            console.log("self_type:", type);
            break;
          case "add_next":
            throttle(event.$emit("innerchooseDialog", this.msg), 1000);
            console.log("self_type:", type);
            break;
          case "add_group":
            throttle(event.$emit("innerchooseDialog", this.msg), 1000);
            console.log("self_type:", type);
            break;
          case "delete_choice":
            this.$store.dispatch("section/UPDATA_SECTION", msg);
            console.log("self_type:", type);
            break;
          case "delete_next":
            this.$store.dispatch("section/UPDATA_SECTION", msg);
            console.log("self_type:", type);
            break;
          case "delete_group":
            console.log("self_type:", type);
            this.$store.dispatch("section/UPDATA_SECTION", msg);
            break;
          default:
            console.warn("default:未知命令");
            break;
        }
        this.msg = null; //清空数据
      };
    },
    menuShow(row, column, e) {
      //创建tip需要的信息
      let msg = {
        sectionName: this.sectionName,
        groupName: row.groupName,
        messageId: row.messageId,
      };
      this.msg = msg;
    },
    deletedialog() {
      console.log(this.stateGroupName, "this.stateGroupName");
      let sectionName = this.sectionName;
      let selectStateName = this.stateGroupName;
      if (sectionName && selectStateName) {
        let msg = {
          type: "delete_state",
          sectionName: sectionName,
          selectStateName: selectStateName,
        };
        this.$store.dispatch("section/UPDATA_SECTION", msg);
      }
    },
    initdialog() {
      console.log(this.stateGroupName, "this.stateGroupName");
      let sectionName = this.sectionName;
      let selectStateName = this.stateGroupName;
      if (sectionName && selectStateName) {
        let msg = {
          type: "init_dialog",
          sectionName: sectionName,
          selectStateName: selectStateName,
        };

        this.$store.dispatch("section/UPDATA_SECTION", msg);
      }
      // console.log(sectionName, selectStateName, "**");
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      // console.log("{row, column, rowIndex, columnIndex}", {
      //   row,
      //   column,
      //   rowIndex,
      //   columnIndex,
      // });

      if (columnIndex == 2) {
        return `column_choice`;
      }
    },
    addstate() {
      let inputaddstate = this.inputaddstate;
      let sectionName = this.sectionName;
      if (inputaddstate && sectionName) {
        let msg = {
          type: "add_state",
          sectionName: sectionName,
          stateName: inputaddstate,
        };
        this.$store.dispatch("section/UPDATA_SECTION", msg);
      }
      this.$forceUpdate();
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      if (val) {
        this.activeIndex = val.row_index;
      }
    },

    handleDoubleClick(row, rowevent, column) {
      let msg = {
        sectionName: this.sectionName,
        groupName: row.groupName,
        messageId: row.messageId,
        type: "add_normal",
      };
      this.msg = msg;
      throttle(event.$emit("innerchooseDialog", this.msg), 1000);
      console.log("row, rowevent, column:", row, rowevent, column);
      console.log("statesData:", this.statesData);

      //   console.log(row, event, column, "DoubleClick==>row, event, column");
    },
    handleRowClick(row, event, column) {
      // console.log(row, this.activeIndex, "Click==>row,this.activeIndex");
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #7fa5ec;color: #000000;height:2px;text-align:center;padding:0";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
      // console.log(row, rowIndex, "row,rowIndex");
      return `group_${row.groupName}`;
    },
    selectNameChange(selectName) {
      if (!selectName) {
        return;
      }
      this.sectionName = selectName;
      // console.log("statesDataArrange:", this.statesDataArrange);
      // console.log("dialogListArrange:", this.dialogListArrange);
    },

    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss">
.sectionEdit {
  height: 100%;
  width: 100%;
  max-height: 90vh;
  overflow: scroll;
  background-color: rgb(248, 228, 228);
}
.el-table .warning-row {
  background: #dd7272;
}

.el-table .success-row {
  background: #99e4b8;
}
.el-table__body tr.current-row > td {
  background-color: #dd7b86 !important;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f1bed8 !important;
}

// 分组颜色设置
.group_1 {
  background-color: #8addb9 !important;
}
.group_2 {
  background-color: #85b7e9 !important;
}
.group_3 {
  background-color: #ffb5b5 !important;
}
.group_4 {
  background-color: #ffd0ff !important;
}
.group_5 {
  background-color: #ecde95 !important;
}
.group_6 {
  background-color: #6fb7b7 !important;
}
.group_7 {
  background-color: #e48a8a !important;
}
.group_8 {
  background-color: #639450 !important;
}
.group_9 {
  background-color: #735db1 !important;
}
.column_choice {
  padding: 0 !important;
  margin: 0 !important;
  // background-color: #fefeff !important;
}
.td {
  padding: 0 !important;
}
.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0 !important;
}
</style>
