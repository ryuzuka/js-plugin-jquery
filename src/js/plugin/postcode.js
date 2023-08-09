/** postcode.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'postcode'

  $.fn.extend({
    postcode (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Postcode($(el), options))
          }
        })
      }
      return this
    }
  })

  class Postcode {
    constructor ($this, options) {
      this.$postcode = $this
      this.$address = this.$postcode.find('.address input')
      this.$detail = this.$postcode.find('.detail input')

      this.options = options
      this.$postcode.find('.address input, button.btn-search').on('click', () => this.search())
    }

    search () {
      const width = 400
      const height = 500

      let _this = this

      new daum.Postcode({
        oncomplete (data) {
          let address = ''
          if (data['userSelectedType'] === 'R') {
            address = data['roadAddress']
            address += data['buildingName'] ? ` (${data['buildingName']})` : ''
            // 도로명
          } else if (data['userSelectedType'] === 'J') {
            address = data['jibunAddress']
            // 지명
          }
          _this.$address.val(address).attr('value', address)
        },
        onclose (state) {
          if (state === 'COMPLETE_CLOSE') {
            _this.$detail.focus()
            _this.$postcode.triggerHandler(Object.assign({type: 'complete-close'}, {address: _this.$address.val()}), _this.$address.val())
          } else if (state === 'FORCE_CLOSE') {
            _this.$postcode.triggerHandler('force-close')
          }
        },
        width: width,
        height: height
      }).open({
        left: (window.screen.width - width) / 2,
        top: (window.screen.height - height) / 2
      })
    }
  }
})(window.jQuery)
/** ****************************************************************************************************************** */
