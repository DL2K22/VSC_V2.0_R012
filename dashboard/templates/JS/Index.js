const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#btn_menu");
const closeBtn = document.querySelector("#fechar_btn");
const themeToggler = document.querySelector('.opcao_tema');
back = document.getElementById('back');

menuBtn.addEventListener('click', function() {
    sideMenu.style.display = 'block';
    back.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    sideMenu.style.display = 'none';
    back.style.display = 'none';
});

document.body.onresize = function(){
    if(document.body.clientWidth > 768){
        sideMenu.style.display ='block';
    }
}

themeToggler.addEventListener('click', () =>{
    document.body.classList.toggle("dark-theme-variaveis");

    themeToggler.querySelector('span:nth-child(1)').classList.toggle("active");
    themeToggler.querySelector('span:nth-child(2)').classList.toggle("active");
});

// Fill tabela
Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `                            
                        <td>${order.NomeProduto}</td>
                        <td>${order.NumeroSerie}</td>
                        <td>${order.Estilo}</td>
                        <td class="${order.Status === 'Realizado' ? 'sucesso' : order.Status === 'Pendente' ? 'atencao' : 'primary'}">${order.Status}</td>
                        <td class="principal">Detalhes</td>
                        `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});


