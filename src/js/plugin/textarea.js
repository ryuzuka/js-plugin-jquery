/** textarea.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'textarea'

  $.fn.extend({
    textarea: function (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Textarea($(el), options))
          }
        })
      }
      return this
    }
  })

  class Textarea {
    constructor ($this, options) {
      this.$textarea = $this.find('textarea')
      this.$current = $this.find('.current-length')
      this.$total = $this.find('.total-length')
      this.value = $this.find('textarea').val() || ''
      this.maxlength = parseInt(this.$textarea.attr('maxlength'))

      this.init()
    }

    init () {
      this.$current.text(this.value.length)
      this.$total.text($.utils.numberFormat.comma(this.maxlength))

      this.$textarea.on('keydown keyup', e => {
        let value = e.target.value

        this.value = value
        this.$current.text($.utils.numberFormat.comma(value.length))
        if (this.value.length > this.maxlength) {
          this.$textarea.addClass('error')
        } else {
          this.$textarea.removeClass('error')
        }
      })
    }

    clear () {
      this.$current.text(0)
      this.$total.text(0)
      this.value = ''
      this.maxlength = 0
      this.$textarea.off()
    }
  }
})(window.jQuery)
/** ****************************************************************************************************************** */
