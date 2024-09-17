function ClickUpdateUser(id_Updated) {
    let form = document.getElementById('UpdateUserADM');

    let nome = document.getElementById(`userNome${id_Updated}`).innerHTML;
    let cpf = document.getElementById(`userCpf${id_Updated}`).innerHTML;
    let telefone = document.getElementById(`userTel${id_Updated}`).innerHTML;
    let email = document.getElementById(`userEmail${id_Updated}`).innerHTML;
    let data = document.getElementById(`userData${id_Updated}`).innerHTML;
    let genero = document.getElementById(`userGenero${id_Updated}`).innerHTML;
    let admin = document.getElementById(`userAdmin${id_Updated}`)?.innerHTML;

    document.getElementById('updateNome').value = nome;
    document.getElementById('updateCpf').value = cpf;
    document.getElementById('updateTel').value = telefone;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateData').value = data;
    document.getElementById('updateGenero').value = genero;

    if (admin == null) {
        document.getElementById('nao').checked = true;
        document.getElementById('sim').checked = false;
        
    } else {
        document.getElementById('sim').checked = true;
        document.getElementById('nao').checked = false;
    }

    form.action = `/updateUsuarioADM/${id_Updated}`;
}

function ClickDeleteUser(id_Delete){
    
    let button = document.getElementById('delUser');
    
    button.href = `/DeleteUser/${id_Delete}`;
}