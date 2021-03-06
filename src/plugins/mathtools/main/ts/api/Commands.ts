/**
 * Commands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Tools from 'tinymce/core/api/util/Tools';
import Actions from '../core/Actions';

const register = function (editor) {
  Tools.each({
    mceEditLatex: Actions.editLatexDialog(editor)
  }, function (fn, cmd) {
    editor.addCommand(cmd, fn);
  });
};

export default {
  register
};