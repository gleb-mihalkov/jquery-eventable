!function($) {

  if ($ == null) {
    console.warn('jQuery is required.');
    return;
  }

  if ($.Class == null) {
    console.warn('jQuery.Class is required.');
    return;
  }

  /** @namespace $ */

  /**
   * Примесь, добавляющая классу возможность обработки событий.
   * @mixin
   */
  $.Eventable = {

    /**
     * Инициализирует объект для работы с событиями.
     * @protected
     * @return {void}
     */
    _eventable: function() {
      if (this._eventableDispatcher != null) return;

      var element = document.createElement('DIV');
      this._eventableDispatcher = $(element);
    },

    /**
     * Вызывает событие.
     * @param  {String}  type Имя события.
     * @param  {Object}  data Дополнительные поля, которые будут добавлены объекту события.
     * @return {$.Event}      Объект отработавшего события.
     */
    trigger: function(type, data) {
      this._eventable();

      var event = new $.Event(type, data);
      this._eventableDispatcher.trigger(event);

      return event;
    },

    /**
     * Добавляет обработчик события.
     * @param  {String|Object}   type Имя события или коллекция вида "имя_события": "обработчик".
     * @param  {Function}        cb   Обработчик. Если первым аргументом была передана коллекция,
     *                                этот параметр передавать не нужно.
     * @return {void}
     */
    on: function(type, cb) {
      this._eventable();

      var data = type;

      if (typeof(data) !== 'object') {
        data = {};
        data[type] = cb;
      }

      for (var type in data) {
        if (!data.hasOwnProperty(type)) continue;

        cb = data[type];
        this._eventableDispatcher.on(type, cb);
      }
    },

    /**
     * Добавляет обработчик события, который сработает только один раз, затем будет удален.
     * @param  {String}   type Имя события.
     * @param  {Function} cb   Обработчик.
     * @return {void}
     */
    one: function(type, cb) {
      this._eventable();
      this._eventableDispatcher.one(type, cb);
    },

    /**
     * Удаляет обработчик указанного события.
     * @param  {String}   type Имя события.
     * @param  {Function} cb   Обработчик события. Если не указан, то будут удалены все обработчики
     *                         события с указанным именем.
     * @return {void}
     */
    off: function(type, cb) {
      this._eventable();
      this._eventableDispatcher.off(type, cb);
    }
  };

}(window.jQuery);