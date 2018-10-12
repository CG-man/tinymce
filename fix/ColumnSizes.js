import { Arr } from '@ephox/katamari';
import { Fun } from '@ephox/katamari';
import Blocks from '../lookup/Blocks';
import Sizes from './Sizes';
import CellUtils from '../util/CellUtils';
import Util from '../util/Util';
import { Css } from '@ephox/sugar';
var getRaw = function (cell, property, getter) {
    return Css.getRaw(cell, property).fold(function () {
        return getter(cell) + 'px';
    }, function (raw) {
        return raw;
    });
};
var getRawW = function (cell) {
    return getRaw(cell, 'width', Sizes.getPixelWidth);
};
var getRawH = function (cell) {
    return getRaw(cell, 'height', Sizes.getHeight);
};
var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = Blocks.columns(warehouse);
    var backups = Arr.map(columns, function (cellOption) {
        return cellOption.map(direction.edge);
    });
    var list = []
    var preWidth = []
    return Arr.map(columns, function (cellOption, c) {
        // Only use the width of cells that have no column span (or colspan 1)
        // var columnCell = cellOption.filter(Fun.not(CellUtils.hasColspan));
        return cellOption.fold(function () {
            // Can't just read the width of a cell, so calculate.
            var deduced = Util.deduce(backups, c);
            return fallback(deduced);
        }, function (cell) {
            var pw = preWidth[c];
            if (pw) {
                return pw;
            }
            // 单元格 DOM
            var dom = cell.dom();
            if (list.indexOf(dom) !== -1) {
                return 0;
            } else {
                list.push(dom);
                 // 获取单元格合并属性
                var colspan = dom.getAttribute('colspan');
                // 有合并，直接赋值最后一个单元格的宽度
                if (colspan) {
                    var lastCellWidth = getWidth(cell, tableSize);
                    var index = parseInt(colspan, 10) + c - 1;
                    preWidth[index] = lastCellWidth;
                    return 0;
                }
            }
            return getWidth(cell, tableSize);
        });
    });
};
var getDeduced = function (deduced) {
    return deduced.map(function (d) { return d + 'px'; }).getOr('');
};
var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
};
var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, Sizes.getPercentageWidth, function (deduced) {
        return deduced.fold(function () {
            return tableSize.minCellWidth();
        }, function (cellWidth) {
            return cellWidth / tableSize.pixelWidth() * 100;
        });
    }, tableSize);
};
var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, Sizes.getPixelWidth, function (deduced) {
        // Minimum cell width when all else fails.
        return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
};
var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = Blocks.rows(warehouse);
    var backups = Arr.map(rows, function (cellOption) {
        return cellOption.map(direction.edge);
    });
    return Arr.map(rows, function (cellOption, c) {
        var rowCell = cellOption.filter(Fun.not(CellUtils.hasRowspan));
        return rowCell.fold(function () {
            var deduced = Util.deduce(backups, c);
            return fallback(deduced);
        }, function (cell) {
            return getHeight(cell);
        });
    });
};
var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, Sizes.getHeight, function (deduced) {
        return deduced.getOrThunk(CellUtils.minHeight);
    });
};
var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
};
export default {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
};
//# sourceMappingURL=ColumnSizes.js.map