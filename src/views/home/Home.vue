<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <scroll class="content" ref="scroll">
      <home-swiper :banners='banners'></home-swiper>
  <home-recommend-view :recommends='recommends'></home-recommend-view>
  <feature-view></feature-view>
  <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
  <goods-list :goods="goods[currentType].list"></goods-list>
   </scroll>
  <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'  
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
  data(){
    return {
     banners:[],
     recommends:[],
     goods:{
       'pop':{page:0,list:[]},
       'new':{page:0,list:[]},
       'sell':{page:0,list:[]}
     },
     currentType:'pop',
    }
  },
components:{
  NavBar,

 HomeSwiper,
 HomeRecommendView,
 FeatureView,
 Scroll,
 BackTop,

 TabControl,
 GoodsList

},
created(){
//1.请求多个数据
  this.getHomeMultidata()
  //2.请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
methods:{
   backClick(){
     this.$refs.scroll.scroll.scrollTo(0,0,500)
  },
  // 事件监听相关的方法
  tabClick(index){
    switch(index){
      case 0:
        this.currentType='pop'
         break
      case 1:
        this.currentType='new'
         break
         case 2:
        this.currentType='sell'
         break
    }
  },
  // 网络请求相关的方法
  getHomeMultidata(){
     getHomeMultidata().then((res)=>{
    this.banners=res.data.banner.list
    this.recommends=res.data.recommend.list  //这个this是整个组件对象的this
  })
  },
  getHomeGoods(type){
        const page=this.goods[type].page+1
      getHomeGoods(type,page).then((res)=>{
      this.goods[type].list.push(...res.data.list)
       this.goods[type].page += 1
  })
  },
}
}
</script>

<style scoped>
#home {
  position: relative;
padding-top: 44px;
height: 100vh;
/* padding-bottom: 1000px; */
}
 .home-nav{
   background-color: var(--color-tint);
   color: white;
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9;
 }
 .tab-control{
   position: sticky;
   top: 44px;
    z-index: 9;
 }
 .content{
 height: 300px;
 /* overflow: hidden; */
 position: absolute;
 top: 44px;
 bottom: 49px;
 left: 0;
right: 0;
 }
</style>