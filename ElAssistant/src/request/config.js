let baseURL
if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://localhost:3000'
} else {
    baseURL = 'http://localhost:3000'
}
const serverConfig = {
    baseURL: baseURL, // 请求基础地址,可根据环境自定义
    useTokenAuthorization: false, // 是否开启 token 认证
};
export default serverConfig;