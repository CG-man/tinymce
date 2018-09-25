/**
 * SetTdStyle.js
 */
import { Editor } from 'tinymce/core/api/Editor';
import Tools from 'tinymce/core/api/util/Tools';
import {Node, HTMLTableCellElement } from '@ephox/dom-globals';
// 定义从外部传来的值的数据结构
export interface StylesMap {
  style?: string;
  width?: string;
  height?: string;
}
/**
 * @param editor
 * @param styles {style: string; classname: 需要添加的classname}
 */
const setStyle = (editor: Editor, styles: StylesMap) => {
  if (!editor || !styles) {
    return;
  }
  applyDataToElement(editor, styles);
};

const applyDataToElement = (editor: Editor, data: StylesMap) => {
  const dom = editor.dom;
  // 需要设置的dom对象
  let cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
  if (cells.length <= 0) {
    cells = editor.dom.select('td[data-mce-style],th[data-mce-style]');
  }
  function setStyle(elm: Node, name: string, value: string) {
    if (cells.length === 1 || value) {
      dom.setStyle(elm, name, value);
    }
  }
  editor.undoManager.transact(function () {
    Tools.each(cells, function (cellElm: HTMLTableCellElement) {
      // 更新样式有待优化
      const styleObj = editor.dom.parseStyle(data.style);
      Object.keys(styleObj).forEach((key) => {
        setStyle(cellElm, key, '' + styleObj[key] + '');
      });
    });
    editor.focus();
  });
};

export default {
  setStyle
};