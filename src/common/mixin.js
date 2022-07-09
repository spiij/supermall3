import {debounce} from "./utils";

export const itemListnerMixin = {
  data(){
    return {
      itemImgListner: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListner = () => {
      // console.log('-----');
      // this.$refs.scroll.refresh()
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListner)

    // console.log('我是混入中的内容')
  }
}