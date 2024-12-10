let user = {

};

function newUser(police, surname, name, lastname, password) {
    user[police] = {
        'surname': surname,
        'name': name,
        'lastname': lastname,
        'password': password,
        'documents': []
    };
}