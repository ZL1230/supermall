<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
   @tabClick="tabClick" 
  ref="tabControl1"
 :class="tab-control" v-show="isTabFixed"
  ></tab-control>
   <scroll class="content"
    ref="scroll"
     :probe-type="3"
      @scroll="contentScroll"
       :pull-up-load="true"
       :data="showGoods"
        @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
  <home-recommend-view :recommends='recommends'></home-recommend-view>
  <feature-view></feature-view>
  <tab-control :titles="['流行','新款','精选']" 
   @tabClick="tabClick" 
  ref="tabControl2"
 
  ></tab-control>
  <goods-list :goods="goods[currentType].list"></goods-list>
   </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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

//导入防抖函数
import {debounce} from "common/utils"


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
     isShowBackTop:false,
     tabOffsetTop:0,
     isTabFixed:false,
     saveY:0
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
 computed: {
		  showGoods() {
		    return this.goods[this.currentType].list
      }
    },
    destroyde(){
      console.log("home destroyed");
    },
    activated(){
      // 再次进来时设置Y值
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
    },
    // 保存离开时的Y值
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()
    },
created(){
//1.请求多个数据
  this.getHomeMultidata()
  //2.请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
mounted(){
   // this.$refs.scroll.refresh()  防抖动
    const refresh=debounce(this.$refs.scroll.refresh,200)
   //1.监听item图片加载完成  //事件总线
  this.$bus.$on('itemImageLoad',()=>{
    // console.log("-------------")
   refresh()
  })

  //2.获取tabControl的offsetTop
  // 所有的组件都有一个属性 $el 用于获取组件中的元素

},
methods:{
  // 事件监听相关的方法
   backClick(){
     this.$refs.scroll.scrollTo(0, 0, 300)

  },
  contentScroll(position){
    //1 判断backtop是否显示
    this.isShowBackTop=(-position.y)>1000
    //2.决定tabcontrol是否吸顶  position：fixed
  this.isTabFixed=(-position.y)>this.tabOffsetTop
  },
 loadMore(){
   this.getHomeGoods(this.currentType)
 },  
 swiperImageLoad(){
   //需要组件的offsettop 才能吸顶
   this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
 },
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
    this.$refs.tabControl1.currentIndex=index
    this.$refs.tabControl2.currentIndex=index
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
       //完成了上拉加载更多
       this.$refs.scroll.finishPullUp()
  })
  },
}
}
</script>

<style scoped>
#home {
  position: relative;
/* padding-top: 44px; */
height: 100vh;
/* padding-bottom: 1000px; */
}
 .home-nav{
   background-color: var(--color-tint);
   color: white;

  
  
 }
  .content{
 height: 300px;
  /* overflow: hidden;  */
   position: absolute;
 top: 44px;
 bottom: 49px;
 left: 0;
right: 0;
 }    
.tab-control{
 position: relative;
 z-index: 9;
}
  /* 浏览器原生滚动时使用  为了让导航不跟随一起滚动*/
 /* .fixed{
   position: fixed;
   left: 0;
   right: 0;
   top: 44px;
 } */
</style>