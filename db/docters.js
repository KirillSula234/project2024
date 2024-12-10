let docter = {};

function newDoc(police, surname, name, lastname) {
    docter[police] = {
        surname: surname,
        name: name,
        lastname: lastname,
        special: '',
        photo: '',
        imgs: [],
        posts: []
    };
}