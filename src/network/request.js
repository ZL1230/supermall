import axios from 'axios'
export function request(config){   // 2.Promise函数回调 省略写法
   const instance1=axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
})
   instance1.interceptors.request.use((config)=>{
       return config   
   },(err)=>{;
   });
    //响应拦截   一个参数res(结果) 另一个是err(失败)
   instance1.interceptors.response.use((res)=>{
    // console.log(res);
    return res.data   // 拦截之后页必须返回 并且res.data 只返回data数据
   },(err)=>{
    console.log(err);
   })     
//3.发送真正的网络请求 //因为instance1()本身就返回一个Promise
 return  instance1(config)   //因为instance1()本身就返回一个Promise
}