<template>
  <div class="intro-wrap" @click="closeIntro">
    <h1>My Memo</h1>
    <div class="intro-cont">
<img :src="require('@/assets/images/play1.png')" alt="">
    </div>
  </div>
</template>

<script>
export default {
setup(props,context){
const closeIntro = ()=>{
context.emit('closeintro');
}
  return{
closeIntro
  }
}
}
</script>

<style>

  h1{
   text-align: center;
  }
  .intro-wrap{
    position: fixed;
    left: 0;
    top: 0;
    margin: 0 auto;
    display: block;
    width:100vw;
    height: 100vh;
    background-color:#fff;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    
  }



</style>