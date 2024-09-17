// Adicionar foto

let photo = document.getElementById('imgFoto');
let file = document.getElementById('flImage');

// Add Livro
photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {
    // Sem essa verificação, ele irá dar erro quando o usuário clicar em cancelar
    
    // pois enviará uma "imagem" vazia
    if (file.files.length == 0) {
        return;
    }
    
    // Inicializando a função que pega o caminho da imagem
    let reader = new FileReader();
    
    // Está pegando o caminho da imagem
    reader.readAsDataURL(file.files[0]);
    
    // Coloca o caminho da imagem no Source da tag IMG
    reader.onload = () => {
        photo.src = reader.result
    }
});


// Editar foto
let photoup = document.getElementById('upFoto');
let fileup = document.getElementById('upflImage');

// Add Livro
photoup.addEventListener('click', () => {
    fileup.click();
});

fileup.addEventListener('change', () => {
    // Sem essa verificação, ele irá dar erro quando o usuário clicar em cancelar
    
    // pois enviará uma "imagem" vazia
    if (fileup.files.length == 0) {
        return;
    }
    
    // Inicializando a função que pega o caminho da imagem
    let reader = new FileReader();
    
    // Está pegando o caminho da imagem
    reader.readAsDataURL(fileup.files[0]);
    
    // Coloca o caminho da imagem no Source da tag IMG
    reader.onload = () => {
        photoup.src = reader.result
    }
});


var countadd = 1;
var countup = 2;

function adcgenero() {
    countadd += 1;

    const generoFields = document.getElementById('generoFields');
    const copy = document.getElementById('genero').innerHTML;
    const select = document.createElement('select');
    select.className = 'form-select genero'; 
    select.name = 'genero'; 
    select.innerHTML = copy;

    generoFields.appendChild(select);
}

function adcgeneroUpdate() {
    countup += 1;

    const generoUpdateContainer = document.getElementById('generoUpdateContainer');

    const newGeneroUpdate = document.createElement('div');
    newGeneroUpdate.className = 'generoUpdate';
    
    const select = document.createElement('select');
    select.className = 'form-select generoUp'; 
    select.name = 'genero'; 
    select.innerHTML = document.getElementById('generoUp').innerHTML;
    
    const deleteButton = document.createElement('span');
    deleteButton.className = 'material-symbols-outlined apagarGender'
    deleteButton.textContent = 'delete'
    deleteButton.onclick = function() {
        deleteGenero(this);
    };
    
    newGeneroUpdate.appendChild(select);
    newGeneroUpdate.appendChild(deleteButton);
    generoUpdateContainer.appendChild(newGeneroUpdate);
}

function deleteGenero(button) {
    const generoUpdate = button.parentElement;
    generoUpdate.remove();
}

function ClickUpdateLivro(id_Updated) {
    
    let form = document.getElementById('Updatelivro');

    let foto = document.getElementById(`livroFoto${id_Updated}`).src;
    let titulo = document.getElementById(`livroTitulo${id_Updated}`).innerHTML;
    let desc = document.getElementById(`livroDesc${id_Updated}`).innerHTML;
    let autor = document.getElementById(`livroAutor${id_Updated}`).innerHTML;
    let ano = document.getElementById(`livroAno${id_Updated}`).innerHTML;
    let isbn = document.getElementById(`livroIsbn${id_Updated}`).innerHTML;
    let destaque = document.getElementById(`destaque${id_Updated}`).innerHTML;
    let genero = document.getElementsByClassName(`livroGenero${id_Updated}`)

    document.getElementById('upFoto').src = foto;
    document.getElementById('updateTitulo').value = titulo;
    document.getElementById('updateAno').value = ano.substring(5);
    document.getElementById('updateAutor').value = autor.substring(7);
    document.getElementById('updateDesc').value = desc.substring(11);
    document.getElementById('UpdateIsbn').value = isbn.substring(6);
    
    for (let i = 0; i < genero.length; i++) {
        
        let gen = document.getElementById(`UpdateGenero${genero[i].innerHTML}`)
        gen.selected = true;

        if (i+1 < genero.length) {
            
            adcgeneroUpdate();
        }
    }

    if (destaque.trim() == "0") {
        document.getElementById('nao').checked = true;
        document.getElementById('sim').checked = false;
    } else {
        document.getElementById('sim').checked = true;
        document.getElementById('nao').checked = false;
    }

    form.action = `/UpdateLivro/${id_Updated}`;
}

function ClickDeleteLivro(id_Delete){
    
    let button = document.getElementById('delLivro');
    
    button.href = `/DeleteLivro/${id_Delete}`;
}

