<template>
<!-- ref/children -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            scroll:null
        }
    },
mounted(){
      this.scroll=new BScroll(this.$refs.wrapper,{ 
     probeType:3, //0和1不能监听 2能监听（不能监听惯性） 3能监听（包括惯性）
     pullUpLoad:true, // 上拉加载更多
     click:true
   })
   this.scroll.scrollTo(0,0)
//    监听滚动的位置
//    this.scroll.on('scroll',(position)=>{
//      console.log(position);
//    })
//    this.scroll.on('pullingUp',()=>{
//      console.log('上拉加载更多');
//      setTimeout(()=>{
//        scroll.pullUpLoad()
//      },2000)
//    })
  }
}
</script>

<style>
/* .wrapper{
  height: 150px;
  /* background-color: red; */
/* }  */
</style>