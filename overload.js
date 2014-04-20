function compareArrays( arrA, arrB ) {
    if( !Array.isArray(arrA) || !Array.isArray(arrA) ) return false;

    if(arrA.length !== arrB.length) return false;

    for(var i = 0, len = arrA.length; i < len; i++) {
        if(arrA[i] !== arrB[i]) return false;
    }

    return true;
}
function getParamNames(fn) {
    var funStr = fn.toString();
    return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g) || [];
}
function getArgTypes(args) {
    args = Array.prototype.slice.call(args);
    var types = [];

    for(var i in args) {
        types.push(typeof args[i]);
    }

    return types;
}
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

// Main Func
overload = function(source, argTypes, fn) {
//    console.log(source.name);
//    console.log(source.caller);
//    console.log(arguments.callee);
//    console.log(arguments.callee.caller);

//    console.log(source);
//    console.log(argTypes);
//    console.log(fn);

    var params = getParamNames(fn);

    source.funcs.push({
        types: parseArgTypes(argTypes),
        fn: fn
    });
};

overloadable = function(defaultFunc) {
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

    return func;
};

// Assign
//Function.prototype.overload = function(argTypes, fn) {
//    console.log(DataBase.prototype)
//    console.log(this.prototype);
//    console.log(Object.getPrototypeOf(this.prototype))
//    console.log(this.name);
//    console.log(this.caller);
//    console.log(arguments.callee);
//    console.log(arguments.callee.caller);
//
//    if(!this.funcs) {
//
//    }
//    overload.call(null, this, argTypes, fn);
//};
Object.__proto__.overload = function(target, argTypes, fn) {

    if(!this.funcs) {
        this[target] = overloadable(this[target]);
    }

    overload.call(null, this[target], argTypes, fn);
};