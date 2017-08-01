# jQuery.Eventable

*Добавляет механизм событий для объектов*.

* [Домашняя страница](https://github.com/gleb-mihalkov/jquery-eventable);

* [Документация](https://gleb-mihalkov.github.io/jquery-eventable/).

## Зависимости

* [jQuery 2+](http://jquery.com/);

* [jQuery.Class](https://github.com/gleb-mihalkov/jquery-class).

## Использование

```javascript
// Подключаем зависимости...

// Создаем класс, который будет генерировать события.
var Sender = $.Class.extend({
  
  // Добавляем миксин.
  inherits: [$.Eventable]
});

// Создает класс, обрабатывающий события.
var Target = $.Class.extend({
  
  inherits: [$.Eventable],
  
  binded: ['handler'],

  handler: function(e) {
    console.log(e.foo);
  }
});

// Добавляем обработчик события.
var sender = new Sender();
var target = new Target();

// Добавляем обработчик.
sender.on('foo', target.handler);

// Запускаем событие с дополнительными данными.
sender.trigger('foo', {foo: 'bar'});

// В консоли должно появиться "bar".
```