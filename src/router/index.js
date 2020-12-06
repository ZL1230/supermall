import Vue from 'vue'
import VueRouter from 'vue-router'

// 在路由里面将各种跳转的组件导入 懒加载方式导入
const Home=()=>import('views/home/Home')
const Cart=()=>import('views/cart/Cart')
const Category=()=>import('views/category/Category')
const Profile=()=>import('views/profile/Profile')
const Detail=()=>import('views/detail/Detail')
// 1.安装插件
Vue.use(VueRouter)
//2 .创建router对象
const routes=[
    {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/cart',
        component:Cart
      },
      {
        path:'/category',
        component:Category
      }, {
        path:'/profile',
        component:Profile
      },
      {
        //1.query方式
        path:'/detail',
        //2.params方式
        // path:'/detail/:iid'
        component:Detail
      }
]
const router =new VueRouter({
routes,
mode:'history'
})
// 3.导出
export default router