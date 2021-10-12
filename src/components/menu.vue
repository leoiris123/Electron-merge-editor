<template>
  <div id="menu_tip">
    <ul
      v-if="stateTip.state"
      :style="{ top: stateTip.pos.y + 'px', left: stateTip.pos.x + 'px' }"
      class="tip_ul"
    >
      <li
        class="li_item"
        v-for="(item, index) in options"
        :key="index"
        @click="item.onClick"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MergeEditorMenu",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    stateTip: {
      type: Object,
      default: () => {
        return {
          state: false,
          pos: {
            x: 0,
            y: 0,
          },
        };
      },
    },
  },
  data() {
    return {
      node: null,
    };
  },

  mounted() {
    this.node = document.body.querySelector("#menu_tip");

    // console.log("父组件");
    this.createTip();
  },
  watch: {
    stateTip(val) {
      console.log(" stateTip:", val);
    },
  },
  methods: {
    createTip() {},
  },
};
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  max-height: 600px;
  max-width: 110px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* display: inline-block; */
}
.li_item {
  /* display: inline-block; */
}
.tip_ul {
  position: absolute;
}
</style>