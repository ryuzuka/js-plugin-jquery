/** increaseNumber.js ********************************************************************************************************** */
;($ => {
  $.extend({
    increaseNumber ($target, options = {}) {
      /**
       * @params	{Object}
       * 				  start: Number
       * 				  end: Number
       * 				  duration: Number
       * @event		complete
       *
       */

      $({num: Number(options.start) }).animate({num: Number(options.end)}, {
        step () {
          let num = $.utils.numberFormat.comma(Math.floor(this.num))
          writeNumber($target, num)
        },
        duration: options.duration || 2000,
        easing: options.easing || 'easeOutExpo',
        complete () {
          let num = $.utils.numberFormat.comma(Math.floor(this.num))
          writeNumber($target, num)
          $target.triggerHandler({type: 'complete'})
        }
      })

      function writeNumber ($target, num) {
        $target[0].tagName === 'INPUT' ? $target.attr('value', num.replace(/,/g, '')).val(num) : $target.text(num)
      }

      return $target
    }
  })
})(window.jQuery)
/** ****************************************************************************************************************** */
