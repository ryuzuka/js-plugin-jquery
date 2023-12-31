/** calendar.js *************************************************************************************************** */
;(($, $moment) => {
  let pluginName = 'calendar'

  $.fn.extend({
    calendar: function (options = {}, value) {
      let _return = null

      if (typeof options === 'string') {
        _return = $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Calendar($(el), options))
          }
        })
      }

      return options === 'get' ? _return : this
    }
  })

  class Calendar {
    constructor ($this, options) {
      this.$calendar = $this
      this.$datepicker = $this.find('input')
      this.selectedDate = ''
      this.options = {
        dateFormat: 'yy-mm-dd',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        onSelect: (date, datepicker) => {
          this.selectedDate = date
          this.$datepicker.attr('value', date)
          this.$calendar.triggerHandler({type: 'change', date, datepicker})
        }
      }
      _.extend(this.options, options)
      this.$datepicker.datepicker(this.options)
    }

    show () {
      this.$datepicker.datepicker('show')
    }

    hide () {
      this.$datepicker.datepicker('hide')
    }

    get () {
      return this.selectedDate
    }

    set (date) {
      this.selectedDate = $moment(date).format($.App.DATE_FORMAT)
      this.$datepicker.datepicker('setDate', this.selectedDate).attr('value', this.selectedDate)
    }

    clear () {
      this.$datepicker.datepicker('destroy').val('').removeAttr('value')
      this.selectedDate = ''
    }
  }
})(window.jQuery, window.moment)
/** ***************************************************************************************************************** */
