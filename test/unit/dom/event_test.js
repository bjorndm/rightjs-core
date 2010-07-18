/**
 * the Event unit tests
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */
var EventTest = TestCase.create({
  name: 'EventTest',
  
  testDefaultExtending: function() {
    var mock = {
      type:    'event',
      which:   44,
      keyCode: 22,
      target: {a: 'target'},
      currentTarget: {a: 'currentTarget'},
      relatedTarget: {a: 'relatedTarget'},
      pageX:   11,
      pageY:   33
    };
    
    var event = new Event(mock);
    
    this.assert(event instanceof RightJS.Event);
    this.assert(event instanceof RightJS.Wrapper);
    
    this.assertSame(mock, event._);
    
    this.assertEqual(44, event.which);
    this.assertEqual(22, event.keyCode);
    this.assertEqual(11, event.pageX);
    this.assertEqual(33, event.pageY);
    
    this.assertSame(mock.target,        event.target);
    this.assertSame(mock.currentTarget, event.currentTarget);
    this.assertSame(mock.relatedTarget, event.relatedTarget);
  },
  
  testCustomEvent: function() {
    var event = new Event('custom', {
      foo: 'foo',
      bar: 'bar'
    });
    
    this.assertInstanceOf(RightJS.Event, event);
    this.assertEqual('custom', event._.type);
    this.assertEqual('foo',    event._.foo);
    this.assertEqual('bar',    event._.bar);
  }
});