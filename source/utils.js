
function typeOf(thing){
    var type = toString.call(thing);
    return type.substring(8, type.length -1).toLowerCase();
}

function match(a,b){
    for(var m in a){
        if(a[m] !== b[m]){
            return false;
        }
    }
    return true;
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  const debounce = (callback, time) => {
    let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        callback(...args);
      }, time);
    };
  };
  

let utils = {
    typeOf,
    uuid(){
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
    },
    throttle,
    debounce,
    getPath(key){
        if(typeof key === 'string'){
            key = key.split('/');
        }
        let query = [];
        key.map((id, i) => {
            if(i > 0){
                query.push({ id });
            }
            if(i < key.length - 1){
                query.push('children');
            }
        });
        return query;
    },
    set(target, selector, data){
        let selectorType = typeOf(selector);
        let targetType = typeOf(target);

        if(selectorType === 'array'){
            // if it's the end of the query return the new value
            if(!selector.length){
                let dataType = typeOf(data);
                // if the new value is an object 
                // merge it with existing and return
                if(dataType === 'object'){
                    return {...target, ...data};
                }
                // if the new value is a function return it's result
                if(dataType === 'function'){
                    return data(target);
                }
                // else return the new value
                return data;
            }
            let key = selector[0];
            let keyType = typeOf(key);
            if(keyType === 'array'){
                // return key.map()
            }
            if(targetType === 'object'){
                // if the current selector item is a function
                // just return what it returns;
                if(keyType === 'function'){
                    return key(target)
                }
                // if the target is an object, 
                // return a new object
                // with the new property value under 'key'
                return {
                    ...target,
                    [key]: utils.set(
                        target[key],
                        selector.slice(1),
                        data
                    ) 
                };
            }
            if(targetType === 'array'){
                
                let nextTarget;
                if(keyType === 'function'){
                    nextTarget = target.find(key);
                }
                else if(keyType === 'object'){
                    nextTarget = target.find(item => match(key, item));
                }
                let index = target.indexOf(nextTarget);
                let result = [...target];
                result[index] = utils.set(
                    nextTarget,
                    selector.slice(1),
                    data
                )
                return result;
            }
            return data;
        }
    },
    get(target, selector){
        let selectorType = typeOf(selector);
        let targetType = typeOf(target);
        if(selectorType === 'array'){
            // if it's the end of the query return the current target
            if(!selector.length){
                return target;
            }
            let key = selector[0];
            let keyType = typeOf(key);
            if(keyType === 'array'){
                // return key.map()
            }
            if(targetType === 'object'){
                // if the current selector item is a function
                // just return what it returns;
                if(keyType === 'function'){
                    return key(target)
                }
                if(keyType === 'string'){
                    return utils.get(
                        target[key],
                        selector.slice(1)
                    );
                }
            }
            if(targetType === 'array'){
                let nextTarget;
                if(keyType === 'function'){
                    nextTarget = target.find(key);
                }
                else if(keyType === 'object'){
                    nextTarget = target.find(item => match(key, item));
                }
                return utils.get(
                    nextTarget,
                    selector.slice(1)
                );
            }
        }
    }
}

export default utils;