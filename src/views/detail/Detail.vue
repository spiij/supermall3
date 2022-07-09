<template>
<div id="detail">
  <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo"
                       @detailImageLoad="detailImageLoad"/>
    <detail-param-info ref="paramInfo" :param-info="goodsParam"/>
    <detail-comment-info ref="commentInfo" :comment-info="commentInfo"/>
    <goods-list ref="recommendInfo" :goods="recommends"/>
  </scroll>

</div>
</template>

<script>
// import NavBar from "../../components/common/navbar/NavBar";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "../../components/common/scroll/Scroll";

import GoodsList from "../../components/content/goods/GoodsList";

import {debounce} from "../../common/utils";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

import {itemListnerMixin} from "../../common/mixin";

export default {
  name: "Detail",
  data(){
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      // itemImgListner: null
      positionY: [],
      getThemeY: null,
      currentIndex: 0
    }
  },
  created(){
    this.iid = this.$route.params.iid
    // console.log(this.iid)
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    this.getThemeY = debounce(() => {
      this.positionY.push(0, this.$refs.paramInfo.$el.offsetTop,
          this.$refs.commentInfo.$el.offsetTop,
          this.$refs.recommendInfo.$el.offsetTop)

      this.positionY.push(Number.MAX_VALUE)
      console.log(this.positionY)
    }, 200)


  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 300)
    //
    // this.itemImgListner = () => {
    //   refresh()
    // }
    //
    // this.$bus.$on('itemImageLoad', this.itemImgListner)

    // this.positionY.push(0, this.$refs.paramInfo.$el.offsetTop,
    //     this.$refs.commentInfo.$el.offsetTop,
    //     this.$refs.recommendInfo.$el.offsetTop)
    // console.log(this.positionY)
  },
  mixins:[itemListnerMixin],
  deactivated() {
    console.log('deactivated');
  },
  destroyed() {
    // console.log('destoryed');
    this.$bus.$off('itemImageLoad', this.itemImgListner)
  },
  components: {
    // NavBar
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  methods: {
    detailImageLoad(){
      this.$refs.scroll.refresh()

      this.getThemeY()
    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.positionY[index], 300)
    },
    detailScroll(position){

      const y = -position.y
      const len = this.positionY.length

      for(let i = 0; i < len; i++){
        if((i < len - 1 && y >= this.positionY[i] && y < this.positionY[i + 1]) || (i = len - 1 && y >= this.positionY[i])){
          this.currentIndex = i
          console.log(i)
        }
      }

      // for(let i = 0; i < 5; i++){
      //   if(this.positionY[i] <= y < this.positionY[i+1]){
      //     this.$refs.detailNavBar.currentIndex = i
      //   }
      // }


      // if(this.positionY[0] <= y && y < this.positionY[1]){
      //   // console.log(position.y);
      //   this.$refs.detailNavBar.currentIndex = 0
      //   // console.log(this.$refs.detailNavBar.currentIndex);
      // }
      //
      // if(this.positionY[1] <= y && y < this.positionY[2]){
      //   this.$refs.detailNavBar.currentIndex = 1
      //   console.log(this.$refs.detailNavBar.currentIndex);
      // }
      //
      // if(this.positionY[2] <= y && y < this.positionY[3]){
      //   this.$refs.detailNavBar.currentIndex = 2
      //   console.log(this.$refs.detailNavBar.currentIndex);
      // }
      //
      // if(this.positionY[3] <= y && y < this.positionY[4]){
      //   this.$refs.detailNavBar.currentIndex = 3
      //   console.log(this.$refs.detailNavBar.currentIndex);
      // }
      // console.log(position);
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content{
    height: calc(100% - 44px);
  }
</style>