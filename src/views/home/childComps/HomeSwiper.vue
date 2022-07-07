<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImageLoad(){
      // console.log('swiperImageLoad');
      if(!this.isLoaded){
        this.$emit('swiperImageLoad')
        this.isLoaded = true
      }
    }
  }
}
</script>

<style scoped>

</style>