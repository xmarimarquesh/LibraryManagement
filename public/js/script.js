function verSenha() {
    let input = document.getElementById("inpute");
    let span = document.getElementById("span");

    if(input.type == "text"){
        input.type = "password";
        span.innerHTML = "visibility_off";
    }else{
        input.type = "text";
        span.innerHTML = "visibility";
    }
}

function verSenha2() {
    let input = document.getElementById("inpute2");
    let span = document.getElementById("span2");
    
    if(input.type == "text"){
        input.type = "password";
        span.innerHTML = "visibility_off";
    }else{
        input.type = "text";
        span.innerHTML = "visibility";
    }
}

function favoritar(id) {
    let img = document.getElementById("img"+id);
    
    console.log(img.src);
    
    if(img.src == "http://localhost:3000/img/starv.png"){
        img.src = "/img/star.png";
    }else{
        img.src = "/img/starv.png";
    }
    
    var form = document.getElementById('favoritosForm' + id);
    form.submit();
}

function pesquisar() {
    var form = document.getElementById('pesquisarForm');
    form.submit();
}

function mudarTema() {
    let span = document.getElementById("tema");

    if(span.innerHTML == "wb_sunny"){
        span.innerHTML = "bedtime";
    }else{
        span.innerHTML = "wb_sunny";
    }
}

function mudarTema() {
    const body = document.body;
    const temaIcon = document.getElementById('tema');
    const isDarkMode = body.classList.toggle('dark-mode');

    // Atualiza o ícone com base no tema
    temaIcon.textContent = isDarkMode ? 'light_mode' : 'bedtime';

    // Armazena a preferência no localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Carrega o tema armazenado quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('tema').textContent = 'light_mode';
    }
});

