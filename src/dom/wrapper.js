/**
 * The dom-wrapper main unit
 *
 * This unit is basically for the internal use
 * so that we could control the common functionality
 * among all the wrappers
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */

var Wrapper = RightJS.Wrapper = function(parent, methods) {
  
  // creating the actual wrapper class
  var Klass = function(object, options) {
    var instance = this.initialize(object, options), uid, unit;
    
    if (instance === undefined)
      instance = this;
    
    unit = instance._;
    uid  = UID_KEY in unit ? unit[UID_KEY] : (unit[UID_KEY] = UID++);
    
    return Wrappers_Cache[uid] = instance;
  };
  
  // finding the parent
  if (!methods) {
    methods = parent;
    parent  = null;
  }
  
  // hooking up the extedning tools and methods
  return $ext(Klass, Class_Methods)
    .inherit(parent || Wrapper)
    .include({_: undefined}, methods);
};