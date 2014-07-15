describe('overload', function() {

    describe('ex1', function() {
        var foo = {};

        beforeEach(function() {
            foo.bar = function() {
                return 'default';
            };

            foo.bar = mb.overload(foo.bar, 'string', function(str) {
                return 'string-' + str;
            });

            mb.overload(foo.bar, 'number', function(num) {
                return 'number-'+num;
            })
        });

        it('should do the default', function() {
            var result = foo.bar();

            expect(result).toEqual('default');
        });

        it('should do the overloaded 1', function() {
            var result = foo.bar('a string');

            expect(result).toEqual('string-a string');
        });

        it('should do the overloaded 2', function() {
            var result = foo.bar(123);

            expect(result).toEqual('number-123');
        });
    });

    describe('ex2', function() {
        var foo = {};

        beforeEach(function() {
            foo.bar = mb.overload(function() {
                return 'default';
            })
                .overload('string', function(str) {
                    return 'string-' + str;
                })
                .overload('number', function(num) {
                    return 'number-' + num;
                })
            ;
        });

        it('should do the default', function() {
            var result = foo.bar();

            expect(result).toEqual('default');
        });

        it('should do the overloaded 1', function() {
            var result = foo.bar('a string');

            expect(result).toEqual('string-a string');
        });

        it('should do the overloaded 2', function() {
            var result = foo.bar(123);

            expect(result).toEqual('number-123');
        });
    })
});