let hospital = [];

function newHospital(name, shortName, adress, doc) {
    hospital.push({
        'name': name,
        'shortName': shortName,
        'adress': adress,
        'doc': doc,
        'photo': '',
        'docters': [],
        'departments': [],
        'services': []
    });
}