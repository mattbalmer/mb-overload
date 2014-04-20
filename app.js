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


console.log( ' -- ' );

console.log( db.find(function(document) {
    if(document.lastName == 'Smith') return document;
}) );
