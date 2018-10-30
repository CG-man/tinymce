/**
 * TableCellSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Arr } from '@ephox/katamari';
import { Element, SelectorFilter } from '@ephox/sugar';
import * as ElementType from '../dom/ElementType';
import MultiRange from './MultiRange';

const getCellsFromRanges = function (ranges) {
  return Arr.filter(MultiRange.getSelectedNodes(ranges), ElementType.isTableCell);
};

const getCellsFromElement = function (elm) {
  const selectedCells = SelectorFilter.descendants(elm, 'td[data-mce-selected],th[data-mce-selected]');
  // 表格全选删除只删除内容不删除表格
  if (selectedCells && selectedCells.length <= 0) {
    elm.dom().querySelectorAll('td[data-mce-style]').forEach((td) => {
      td.innerText = '';
    });
  }
  return selectedCells;
};

const getCellsFromElementOrRanges = function (ranges, element) {
  const selectedCells = getCellsFromElement(element);
  const rangeCells = getCellsFromRanges(ranges);
  return selectedCells.length > 0 ? selectedCells : rangeCells;
};

const getCellsFromEditor = function (editor) {
  return getCellsFromElementOrRanges(MultiRange.getRanges(editor.selection.getSel()), Element.fromDom(editor.getBody()));
};

export default {
  getCellsFromRanges,
  getCellsFromElement,
  getCellsFromElementOrRanges,
  getCellsFromEditor
};