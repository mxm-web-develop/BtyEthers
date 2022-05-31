import { defineConfig } from 'vitepress'
import pkg from '../../package.json'
export default defineConfig({
  title: 'BtyEthers.js',
  description: pkg.description,
  themeConfig:{
    nav:[
      {text:'使用说明',link:'/usage/'},
      {text:'模块详情',link:'/modules/'},
      {text:'关于Chain33',link:'https://chain.33.cn/'},
      {text:'关于Ethers.js', link:'https://docs.ethers.io/v5/'}
    ]
  }
})