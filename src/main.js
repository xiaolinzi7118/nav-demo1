const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);//把字符串重新变成对象
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.aliyun.com' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]

//简化链接的显示
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容（正则表达式）
}

//渲染list
const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class='close'>
                <svg class="icon">
                <use xlink:href="#icon-close"></use>
                </svg>
            </div>
         </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        //删除框框
        $li.on('click', '.close', (e) => {
            e.stopPropagation()  //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
};

render();

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashMap.push({ logo: simplifyUrl(url)[0], url: url });
    render();
})

//JS用户关闭页面之前触发事件
window.onbeforeunload = () => {
    //存到localStage里，只能存字符串
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}

let judge = false;

function keyP(e) {
    if (judge === false) {
        // const key=e.key;可以简写
        const { key } = e;
        e.stopPropagation()
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                //toLowerCase变为小写
                window.open(hashMap[i].url)
            }
        }
    }
}

$(document).on('keypress', keyP)

$('input').keydown((e) => {
    judge = true;
})

$('input').on('blur', (e) => {
    console.log(111)
    judge = false;
    console.log(judge)
})
