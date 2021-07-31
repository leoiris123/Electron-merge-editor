<template>
    <div>
         <el-button @click="goBack" class="back-btn"  icon="el-icon-arrow-left"></el-button>
    </div>
</template>

<script>
export default {
    name: 'BackBtn',

    components: { },

    directives: {},

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

 
    methods:{
        goBack(){
            this.$router.back()
        }
    }
};
</script>

<style lang="scss" scoped>
    .back-btn{
        position: absolute;
        right: 10px;
        top: 10px;
    }
</style>