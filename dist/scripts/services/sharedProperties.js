angular.module('airplayABC')
    .service('sharedProperties', function () {
        
        var properties = {
            "foo": "bar"
        };

        return {
            getProperty: function (str) {
                return properties[str];
            },
            setProperty: function(str,value) {
                properties[str] = value;
            }
        };
    });