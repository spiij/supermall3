<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control class="tabcontrol"
               :title="['流行', '精选', '新款']"
               @tabItemClick="tabClick"
               v-show="isFixed" ref="tabControl1"/>

  <scroll class="home-scroll"
          ref="scroll"
          :probe-type="3"
          @scroll="scroll"
          @pullingUp="pullingUp"
          :pull-up-load="true">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :title="['流行', '精选', '新款']"
                 @tabItemClick="tabClick"
                 ref="tab"/>

    <goods-list :goods="goods[currentType].list"/>
  </scroll>

  <back-top @click.native="backClick" v-show="isBackTopShow"/>
</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
// import { Swiper, SwiperItem } from '../../components/common/swiper'
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "../../components/content/tabControl/TabControl";

import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import GoodsList from "../../components/content/goods/GoodsList";
// import GoodsListItem from "../../components/content/goods/GoodsListItem";

import { getHomeMultiData, getHomeGoods } from "../../network/home";

import { debounce } from "../../common/utils";

import {itemListnerMixin} from "../../common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    // GoodsListItem
    Scroll,
    BackTop
  },
  data(){
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isFixed: false,
      positionY: 0,
      // itemImgListner: null
    }
  },
  created(){
    this.getHomeMultiData()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // this.$bus.$on('itemImageLoad',() => {
    //   this.$refs.scroll.refresh()
    // })
  },
  mixins: [itemListnerMixin],
  // mounted() {
  //   const refresh = debounce(this.$refs.scroll.refresh, 500)
  //
  //   this.homeImageLoad = () => {
  //     // console.log('-----');
  //     // this.$refs.scroll.refresh()
  //     refresh()
  //   }
  //   this.$bus.$on('itemImageLoad', this.homeImageLoad)
  //
  //   // setTimeout(() => {
  //   //   this.tabOffsetTop = this.$refs.tab.$el.offsetTop
  //   //   console.log(this.tabOffsetTop);
  //   // }, 200)
  //
  // },
  destroyed() {
    console.log('destroyed');
  },
  deactivated() {
    // console.log(this.$refs.scroll.scroll.y);
    this.positionY = this.$refs.scroll.scroll.y
    this.$refs.scroll.refresh()

    this.$bus.$off('itemImageLoad', this.homeImageLoad)
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.positionY, 0)
  },
  methods: {
    getHomeMultiData(){
      getHomeMultiData().then(res => {
        //console.log(res);
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list)

        this.$refs.scroll.scroll.finishPullUp()
      })

      this.goods[type].page = page
    },

    tabClick(index){
      // console.log(index);
      const titles = ['pop', 'new', 'sell']
      this.currentType = titles[index]
      this.$refs.tab.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    scroll(position){
      // console.log(position);
      this.isBackTopShow = -position.y > 1000
      this.isFixed = -position.y > this.tabOffsetTop
    },
    pullingUp(){
      this.getHomeGoods(this.currentType)
    },
    // debounce(func, delay){
    //   let timer = null
    //
    //   return function (...args){
    //     if(timer) clearTimeout(timer)
    //
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // }
    swiperImageLoad(){
      // console.log('------');
      this.tabOffsetTop = this.$refs.tab.$el.offsetTop
      // console.log(this.tabOffsetTop);
    }
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;

    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tabcontrol{
    position: relative;
    z-index: 9;
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  /*.fixed{*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/

  .home-scroll{
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.home-scroll {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
