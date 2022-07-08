<template>
<div id="detail">
  <detail-nav-bar></detail-nav-bar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo"
                       @detailImageLoad="detailImageLoad"/>
    <detail-param-info :param-info="goodsParam"/>
    <detail-comment-info :comment-info="commentInfo"/>
    <goods-list :goods="recommends"/>
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
      console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 300)
    //
    // this.itemImgListner = () => {
    //   refresh()
    // }
    //
    // this.$bus.$on('itemImageLoad', this.itemImgListner)
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