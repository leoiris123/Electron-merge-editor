<template>
  <div>
    <div ref="box" class="box"></div>
    <!-- <button @click="test">test</button> -->
    <el-row>
      <el-button plain @click="dialogHandle(1)">展开全部</el-button
      ><el-button plain @click="dialogHandle(0)">折叠全部</el-button></el-row
    >
    <div class="dialog_body">
      <div class="dialog_edit">
        <el-collapse v-model="currentName" @change="handleChange">
          <el-collapse-item
            v-for="(item, index) in selectGroupData"
            :key="index"
            :name="item.id"
          >
            <template slot="title">
              {{ item.txt
              }}<i
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
                  <!-- 选择动画： -->
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
                        <!-- configuration[dialogEditList[item.id][character].char].skin.default -->
                        <!-- :disabled="dialogEditList[item.id][character].char==''?true:false" -->
                        <div>
                          <el-option
                            v-for="item in dialogEditList[item.id]
                              ? configuration[
                                  dialogEditList[item.id][character].char
                                ].skin.default
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
        let checkdialogEditListBase = deepClone(this.dialogEditList);
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
      });
    },
    handleQuick(character, config) {
      return new Promise((resolve, reject) => {
        for (let key in this.selectGroupData) {
          this.dialogEditList[key][character] = deepClone(config);
        }
        this.handleSelectChange();
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
      if (val) {
        this.currentName = Object.keys(this.selectGroupData);
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

  max-height: 19vh;
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
</style>
