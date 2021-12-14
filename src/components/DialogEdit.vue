<template>
  <div>
    <div ref="box" class="box"></div>
    <!-- <button @click="test">test</button> -->
    <div style="position: relative">
      <!--  -->
    </div>
    <el-tooltip class="item" effect="light" placement="right">
      <div slot="content">点击展开<br />双击收起</div>
      <el-button
        @click="dialogHandle(1)"
        @dblclick.native="dialogHandle(0)"
        style="font-size: 16px; z-index: 10"
        >{{ selectDialogGroupName }} :</el-button
      >
    </el-tooltip>

    <div class="dialog_body">
      <div class="dialog_edit">
        <el-collapse v-model="currentName" @change="handleChange">
          <el-collapse-item
            v-for="(item, index) in selectGroupData"
            :key="index"
            :name="item.id"
          >
            <template slot="title">
              <div>{{ item.zh }}</div>
              <i
                class="header-icon el-icon-info"
                v-show="!checkdialogEditList[item.id]"
                style="color: red"
              ></i>
            </template>
            <div>
              <el-row type="flex">
                <el-row
                  class="item_character"
                  v-for="(character, index1) in characterList"
                  :key="index1"
                >
                  <!-- 选择人物 -->
                  <el-row
                    type="flex"
                    v-if="index == Object.keys(selectGroupData)[0]"
                    ><div class="vertical">{{ character }}</div>
                    <el-select
                      v-model="dialogEditList[item.id][character].char"
                      @change="handleSelectChange"
                      filterable
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in Object.keys(configuration)"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-row>
                  <!-- 选择表情： -->
                  <el-row
                    v-if="
                      dialogEditList[item.id][character].char == ''
                        ? false
                        : true
                    "
                  >
                    <el-row type="flex"
                      ><div class="vertical">动画</div>
                      <el-select
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true
                        "
                        v-model="dialogEditList[item.id][character].emotion"
                        @change="handleSelectChange"
                        filterable
                        clearable
                        placeholder="请选择"
                      >
                        <div>
                          <el-option
                            v-for="item in dialogEditList[item.id]
                              ? configuration[
                                  dialogEditList[item.id][character].char
                                ].spine.ani
                              : null"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </div>
                      </el-select>
                    </el-row>
                  </el-row>
                  <!-- 皮肤 -->
                  <el-row
                    v-if="
                      dialogEditList[item.id][character].char == ''
                        ? false
                        : true
                    "
                  >
                    <el-row type="flex"
                      ><div class="vertical">皮肤</div>
                      <el-select
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true
                        "
                        v-model="dialogEditList[item.id][character].skin"
                        @change="handleSelectChange"
                        filterable
                        clearable
                        placeholder="请选择"
                      >
                        <div>
                          <el-option
                            v-for="item in dialogEditList[item.id]
                              ? configuration[
                                  dialogEditList[item.id][character].char
                                ].spine.skin
                              : null"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </div>
                      </el-select>
                    </el-row>
                  </el-row>
                  <!-- 选择音效 -->
                  <el-row
                    v-if="
                      dialogEditList[item.id][character].char == ''
                        ? false
                        : true
                    "
                  >
                    <el-row type="flex"
                      ><div class="vertical">音效</div>
                      <el-select
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true
                        "
                        v-model="dialogEditList[item.id][character].audio"
                        @change="handleSelectChange"
                        filterable
                        clearable
                        placeholder="请选择"
                      >
                        <!-- configuration[dialogEditList[item.id][character].char].skin.default -->
                        <!-- :disabled="dialogEditList[item.id][character].char==''?true:false" -->
                        <div>
                          <el-option
                            v-for="item in dialogEditList[item.id]
                              ? configuration[
                                  dialogEditList[item.id][character].char
                                ].audios
                              : null"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </div>
                      </el-select>
                    </el-row>
                  </el-row>
                  <!--  轴坐标 -->
                  <el-row
                    v-if="
                      dialogEditList[item.id][character].char == ''
                        ? false
                        : true
                    "
                    type="flex"
                  >
                    <el-input
                      type="number"
                      size="mini"
                      @input="handleSelectChange"
                      placeholder="x坐标"
                      clearable
                      v-model="dialogEditList[item.id][character].x"
                    >
                    </el-input>
                    <el-input
                      type="number"
                      size="mini"
                      clearable
                      @input="handleSelectChange"
                      placeholder="y坐标"
                      v-model="dialogEditList[item.id][character].y"
                    >
                    </el-input>
                  </el-row>
                  <!--  -->
                  <el-row type="flex">
                    <el-col style="min-height: 15px">
                      <el-checkbox
                        @change="handleSelectChange"
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true
                        "
                        v-model="dialogEditList[item.id][character].isMain"
                        >为主</el-checkbox
                      >
                    </el-col>

                    <!-- 翻转 -->

                    <el-col>
                      <el-checkbox
                        @change="handleSelectChange"
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true && index == Object.keys(selectGroupData)[0]
                        "
                        v-model="dialogEditList[item.id][character].flip"
                        >翻转</el-checkbox
                      >
                    </el-col>

                    <!-- 显示名字-->

                    <el-col>
                      <el-checkbox
                        @change="handleSelectChange"
                        v-if="
                          dialogEditList[item.id][character].char == ''
                            ? false
                            : true
                        "
                        v-model="dialogEditList[item.id][character].showName"
                        >显名</el-checkbox
                      >
                    </el-col>
                    <el-col>
                      <!-- 没写呢 -->
                    </el-col>
                  </el-row>
                  <i
                    v-if="index == Object.keys(selectGroupData)[0]"
                    @dblclick="
                      dialogQuick(character, dialogEditList[item.id][character])
                    "
                    class="el-icon-edit corner"
                  ></i>
                </el-row>
                <!-- 其他 -->
                <el-row class="item_character">
                  <el-row>
                    <el-col>
                      <el-checkbox
                        @change="handleSelectChange"
                        v-if="dialogEditList[item.id] == '' ? false : true"
                        v-model="dialogEditList[item.id].shake"
                        >屏幕震动</el-checkbox
                      >
                    </el-col>
                  </el-row>
                </el-row>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import event from "../../script/tool/event";
import initDialogEditVO from "../../script/vo/initDialogEditVO";
import { deepClone } from "../../script/tool/tool";
export default {
  name: "DialogEdit",

  components: {},

  directives: {},

  data() {
    return {
      currentData: {
        tabValue: "left1",
        currentId: "",
        char: "",
        emotion: "",
        timer: null,
      },
      currentName: ["1"],
      selectDialogGroupName: "",
      characterList: ["left1", "right1", "left2", "right2"],
      value: "",
      configuration: this.$store.getters["configuration/configurationGet"],
    };
  },
  computed: {
    dialogList: {
      get() {
        let dialogListAll = this.$store.getters["section/dialogListGet"];
        let dialogList = [];

        Object.keys(dialogListAll).map((item, index) => {
          let temp = {
            id: index,
            label: item,
          };
          dialogList.push(temp);
        });

        return dialogList;
      },
    },
    selectGroupData: {
      get() {
        let dialogListAll = this.$store.getters["section/dialogListGet"];
        let selectGroupData = dialogListAll[this.selectDialogGroupName];
        console.log(selectGroupData, "----------");
        return selectGroupData;
      },
    },

    dialogEditList: {
      get() {
        let dialogEditListBase =
          this.$store.getters["section/dialogEditListGet"];
        // let dialogEditList
        console.log(this.selectGroupData, "this.selectGroupData");
        let currentIDList = Object.keys(this.selectGroupData);
        currentIDList.map((id) => {
          if (!dialogEditListBase[id]) {
            //
            dialogEditListBase[id.toString()] = new initDialogEditVO();
            // console.log(dialogEditListBase[id],"dialogEditListBase[id]")
          }
          this.characterList.map((character) => {
            if (!dialogEditListBase[id][character]) {
              dialogEditListBase[id][character] = {
                char: "",
                emotion: "",
                isMain: false,
                flip: false,
              };
            }
          });
        });

        return dialogEditListBase;
      },
    },
    //红点系统数据
    checkdialogEditList: {
      get() {
        let checkdialogEditListBase = this.dialogEditList;
        let checkdialogEditList = {};
        for (let key in checkdialogEditListBase) {
          this.characterList.forEach((itemchar) => {
            if (
              Object.prototype.hasOwnProperty.call(
                checkdialogEditListBase[key],
                itemchar
              ) &&
              checkdialogEditListBase[key][itemchar].char !== ""
            ) {
              checkdialogEditList[key] = true;
            }
          });
        }
        event.$emit("checkdialogEditList", checkdialogEditList);
        return checkdialogEditList;
      },
    },
  },
  mounted() {
    event.$on("selectDialogNameChange", (selectDialogGroupName) => {
      this.selectDialogGroupName = selectDialogGroupName;
      console.log(this.selectDialogGroupName);
      console.log(this.selectDialogGroupName, "this.selectDialogGroupName");
    });
    event.$on("saveAllDialog", () => {
      this.$store.dispatch("section/SET_DIALOG_EDIT_LIST", this.dialogEditList);
    });
    document.addEventListener("keydown", this.copygetValue);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.copygetValue);
  },
  methods: {
    dialogQuick(character, config) {
      console.log("一键配置character, config", character, config);
      //仅仅复制人物名称和翻转
      // let newConfig = {
      //   audio: config.audio || "",
      //   flip: config.flip || false,
      // };
      this.handleQuick(character, config).then((res) => {
        this.$message.success(character + "数据应用成功");
        this.handleSelectChange();
      });
    },
    handleQuick(character, config) {
      return new Promise((resolve, reject) => {
        for (let key in this.selectGroupData) {
          this.dialogEditList[key][character] = deepClone(config);
        }
        resolve("success");
      });
    },
    copygetValue(e) {
      if (this.currentData.currentId === "") {
        console.log("当前未打开任何数据");
        return;
      }
      if (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) {
        this.currentData.char =
          this.dialogEditList[this.currentData.currentId][
            this.currentData.tabValue
          ].char;
        this.currentData.emotion =
          this.dialogEditList[this.currentData.currentId][
            this.currentData.tabValue
          ].emotion;
        this.$message.success("复制成功");
      } else if (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) {
        this.dialogEditList[this.currentData.currentId][
          this.currentData.tabValue
        ].char = this.currentData.char;
        this.dialogEditList[this.currentData.currentId][
          this.currentData.tabValue
        ].emotion = this.currentData.emotion;
        this.$message.success("粘贴成功");
        this.$forceUpdate();
      }
    },
    handleSelectChange() {
      console.log(this.dialogEditList);
      console.log(this.tabValue, "-----");
      this.$forceUpdate();
    },
    dialogHandle(val) {
      console.log(val, "val");

      clearTimeout(this.timer);
      if (val) {
        this.timer = setTimeout(() => {
          this.currentName = Object.keys(this.selectGroupData);
        }, 300);
      } else {
        this.currentName = [];
      }
    },
    handleChange(val) {
      this.currentData.currentId = val;
      this.currentData.tabValue = "left1";

      console.log(this.currentName, "this.currentName");
      console.log(this.selectGroupData, "selectGroupData--");
      console.log(this.dialogEditList, "this.dialogEditList--");
      console.log(this.checkdialogEditList, "this.checkdialogEditList--");
    },
  },
};
</script>

<style lang="scss">
.preview {
  background: rgb(122, 122, 206);
  width: 500px;
  height: 500px;
}
.dialog_body {
  height: 89vh;
  // border: 1px black solid;
  overflow: scroll;
}
.dialog_list {
  max-height: 37vh;
  // border: 1px red solid;
  overflow: scroll;
}
.dialog_edit {
  // height: 100%;
  // border: 1px rgb(34, 38, 78) solid;
  overflow: scroll;
  padding-left: 15px;
}
.row_txt {
  text-align: left;
  background-color: whitesmoke;
  margin: 5px 4px auto 4px;
  line-height: 35px;
  font-size: 18px;
}
.item_character {
  flex: 1;
  border: 1px dotted rgb(138, 125, 125);

  max-height: 22vh;
  position: relative;
}
.vertical {
  writing-mode: vertical-lr;
}
.corner {
  position: absolute;
  right: 6px;
  color: red;
  bottom: 4px;
}
.el-select {
  width: 100%;
}
</style>
