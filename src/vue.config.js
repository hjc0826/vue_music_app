// const path = require('path')
// 
// module.exports = {
//   // 接口请求代理 替换apis为target
//   devServer: {
//     port:8081,
//     proxy: {
//       '/apis': {
//         target :'http://localhost:3000',
//         ws: true,  
//         changeOrigin: true, 
//         pathRewrite: {
//           '^/apis': ''
//         }
//       },
//     }
//   }
// }