<template>
    <div>
         {{sectionName}}
    </div>
</template>

<script>
import event from "../../script/tool/event";
export default {
    name: 'HeaderView',

    components: {},

    directives: {},

    data() {
        return {
            sectionName:""
        };
    },

    mounted() { 
          /* eslint-disable */
         event.$on("headerShowName",(val)=>{
             this.sectionName = val 
         })
           /* eslint-disable */
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>