function ClickDevolucao(id_Devolucao){
    
    let button = document.getElementById('devolucao');
    
    button.href = `/Devolucao/${id_Devolucao}`;
}

function ClickUpdateEmprestimo(id_Updated) {
    let form = document.getElementById('UpdateEmprestimo');

    let isbn = document.getElementById(`empIsbn${id_Updated}`).innerHTML;
    let cpf = document.getElementById(`empCpf${id_Updated}`).innerHTML;
    let datae = document.getElementById(`empDataE${id_Updated}`).innerHTML;
    let datad = document.getElementById(`empDataD${id_Updated}`).innerHTML;
    let multa = document.getElementById(`empMulta${id_Updated}`).innerHTML;

    document.getElementById('updateISBN').value = isbn;
    document.getElementById('updateCpf').value = cpf;
    document.getElementById('updateDataE').value = datae;
    document.getElementById('updateDataD').value = datad;
    document.getElementById('updateMulta').value = multa.substring(20);


    form.action = `/UpdateEmprestimo/${id_Updated}`;
}