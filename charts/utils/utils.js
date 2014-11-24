define(["./map","./field"],function(Map,fieldMap){
    var utils=function(){
    };

    /**
     * Extend an object with the members of another
     * @param {Object} a The object to be extended
     * @param {Object} b The object to add to the first one
     */
    utils.extend=function(a, b) {
        var n;
        if (!a) {
            a = {};
        }
        for (n in b) {
            a[n] = b[n];
        }
        return a;
    };

    /**
     * Deep merge two or more objects and return a third object. If the first argument is
     * true, the contents of the second object is copied into the first object.
     */
    utils.merge=function () {
        var i,
            args = arguments,
            len,
            ret = {},
            doCopy = function (copy, original) {
                var value, key;

                // An object is replacing a primitive
                if (typeof copy !== 'object') {
                    copy = {};
                }

                for (key in original) {
                    if (original.hasOwnProperty(key)) {
                        value = original[key];

                        // Copy the contents of objects, but not arrays or DOM nodes
                        if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]'&& typeof value.nodeType !== 'number') {
                            copy[key] = doCopy(copy[key] || {}, value);

                            // Primitives and arrays are copied over directly
                        } else {
                            copy[key] = original[key];
                        }
                    }
                }
                return copy;
            };

        // If first argument is true, copy into the existing object. Used in setOptions.
        if (args[0] === true) {
            ret = args[1];
            args = Array.prototype.slice.call(args, 2);
        }

        // For each argument, extend the return
        len = args.length;
        for (i = 0; i < len; i++) {
            ret = doCopy(ret, args[i]);
        }

        return ret;
    };

    /**
     * Extend a prototyped class by new members
     * @param {Object} parent
     * @param {Object} members
     */
    utils.extendClass=function(parent, members) {
        var object = function () { return undefined; };
        object.prototype = new parent();
        utils.extend(object.prototype, members);
        return object;
    };

    /**
     *获取字段显示的名称
     *@param {String} field
     */
    utils.getDisplayName=function(field){
        var name;

        name=fieldMap.get(field);

        return name?name:field;
    };

    /**
     *分组
     */
     utils.group=function(arr,keyField){
        var map=new Map();
        for (var i = 0; i < arr.length; i++) {
            if(map.containsKey(arr[i][keyField])){
                map.get(arr[i][keyField]).push(arr[i]);
            }
            else{
                map.put(arr[i][keyField],[]);
                map.get(arr[i][keyField]).push(arr[i]);
            }
            
        }
        return map;
     };
    return utils;
});