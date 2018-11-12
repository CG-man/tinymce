/**
 * Demo.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

declare let tinymce: any;
// 实例化成功回调
const initInstanceCallback = function (editor) {
  // 表格调整行、列宽度监听
  editor.on('change', function (e) {
  });
  editor.on('objectResized', function (e) {
  });
  // 失去焦点监听
  editor.on('blur', function (e) {
    // editor.destroy();
  });
  // 注册快捷键
  // FIXME: mac下快捷键使用command也注册不上，临时先兼容windows
  editor.shortcuts.add(`ctrl+alt+z`, 'A New Way To Redo', 'Redo');
  // editor.schema.addCustomElements('pingyin');
};

// 先找到txt节点
const el = document.getElementsByClassName('tinymce')[0];
el.addEventListener('dblclick', function () {
  if (!el.editor) {
    initFn();
  }
});

const initFn = function () {
  tinymce.init({
    selector: 'div.tinymce',
    language: 'zh_CN',
    skin_url: '../../../../../js/tinymce/skins/lightgray',
    // toolbar: 'customforecolor custombackcolor',
    theme: 'inlite',
    plugins: 'image media table paste contextmenu textpattern textcolor',
    insert_toolbar: '',
    selection_toolbar: 'talfontselect talfontsizeselect | bold italic underline dotted | forecolor backcolor customforecolor custombackecolor | alignleft aligncenter alignright alignjustify  | outdent indent | example | removeformat',
    paste_data_images: true,
    paste_webkit_styles: 'color font font-size background font-family',
    inline: true,
    custom_elements: 'pinyin',
    valid_children: '+pinyin[span]',
    extended_valid_elements: 'svg[*],defs[*],path[*],g[*],use[*],text[*],rect[*],tspan[*],line[*],circle[*],ellipse[*]',
    contextmenu: 'table inserttable | pagebreak | cell row column deletetable',
    table_responsive_width: false,
    init_instance_callback: initInstanceCallback,
  }).then(function (editors) {
    document.getElementsByClassName('tinymce').editor = editors[0];
  });
};

export {};
