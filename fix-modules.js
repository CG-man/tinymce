const fs = require('fs')
const path = require('path')
const list = {
  './fix/Deltas.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/calc/Deltas.js',
  './fix/Adjustments.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/resize/Adjustments.js',
  './fix/Bars.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/resize/Bars.js',
  './fix/BarPositions.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/resize/BarPositions.js',
  './fix/ColumnSizes.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/resize/ColumnSizes.js',
  './fix/BarManager.js': './node_modules/@ephox/snooker/lib/main/ts/ephox/snooker/resize/BarManager.js'
}
Object.keys(list).forEach(fixPath => {
  fs.copyFileSync(path.resolve(__dirname, fixPath), path.resolve(__dirname, list[fixPath]))
})

