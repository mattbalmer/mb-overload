// === DataBase
DataBase = function(collection) {
    this.collection = Array.isArray(collection) ? collection : [];
};

DataBase.prototype.find = function() {
    console.log(this.collection)
    return this.collection;
};

DataBase.prototype.overload('find', 'string [, number]', function(firstName, limit) {
    var count = 0;
    return this.collection.filter(function(document) {
        if(limit && count >= limit) return;

        if(document.firstName == firstName) {
            count++;
            return document;
        }
    });
});

//DataBase.prototype.overload('find', 'function', function(filter) {
//    return this.collection.filter(filter);
//});

// === User

User = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

User.toString = function() {
    return this.firstName + ' ' + this.lastName;
}
User.valueOf = function() {
    return this.firstName + ' ' + this.lastName;
}

// ===== USAGE =====


var db = new DataBase([
    new User('Bob', 'Smith'),
    new User('John', 'Smith'),
    new User('David', 'Bennet'),
    new User('Bob', 'Birch')
]);

console.log( db.find() );

console.log( ' -- ' );

console.log( db.find('Bob') );

console.log( ' -- ' );

console.log( db.find('Bob', 1) );

/*
console.log( ' -- ' );

console.log( db.find(function(document) {
    if(document.lastName == 'Smith') return document;
}) );*/
