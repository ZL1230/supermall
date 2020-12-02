module.exports={
    configureWebpack:{
        resolve:{
            extensions:[],
            alias:{  //别名的配置
                // '@':'src'// 内部默认配置
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}