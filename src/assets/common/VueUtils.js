export const getCookie = (name) => {
    let search = name + "="//查询检索的值
    let returnvalue = "";//返回值
    if (document.cookie.length > 0) {
        let sd = document.cookie.indexOf(search);
        if (sd != -1) {
            sd += search.length;
            let end = document.cookie.indexOf(";", sd);
            if (end == -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue = unescape(document.cookie.substring(sd, end))
        }
    }
    return returnvalue;
}

export const formatDateTime = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + m + '-' + d;
}

export default {getCookie, formatDateTime};
