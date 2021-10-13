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
      :data="statesData"
      style="width: 100%"
    >
    </el-table>
    <innerchoose-dialog></innerchoose-dialog>
    <menu-tip :options="options" :stateTip="stateTip"></menu-tip>
  </div>
</template>

<script>
import event from "../../script/tool/event";
import InnerchooseDialog from "./innerchooseDialog.vue";
import menuTip from "./menu.vue";
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
          name: "测试自定义",
          onClick: function (e) {
            console.log("menu1 clicked");
          },
        },
        {
          name: "贝克汉姆·雷",
          onClick: function (e) {
            console.log("menu2 clicked");
          },
        },
        {
          name: "莱昂纳多·雷",
          onClick: function (e) {
            console.log("menu3 clicked");
          },
        },
      ],
      stateTip: {
        state: false,
        pos: {
          x: 0,
          y: 0,
        },
      },
    };
  },
  beforeDestroy() {
    document.querySelector(".sectionEdit").onmouseup = null;
  },
  mounted() {
    event.$on("selectNameChange", this.selectNameChange);
    event.$on("sectionChange", (val) => {
      this.sectionListAll = val;
    });
    document.querySelector(".sectionEdit").onmouseup = (e) => {
      console.log("E", e);

      if (e.button == 2) {
        this.stateTip = {
          state: true,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
        };
      } else {
        this.stateTip = {
          state: false,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
        };
      }
    };
  },
  computed: {
    sectionListAll: {
      get() {
        return this.$store.getters["section/sectionListGet"];
      },
      set(val) {
        console.log("*/**/********");
      },
    },
    statesData: {
      get() {
        let statesData = this.$store.getters["section/sectionListGet"];
        if (!this.sectionName) {
          return {};
        }
        if (statesData[this.sectionName]) {
          //   console.log(statesData[this.sectionName].states,"statesData[this.sectionName].states")
          return statesData[this.sectionName].states;
        } else {
          return {};
        }
      },
    },
    statesDataArrange: {
      get() {
        let statesData = this.statesData;
        let statesDataArrange = [];
        for (let key in statesData) {
          statesData[key].forEach((item) => {
            item["groupName"] = key;
          });
          statesDataArrange.push(statesData[key]);
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
      console.log(sectionName, selectStateName, "**");
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
        stateGroupName: this.stateGroupName,
        index: row.row_index,
        // messageId:row.messageId
      };
      // event.$emit("OpenOrderList", msg);
      event.$emit("innerchooseDialog", msg);

      //   console.log(row, event, column, "DoubleClick==>row, event, column");
    },
    handleRowClick(row, event, column) {
      console.log(row, this.activeIndex, "Click==>row,this.activeIndex");
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #e3b4b8;color: #000000;height:2px;text-align:center;padding:0";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;

      //   console.log(row, rowIndex, "row,rowIndex");
    },
    selectNameChange(selectName) {
      if (!selectName) {
        return;
      }
      this.sectionName = selectName;
    },

    handleClick(tab, event) {
      console.log(tab, event, "顶部选择");
      console.log("sectionListAll:", this.sectionListAll);
      console.log("statesData:", this.statesData);
      console.log("dialogListArrange:", this.dialogListArrange);
    },
  },
};
</script>

<style lang="scss">
.sectionEdit {
  height: 100%;
  width: 70vw;
}
.el-table .warning-row {
  background: rgb(185, 10, 39);
}

.el-table .success-row {
  background: #0ed5f0;
}
.el-table__body tr.current-row > td {
  background-color: #a39696;
}
</style>
