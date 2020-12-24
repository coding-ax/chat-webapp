import { instance } from './instance'
// 从后端获取七牛云接口token
export const getQiniuToken = (token) => {
    return instance.get('/qiniutoken', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

const baseURL = 'https://img.xgpax.top/'
const apiURL = 'http://upload-z2.qiniu.com'
// selfToken:访问后端 file：要上传的文件（单个） 返回有效URL
export const file2qiniuCloud = async (selfToken, file) => {
    const data = await getQiniuToken(selfToken)
    const { key, token } = data.data;
    console.log(key, token)
    // 构造表单
    const formData = new FormData();
    formData.append('token', token);
    formData.append('key', key); // key：文件名，可以不传，如果不传七牛则会自动生成随机文件名 hash
    formData.append('file', file);
    // 上传
    const response = await instance.post(apiURL, formData);
    return baseURL + response.key
}

// 获取zoom数据
export const getZoomByPage = (token, page) => {
    return instance.get('/zoom/getData', {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params: {
            page
        }
    })
}
// 发布zoom
export const pubZoom = (token, { contentText, contentImgSrc, userID }) => {
    return instance({
        method: 'POST',
        url: '/zoom/addZoom',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            contentText,
            contentImgSrc,
            userID
        }
    })
}