<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in statesData"
        :key="index"
        :label="index"
        :name="index"
        >
        {{statesData[index]}}
        <el-table
          :data="statesData[index]"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
        
          <!-- <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import event from "../../script/tool/event";
import section from "../store/modules/section";
export default {
  name: "SectionEdit",

  components: {},

  directives: {},

  data() {
    return {
      sectionName: null,
      activeName: "first",
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
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    selectNameChange(selectName) {
      if (!selectName) {
        return;
      }
      this.sectionName = selectName;
      //   console.log(this.sectionName,"this.sectionName")
      console.log(Object.keys(this.statesData), "<==keys,");
      console.log(Object.values(this.statesData), "<==values,");

      console.log(this.statesData, "statesData");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
