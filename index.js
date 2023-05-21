window.onload = retrieve_products(), retrieve_categories();
window.document.getElementById('search-button').addEventListener('click', filterByCategory)
window.document.getElementById('remove-button').addEventListener('click', removeFilter)

function retrieve_products(){
     fetch('https://fakestoreapi.com/products?limit=9')
    .then(res => res.json())
    .then(data => {
        product_cards = '';
        for (let i = 0; i < data.length; i++){
            let produto = data[i];

            product_cards +=
            `<div class="p-card card col-lg-3 col-md-4 col-xs-12">
                <img src=${produto.image} alt="">
                <a class="d-block" href="detalhe.html?id=${produto.id}/">Detalhes do Produto</a>
                <p class="category">${produto.category}</p>
                <p class="book-tag">${produto.title}</p>
                <p class="price-tag">R$:${produto.price}</p>
            </div>`

            if(i == 2){
               product_cards = setProductsPerRow("row1", product_cards)
            }else if(i == 5){
               product_cards = setProductsPerRow("row2", product_cards)
            }else if(i == 8){
               product_cards =  setProductsPerRow("row3", product_cards)
            }
        }
    });
}

function setProductsPerRow(rowId, cards){
    document.getElementById(rowId).innerHTML = cards;
    cards = ''
    return cards
}

function filterByCategory(){
    window.document.getElementById('remove-button').style.display='inline-block';
    search_button = window.document.getElementById('search-button');
    search_button.disabled = true;
    search_button.style.opacity = 0.3;

    var selected_category = window.document.getElementById('select-category').value;
    var product_cards = window.document.getElementsByClassName('card');

    for(let i = 0; i < product_cards.length; i++){
        var produto = product_cards[i];
        var categoria = produto.getElementsByClassName('category').item(0).textContent;

        if(categoria != selected_category){
            produto.style.display="none";
        }
    }
}

function removeFilter(){
    var product_cards = window.document.getElementsByClassName('card');

    for(let i = 0; i < product_cards.length; i++){
        product_cards[i].style.display = 'flex';
    }
    alert('Filtro removido');
    window.document.getElementById('remove-button').style.display='none';
    search_button.disabled = false;
    search_button.style.opacity = 1;
}

function retrieve_categories(){
    window.document.getElementById('remove-button').style.display='none';
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categorias => {
        select_category = window.document.getElementById('select-category');
        for (let i = 0; i < categorias.length; i++){
            option = new Option(categorias[i], categorias[i]);
            select_category.options.add(option);
        }
    })
}

/*function defineCategoryColor(produto){
    bg_color = ''
    if(produto.category == 'jewlery'){
        return yellow
    }
}*/