<template>
<div class="back-top">
  <img src="../../../assets/img/common/top.png" alt="">
</div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    // backClick(){
    //   console.log('回到顶部');
    //   this.$emit('backClick')
    // }
  }
}
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 8px;
  bottom: 56px;
}
.back-top img{
  width: 40px;
  height: 40px;
}
</style>