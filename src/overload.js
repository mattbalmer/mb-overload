(function() {
    // === Helpers ===
    function parseArgTypes(argTypes) {
        return argTypes.split(',').map(function(type) {
            return {
                type: type.replace(/\[/g, '').replace(/\]/g, '').trim(),
                optional: type.indexOf(']') > -1
            };
        });
    }
    function argTypesMatch(a, b) {
        for(var i in a) {
            var expected = a[i];

            if(!expected.optional && i >= b.length) {
                return false;
            }

            return expected.type == typeof b[i];
        }

        if(a.length == b.length) return true;
    }

    // === Core ===
    var overloadable = function(defaultFunc) {
        var func = function() {
            var funcs = func.funcs;

            for(var k in funcs) {
                if( !funcs.hasOwnProperty(k) ) continue;
                var fn = funcs[k];

                if( fn
                    && argTypesMatch(fn.types, arguments)
                    && typeof fn.fn == 'function' ) {
                    return fn.fn.apply(this, arguments)
                }
            }

            return func.defaultFunc.apply(this, arguments)
        };
        func.funcs = [];

        func.defaultFunc = defaultFunc;

        func.overload = function(argTypes, fn) {
             return overload.call(null, this, argTypes, fn);
        };

        return func;
    };

    var overload = function(source, argTypes, fn) {
        if(!source.funcs) {
            source = overloadable(source);
        }

        if(argTypes && fn) {
            source.funcs.push({
                types: parseArgTypes(argTypes),
                fn: fn
            });
        }

        return source;
    };

    // === Export ===
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = overload;
    }
    else {
        window.mb = window.mb || {};
        window.mb.overload = overload;
    }
}());