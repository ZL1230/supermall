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
  props:{
    probeType: {
		    type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
  },
    data(){
        return {
            scroll:null
        }
    },
    // computed:{
    //   scrollY(){
    //     return this.scroll.y
    //   }
    // },
mounted(){
  //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{ 
     //0和1不能监听 2能监听（不能监听惯性） 3能监听（包括惯性）
    probeType: this.probeType,
          click: true,
          pullUpLoad:this.pullUpLoad
   })
//  2.  监听滚动的位置
   this.scroll.on('scroll',(position)=>{
     this.$emit('scroll',position)
    //  console.log(this.scroll);
    this.scroll.refresh()
   })
  //  //3. 监听上拉事件
  if(this.pullUpLoad){
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  } 
  },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
   refresh(){
    //  console.log("----------");
      this.scroll && this.scroll.scrollTo && this.scroll.refresh()
   },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp() 
      },
      getScrollY(){
        return this.scroll?this.scroll.y:0
      }
    },
}
</script>

<style>
/* .wrapper{
  height: 150px;
  /* background-color: red; */
/* }  */
</style>