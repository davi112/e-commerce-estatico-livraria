window.onload = () => {
    let param = new URLSearchParams(window.location.search);
    let productId = param.get("id");
    fillDetails(productId)
}

function fillDetails(productId){
    url = `https://fakestoreapi.com/products/${productId}`
    fetch(url)
    .then(res => res.json())
    .then(produto => {

        rating_icons = ''
        integerRate = Math.round(produto.rating.rate);
        for(let i = 0; i < integerRate; i++){
            rating_icons += '<i class="fa-solid fa-star"></i>'
        }

        for(let i = 0; i < 5 -  integerRate; i++){
            rating_icons += '<i class="fa-regular fa-star"></i>'
        }

        product_detail = 
        `<div>
            <img src=${produto.image} alt="imagem do produto">
        </div>
        <div>
            <h5>${produto.title}</h5>
            <p><b>Product Description: </b>${produto.description}</p>
            <p><b>Product Rate: </b>${produto.rating.rate} ${rating_icons} (${produto.rating.count})</p>
            <p><b>Product Price: </b>$ ${produto.price}</p>
            <p><b>Product Category: </b>${produto.category}</p>
        </div>`

        document.getElementById('detalhe_produto').innerHTML = product_detail;
    })
}