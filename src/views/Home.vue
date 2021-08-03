<template>
  <div class="home">
     <el-button plain icon="el-icon-chat-line-round" @click="goMainView">进入主界面</el-button>
  <div>
    
  </div>
  <p></p>
  
  </div>

</template>

<script>

export default {
  name: "Home",
  components: {
    
  },
  methods: {
    goMainView(){
      console.log("==>进入主界面")
      this.$router.push({path:"./MainView"})
    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  position: absolute;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.top-list {
  background-color: #f1bcd7;
}
/* -------- */
// .g-container
//     -for(var i=0; i<50; i++)
//         p

/* @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200&display=swap'); */

$str: '别催了，我正在！！正在全速加载加载！！！';
$length: str-length($str);
$n: 50;
$animationTime: 3;
$perColumnNums: 25;

@function randomChar() {
    $r: random($length);
    @return str-slice($str, $r, $r);
}

@function randomChars($number) {
    $value: '';

    @if $number > 0 {
        @for $i from 1 through $number {
            $value: $value + randomChar();
        }
    }
    @return $value;
}

body, html {
    width: 100%;
    height: 100%;
    background: rgb(235, 228, 228);
    display: flex;
    overflow: hidden;
}

.g-container {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-direction: row;
    font-family: 'Inconsolata', monospace, sans-serif;
}

p {
    position: relative;
    width: 2vh;
    height: 100vh;
    text-align: center;
    font-size: 2vh;
    word-break: break-all;
    white-space: pre-wrap;
    
    &::before,
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
    }
}

@for $i from 0 through $n {
    $content: randomChars($perColumnNums);
    $contentNext: randomChars($perColumnNums);
    $delay: random($n);
    $randomAnimationTine: #{$animationTime + random(20) / 10 - 1}s;
  
    p:nth-child(#{$i})::before {
        content: $content;
        color: rgb(231, 5, 73);
        text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 5px currentColor, 0 0 10px currentColor;
        animation: typing-#{$i} $randomAnimationTine steps(20, end) #{$delay * 0.1s * -1} infinite;
        z-index: 1;
    }

    // p:nth-child(#{$i})::after {
    //     // $alpha: random(40) / 100 + 0.6;
    //     $alpha:0.3;
    //     content: '';
    //     background: linear-gradient(rgba(0, 0, 0, $alpha), rgba(0, 0, 0, $alpha), rgba(0, 0, 0, $alpha), transparent 75%, transparent);
    //     background-size: 100% 220%;
    //     background-repeat: no-repeat;
    //     animation: mask $randomAnimationTine infinite #{($delay - 2) * 0.1s * -1} linear;
    //     z-index: 2;
    // }

    @keyframes typing-#{$i} {
        0% {
            height: 0;
        }
        25% {
            height: 100%;
        }
        100% {
            height: 100%;
            content: $contentNext;
        }
    }
}

@keyframes mask{
    0% {
        background-position: 0 220%;
    } 
    30% {
        background-position: 0 0%;
    }
    100% {
        background-position: 0 0%;
    }
}


</style>
