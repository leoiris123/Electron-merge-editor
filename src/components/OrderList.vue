<template>
  <div>
    <el-dialog
      title="命令列表"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row :gutter="10" style="padding-bottom: 20px;">
        <el-col :span="4.5">
          <el-button @click="gotoOrderItem('chooseDialog')" type="primary" round
            >对白设置</el-button
          >
        </el-col>
        <!-- <el-col :span="4.5">
          <el-button type="primary" round>暂无2</el-button>
        </el-col>
        <el-col :span="4.5">
          <el-button type="primary" round>暂无3</el-button>
        </el-col> -->
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
      <innerchoose-dialog>  </innerchoose-dialog>
    </el-dialog>
  </div>
</template>

<script>
import event from "../../script/tool/event";
import InnerchooseDialog from './innerchooseDialog.vue';
export default {
  name: "OrderList",

  components: {InnerchooseDialog},

  directives: {},

  data() {
    return {
      dialogVisible: false,
    };
  },

  mounted() {
    event.$on("OpenOrderList", (val) => {
      this.dialogVisible = true;
      this.tempSectionDate = val;
      console.log(this.tempSectionDate, "this.tempSectionDate");
    });
  },

  methods: {
    gotoOrderItem(OrderItem) {
      if (OrderItem) {
        switch (OrderItem) {
          case "chooseDialog":
            //   嵌套的第二级dialog
            event.$emit("innerchooseDialog", this.tempSectionDate);
            break;
        }
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
