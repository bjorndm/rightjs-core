/**
 * The DOM Element unit handling
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Element = (function(old_Element) {
  
  // Element constructor options mapper
  var options_map = {
    id:      ['id',        0],
    html:    ['innerHTML', 0],
    'class': ['className', 0],
    style:   ['setStyle',  1],
    observe: ['on',        1],
    on:      ['on',        1]
  };
  
  function new_Element(tag, options) {
    var element = document.createElement(tag);
    
    if (options) {
      for (var key in options) {
        if (options_map[key]) {
          if (options_map[key][1]) element[options_map[key][0]](options[key]);
          else element[options_map[key][0]] = options[key];
        } else {
          element.set(key, options[key]);
        }
      }
    }
    
    return element;
  };
  
  
  if (Browser.IE) {
    //
    // IE browsers have a bug with checked input elements
    // and we kinda hacking the Element constructor so that
    // it affected IE browsers only
    //
    new_Element = eval('['+new_Element.toString().replace(/(\((\w+), (\w+)\) \{)/,
      '$1if($2=="input"&&$3) $2="<input name="+$3.name+ ($3.checked ? " checked" : "")+"/>";'
    )+']')[0];
  }
  
  // connecting the old Element instance to the new one for IE browsers
  if (old_Element) {
    $ext(new_Element, old_Element);
    new_Element.parent = old_Element;
  }
  
  return new_Element;
})(self.Element);


$ext(Element, {
  /**
   * registeres the methods on the custom element methods list
   * will add them to prototype and register at the Element.Methods hash
   * 
   * USAGE:
   *  Element.include({
   *    foo: function(bar) {}
   *  });
   *
   *  $(element).foo(bar);
   *
   * @param Object new methods list
   * @param Boolean flag if the method should keep the existing methods alive
   * @return Element the global Element object
   */
  include: function(methods, dont_overwrite) {
    $ext(this.Methods, methods, dont_overwrite);
    
    try { // busting up the basic element prototypes
      $ext((self.HTMLElement || this.parent).prototype, methods, dont_overwrite);
    } catch(e) {}
    
    return this;
  },
  
  Methods: {} // DO NOT Extend this object manually unless you really need it, use Element#include
});

// the old interface alias, NOTE will be nuked
Element.addMethods = Element.include;