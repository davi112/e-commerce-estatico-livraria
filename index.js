/*Codigo pode melhorar muito, mas esta razoavelmente funcional dentro do que foi passado na disciplina*/

/*Variavel global, utilizada no metodo de busca*/
var previous_search_size = 0;

/*Retorna os produtos e constroi o html com os valores*/
window.onload = () => {
    retrieve_products();
    retrieve_categories();
    window.document.getElementById('filter-button').addEventListener('click', filter_by_category)
    window.document.getElementById('remove-button').addEventListener('click', remove_filter)
    window.document.getElementById('search').addEventListener('input', search_items)
    window.document.getElementById('btn-search').addEventListener('click', search_items)
}

/*Retornando todos os produtos e construindo o html com os valores
.then(function(res){
    res.json()
})*/

function retrieve_products() {
    fetch('http://diwserver.vps.webdock.cloud:8765/products?limit=9')
        .then(res => res.json())
        .then(data => {
            productCards = '';
            mostViewedProducts = '';
            for (let i = 0; i < data.products.length; i++) {
                let produto = data.products[i];

                productCards +=
                    `<div class="p-card card col-lg-3 col-md-4 col-xs-12">
                        <img src=${produto.image} alt="">
                        <a class="d-block" href="detalhe.html?id=${produto.id}/">Detalhes do Produto</a>
                        <p class="category">${produto.category}</p>
                        <p class="book-tag">${produto.title}</p>
                        <p class="price-tag">R$:${produto.price}</p>
                    </div>`
                
                mostViewedProducts += `
                    <div class="destaque">
                        <img src="${produto.image}" alt="">
                        <a href="detalhe.html?id=${produto.id}">Descrição</a>
                        <p>$:${produto.price}</p>
					</div>`

                if (i == 2) {
                    productCards = set_products_per_row("row1", productCards)
                } else if (i == 5) {
                    productCards = set_products_per_row("row2", productCards)
                } else if (i == 8) {
                    productCards = set_products_per_row("row3", productCards)
                }
            }
            document.getElementById('most-viewed-container').innerHTML = mostViewedProducts;
        });
}

/*Define em qual linha do boostrap entrara cada produto*/
function set_products_per_row(rowId, cards) {
    document.getElementById(rowId).innerHTML = cards;
    cards = ''
    return cards
}

/*Filtra os produtos pela categoria, desabilitando os botoes quando necessario*/
function filter_by_category() {
    window.document.getElementById('remove-button').style.display = 'inline-block';
    searchButton = window.document.getElementById('filter-button');
    searchButton.disabled = true;
    searchButton.style.opacity = 0.3;

    categoryCombo = window.document.getElementById('select-category');
    categoryCombo.disabled = true;

    var selectedCategory = categoryCombo.value;
    var productCards = window.document.getElementsByClassName('card');

    for (let i = 0; i < productCards.length; i++) {
        var produto = productCards[i];
        var categoria = produto.getElementsByClassName('category').item(0).textContent;

        if (categoria != selected_category) {
            produto.style.display = "none";
        }
    }
}

/*Remove todos os filtros de categoria*/
function remove_filter() {
    var product_cards = window.document.getElementsByClassName('card');
    window.document.getElementById('select-category').disabled = false;

    for (let i = 0; i < product_cards.length; i++) {
        product_cards[i].style.display = 'flex';
    }
    alert('Filtro removido');
    window.document.getElementById('remove-button').style.display = 'none';
    search_button.disabled = false;
    search_button.style.opacity = 1;
}

/*Retorna todas as categorias e constroi html com os valores*/
function retrieve_categories() {
    window.document.getElementById('remove-button').style.display = 'none';
    fetch('http://diwserver.vps.webdock.cloud:8765/products/categories')
        .then(res => res.json())
        .then(categorias => {
            select_category = window.document.getElementById('select-category');
            for (let i = 0; i < categorias.length; i++) {
                option = new Option(categorias[i], categorias[i]);
                select_category.options.add(option);
            }
        })
}

/*busca os itens, tanto pelo botao de pesquisa no header quanto em cada letra digitada do input*/
function search_items() {
    var product_cards = window.document.getElementsByClassName('card');
    var input_search = window.document.getElementById('search').value;
    var current_search_size = input_search.length;
  
    for (let i = 0; i < product_cards.length; i++) {
        var produto = product_cards[i];
        produto.style.display = "flex";

        let text_for_search = produto.getElementsByClassName('book-tag').item(0).textContent;
        text_for_search += produto.getElementsByClassName('price-tag').item(0).textContent;
        text_for_search = text_for_search.toLowerCase();
        
        if(input_search == '' || (current_search_size < previous_search_size && text_for_search.includes(input_search))){
            produto.style.display = "flex";
        }else if(!text_for_search.includes(input_search.toLowerCase())){
            previous_search_size = current_search_size;
            produto.style.display = "none";
        }
    } 
}