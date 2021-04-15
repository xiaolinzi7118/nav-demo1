(function () {
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList = $('.siteList');
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi = $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li.last');
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$x = localStorage.getItem('x');
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject = JSON.parse($16b5ad875ae907e2f7f79e7b8fe116cc$var$x);
  // 把字符串重新变成对象
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap = $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject || [{
    logo: 'A',
    url: 'https://www.aliyun.com'
  }, {
    logo: 'B',
    url: 'https://www.bilibili.com'
  }];
  // 简化链接的显示
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl = url => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
  };
  // 渲染list
  const $16b5ad875ae907e2f7f79e7b8fe116cc$var$render = () => {
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li:not(.last)').remove();
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.forEach((node, index) => {
      const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${$16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(node.url)}</div>
            <div class='close'>
                <svg class="icon">
                <use xlink:href="#icon-close"></use>
                </svg>
            </div>
         </div>
        </li>`).insertBefore($16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi);
      $li.on('click', () => {
        window.open(node.url);
      });
      // 删除框框
      $li.on('click', '.close', e => {
        e.stopPropagation();
        // 阻止冒泡
        $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.splice(index, 1);
        $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
      });
    });
  };
  $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
  $('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？');
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url;
    }
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.push({
      logo: $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(url)[0],
      url: url
    });
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
  });
  // JS用户关闭页面之前触发事件
  window.onbeforeunload = () => {
    // 存到localStage里，只能存字符串
    const string = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
    localStorage.setItem('x', string);
  };
  $(document).on('keypress', e => {
    // const key=e.key;可以简写
    const {key} = e;
    for (let i = 0; i < $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.length; i++) {
      if ($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].logo.toLowerCase() === key) {
        // toLowerCase变为小写
        window.open($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].url);
      }
    }
  });
})();

//# sourceMappingURL=index.3fd9d000.js.map
