document.addEventListener('DOMContentLoaded', function () {
    const personList = JSON.parse(localStorage.getItem('personList')) || [];
    updatePersonList(personList);

    const form = document.querySelector('.espacoForm');


    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const age = document.getElementById('ageInput').value;
        const city = document.getElementById('cityInput').value;
        const suggestion = document.getElementById('suggestionInput').value;

        const formData = {
            name,
            email,
            age,
            city,
            suggestion
        };

        personList.push(formData);

        updatePersonList(personList);
        saveDataToLocalStorage(personList);

        form.reset();
    });

    document.getElementById('limpar').addEventListener('click', function () {
        // Limpar a lista, o localStorage e redefinir a variável personList
        personList.length = 0;
        updatePersonList(personList);
        saveDataToLocalStorage(personList);
    });

    document.getElementById('pesquisar').addEventListener('click', pesquisar);
    document.getElementById('limparPesquisa').addEventListener('click', limparPesquisa);
    
    // Filtra a lista e atualiza
    function pesquisar() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredList = personList.filter(function (person) {
            return (
                person.name.toLowerCase().includes(searchTerm) ||
                person.age.toString().includes(searchTerm)
            );
        });
        updatePersonList(filteredList);
    }

    // Limpa o campo de pesquisa e restaura a lista completa
    function limparPesquisa() {
        document.getElementById('searchInput').value = '';
        updatePersonList(personList);
    }

    function deletePerson(index) {
        personList.splice(index, 1);

        updatePersonList(personList);
        saveDataToLocalStorage(personList);
    }

    document.getElementById('limparCampos').addEventListener('click', function () {
        limparCampos();
    });

    function limparCampos() {
        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('ageInput').value = '';
        document.getElementById('cityInput').value = '';
        document.getElementById('suggestionInput').value = '';
    }

    function updatePersonList(data) {
        const personList = document.getElementById('personList');
        personList.innerHTML = '';

        data.forEach(function (person, index) {
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${person.name}, Idade: ${person.age}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function () {
                deletePerson(index);
            });

            listItem.appendChild(deleteButton);
            personList.appendChild(listItem);
        });

        // Salvar os dados atualizados no localStorage
        saveDataToLocalStorage(data);
    }

    function saveDataToLocalStorage(data) {
        localStorage.setItem('personList', JSON.stringify(data));
    }
});