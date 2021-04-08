// 配置编译环境和线上环境之间的切换

let baseUrl = "";
let iconfontVersion = ["567566_pwc3oottzol", "1554719_e7pq4dckyli"];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`;
const env = process.env;

if (env.NODE_ENV == "development") {
  baseUrl = "http://admin.juchuang.voil.vip:999"; // 开发环境地址http://admin.juchuang.voil.vip:999
} else if (env.NODE_ENV == "production") {
  baseUrl = `http://admin.juchuang.voil.vip:999`; //生产环境地址
} else if (env.NODE_ENV == "test") {
  baseUrl = ``; //测试环境地址
}
//  baseUrl = `http://api.juchuangdata.com/`; //生产环境地址
export { baseUrl, iconfontUrl, iconfontVersion, codeUrl, env };
