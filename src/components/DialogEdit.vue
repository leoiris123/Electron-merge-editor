<template>
  <div>
    <button @click="test">test</button>
    <el-collapse v-model="currentName" accordion @change="handleChange">
      <el-collapse-item
        v-for="(item, index) in selectGroupData"
        :key="index"
        :name="item.id"
      >
        <template slot="title">
          {{ item.txt }}<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <el-tabs tab-position="top" type="card" style="height: 200px;">
            <el-tab-pane label="立绘配置">
              <el-tabs tab-position="left" style="height: 200px;">
                <el-tab-pane
                  v-for="(character, index1) in characterList"
                  :key="index1"
                  :label="character"
                >
                  <el-row>
                    {{ character }}
                  </el-row>

                  <el-row>
                    <el-col
                      >选择角色：<el-select
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
                        </el-col>
                  </el-row>

                   <el-row>
                    <el-col>选择皮肤：
                      <el-select
                      v-if="dialogEditList[item.id][character].char==''?true:false"
                        v-model="dialogEditList[item.id][character].char"
                        @change="handleSelectChange"
                        filterable
                        clearable
                        placeholder="请选择"
                      >
                        <!-- <el-option
                        :disabled="dialogEditList[item.id][character].char==''?true:false"
                          v-for="item in configuration[dialogEditList[item.id][character].char].skin.default"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option>  -->
                        </el-select
                    >

                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
              <input type="text" />
            </el-tab-pane>

            <el-tab-pane label="敬请期待">
              这里啥都没有 ID:{{ item.id }}
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import event from "../../script/tool/event";
import initDialogEditVO from "../../script/vo/initDialogEditVO";
export default {
  name: "DialogEdit",

  components: {},

  directives: {},

  data() {
    return {
      currentName: ["1"],
      selectDialogGroupName: "",
      characterList: ["left1", "right1", "left2", "right2"],
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
        return selectGroupData;
      },
    },
    // configuration: {
    //   get() {
    //     let configuration = this.$store.getters[
    //       "configuration/configurationGet"
    //     ];
    //     console.log("configurationGetconfigurationGet");
    //     return configuration;
    //   },
    // },
    dialogEditList: {
      get() {
        let dialogEditListBase = this.$store.getters[
          "section/dialogEditListGet"
        ];
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
              };
            }
          });
        });

        return dialogEditListBase;
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
  },

  methods: {
    handleSelectChange() {
      this.$forceUpdate();
    },
    test() {
      console.log(this.dialogList, "this.dialogList");
      console.log(this.selectGroupData, "this.selectGroupData");
      console.log(this.currentName, "this.currentName");
      console.log(this.configuration, "this.configuration");
      console.log(this.dialogEditList, "dialogEditList");
      let dialogVO = new initDialogEditVO("asd");
      console.log(dialogVO, "initDialogEditVO");
      this.$forceUpdate();
    },
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
