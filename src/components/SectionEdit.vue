<template>
  <div>
    <el-tabs v-model="stateGroupName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in statesData"
        :key="index"
        :label="index"
        :name="index"
      >
        <!-- :fit="true" -->
        <!-- :row-class-name="tableRowClassName" -->
        <el-table
          ref="edit"
          :row-class-name="tableRowClassName"
          highlight-current-row
          @current-change="handleCurrentChange"
          :border="true"
          @row-click="handleRowClick"
          @row-dblclick="handleDoubleClick"
          :height="400"
          show-overflow-tooltip
          :header-cell-style="tableHeaderColor"
          :data="item"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="messageId" label="messageId" width="280">
            <template slot-scope="scope">
              <div>
                {{
                  dialogListArrange[scope.row.messageId]
                    ? dialogListArrange[scope.row.messageId].txt
                    : scope.row.messageId
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="choice" width="280">
            <template slot-scope="scope">
              <!-- 分支语句判断 -->
              <el-popover
                v-if="scope.row.choice"
                trigger="hover"
                placement="top"
              >
                <div v-for="(item, index) in scope.row.choice" :key="index">
                  <p>
                    text:
                    {{
                      item && dialogListArrange[item.messageId]
                        ? dialogListArrange[item.messageId].txt
                        : "无"
                    }}
                  </p>
                  <p>next: {{ item ? item.nextState : "无" }}</p>
                </div>

                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{
                    scope.row.choice ? "分支" : "无分支"
                  }}</el-tag>
                </div>
              </el-popover>
              <!-- 结束语句判断 -->
 
              <div class="name-wrapper" v-if="scope.row.end">
                <el-tag size="medium">{{
                  scope.row.end ? "结束语" : ""
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="nextStates" label="nextStates" width="100">
          </el-table-column> -->
          <!--
          <el-table-column prop="address" label="地址"> </el-table-column>  -->
        </el-table>
      </el-tab-pane>
      <el-row>
        <el-row type="flex" style="margin-top:10px">
          <el-button @click="addstate" plain icon="el-icon-plus"
            >新增对话列表</el-button
          >
          <el-input v-model="inputaddstate" placeholder="请输入内容"></el-input>
          <el-button @click="adddialog" plain icon="el-icon-plus"
            >初始化对话列表</el-button
          >
        </el-row>
      </el-row>
    </el-tabs>
    <order-list> </order-list>
  </div>
</template>

<script>
import event from "../../script/tool/event";
// import section from "../store/modules/section";
import OrderList from "../components/OrderList.vue";
export default {
  name: "SectionEdit",

  components: {
    OrderList,
  },

  directives: {},

  data() {
    return {
      sectionName: null,
      stateGroupName: "1",

      activeIndex: 0,
      inputaddstate: "",
      inputadddialog: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },

  mounted() {
    event.$on("selectNameChange", this.selectNameChange);
  },
  computed: {
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
    dialogListArrange: {
      get() {
        let dialogListArrange = this.$store.getters[
          "section/dialogListArrangeGet"
        ];
        return dialogListArrange;
      },
    },
  },
  methods: {
    adddialog() {
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
      //   console.log(val, "this.activeIndex = val");
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
      event.$emit("OpenOrderList", msg);
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
      //   console.log(this.sectionName,"this.sectionName")
      //   console.log(Object.keys(this.statesData), "<==keys,");
      //   console.log(Object.values(this.statesData), "<==values,");

      console.log(this.statesData, "statesData");
    },

    handleClick(tab, event) {
      //   console.log(tab, event, "顶部选择");
    },
  },
};
</script>

<style lang="scss">
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
