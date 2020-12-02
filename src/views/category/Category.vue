<template>
  <div class="wrapper">
    <ul class="content"><li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>14</li>
  <li>15</li>
  <li>16</li>
  <li>17</li>
  <li>18</li>
  <li>19</li>
  <li>20</li>
  <li>21</li>
  <li>22</li>
  <li>23</li>
  <li>24</li>
  <li>25</li>
  <li>26</li>
  <li>27</li>
  <li>28</li>
  <li>29</li>
  <li>30</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>14</li>
  <li>15</li>
  <li>16</li>
  <li>17</li>
  <li>18</li>
  <li>19</li>
  <li>20</li>
  <li>21</li></ul>
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
   this.scroll=new BScroll(document.querySelector('.wrapper'),{
     probeType:3, //0和1不能监听 2能监听（不能监听惯性） 3能监听（包括惯性）
     pullUpLoad:true // 上拉加载更多
   })
   // 监听滚动的位置
   this.scroll.on('scroll',(position)=>{
     console.log(position);
   })
   this.scroll.on('pullingUp',()=>{
     console.log('上拉加载更多');
    //  setTimeout(()=>{
    //    scroll.pullUpLoad()
    //  },2000)
   })
  }
}
</script>

<style>
.wrapper{
  height: 150px;
  background-color: red;
}
</style>