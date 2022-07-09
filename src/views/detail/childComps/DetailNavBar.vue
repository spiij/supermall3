<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="detail-nav-back" @click="backClick"><img src="../../../assets/img/common/back.svg" alt="" ></div>
      <div slot="center" class="detail-nav-title">
        <span v-for="(item, index) in titles"
              class="detail-nav-title-item"
              @click="titleClick(index)"
              :class="{active: currentIndex === index}">
          <span>{{item}}</span>
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data(){
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      // console.log('titleClick', index);
      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav-back{
  font-size: 12px;
  padding-top: 5px;
  text-align: left;
  padding-left: 8px;
}

.detail-nav-back img{
  width: 18px;
  height: 18px;
}

.detail-nav-title{
  display: flex;
  font-size: 13px;
}

.active{
  color: var(--color-high-text);
}

/*.active span{*/
/*  border-bottom: 3px solid red;*/
/*}*/

.detail-nav-title-item{
  flex: 1;
}

/*.detail-nav-title-item span {*/
/*  padding: 5px 5px;*/
/*}*/
</style>