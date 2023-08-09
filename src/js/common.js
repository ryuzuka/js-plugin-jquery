/** common.js ******************************************************************************************************** */
;(($, _) => {
  let Header = (_depth1Index, _depth2Index) => {
    let _this = {}
    return _this
  }

  let Footer = () => {
    let _this = {}
    return _this
  }

  let components = (() => {
    return {
    }
  })()

  /** document ready */
  $(() => {
    $.App.Header = Header($.App.depth1Index, $.App.depth2Index)
    $.App.Footer = Footer()
    for (let component in components) {
      $.App[component] = components[component]()
    }
  })
})(window.jQuery, window._)
/** ***************************************************************************************************************** */
