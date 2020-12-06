<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
          <detail-swiper :topImages="topImages"> </detail-swiper>
      <detail-base-info :goods="goods">{{goods}}</detail-base-info>
      <!-- <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info> -->
      </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import Scroll from 'components/common/scroll/Scroll'
import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
export default {
    name:'Detail',
    data() {
		  return {
		    iid: '',
		    topImages: [],
        goods: {
            type:Object
        },
        shop:{
            type:Object
        },
        detailInfo:{
            type:Object
        },
        paramInfo:{
            type:Object
        }
          }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo, 
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
    },
 created(){
     //1.保存传入的iid
     this.iid=this.$route.query.iid   //query方式获取id
    //  this.iid=this.$route.params.iid   //params方式获取id
     //2.根据iid请求详情数据 
     getDetail(this.iid).then((res)=>{
          //1.从res中获取顶部的图片轮播数据
          const data=res.result
     this.topImages=data.itemInfo.topImages
          //2.获取商品信息  商品对象
         this.goods= new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          //3.创建店铺信息
          this.shop=new Shop(data.shopInfo);
          //4.获取商品详细信息
          this.detailInfo=data.detailInfo
          //5.获取参数信息
          this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
     })
 },
 methods:{
     imageLoad(){
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
       background-color: #fff;
       height: calc(100%-44px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>