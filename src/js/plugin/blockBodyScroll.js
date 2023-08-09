/** blockBodyScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null

  $.extend({
    blockBodyScroll: function (isBlock) {
      _plugin = _plugin || new BlockBodyScroll()
      _plugin.block(isBlock)

      return _plugin
    }
  })

  class BlockBodyScroll {
    constructor () {
      this.isBlock = false
    }

    block (isBlock) {
      if (this.isBlock === isBlock) return
      this.isBlock = isBlock

      document.body.classList[isBlock ? 'add' : 'remove']('block-body-scroll')
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
