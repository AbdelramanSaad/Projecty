carts = localStorage.getItem("carts")
const Cart = JSON.parse(carts);

products = localStorage.getItem("products")
const product = JSON.parse(products);



function ShowProduct() {

    addproduct = document.getElementById('addproducts')
    cartcounter = document.getElementById('cartcounter')
    if (Cart != null) {
        if (cartcounter != null) {
            cartcounter.innerHTML += `<span> ${Cart.length}</span> `
        }
    }

    for (i = 0; i < product.length; i++) {
        var price = product[i][`productprice`]
        var image = product[i]['image']
        var pname = product[i]['productname']
        var productId = product[i]['productId']
        var productCategory = product[i]['productCategory']

        if (document.getElementById("addproducts") != null) {

            addproduct.innerHTML += `
     <div class="populer item" product="${productCategory}" id="popular" >
    <div class="populer_card">
        <div class="heart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
            </svg>
        </div>
    </div>
    <div class="popular_img">
        <img src="images/${image}" id="image" alt="">
    </div>
    <div class="popular_content">
        <h2 id="product">${pname}</h2>
        <h3 id="price"> ${price} L.E</h3>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <p id="productId" style="display:none;">${productId}</p>
        <button onclick="AddToCart(${productId})">Add to cart</button>
    </div>
</div>
    `
        }
    }
}

function AddToCart(id) {
    let storageProducts = product;
    let cartsid = storageProducts.filter(product => product.productId == id);

    let carts = [];
    if (localStorage.getItem('carts')) {
        carts = JSON.parse(localStorage.getItem('carts'));
    }
    carts.push({ 'productId': cartsid[0]["productId"], 'image': cartsid[0]["image"], 'productname': cartsid[0]["productname"], 'productprice': cartsid[0]["productprice"] });
    localStorage.setItem('carts', JSON.stringify(carts));

    ShowCart();
}

function ShowCart() {
    var ShowCart = document.getElementById("ShowCart")

    for (i = 0; i < Cart.length; i++) {
        var price = Cart[i][`productprice`]
        var image = Cart[i]['image']
        var pname = Cart[i]['productname']
        var productId = Cart[i]['productId']

        if (document.getElementById("ShowCart") != null) {

            ShowCart.innerHTML +=
                `<div class="products">
                 <div class="products-item">
                 <img src="images/${image}" class="products-item-img" id="image">
                 <div class="products-item-desc">
                 <h2 id="product">${pname}</h2>
                 <p id="products-description">Product Description</p>
                 <span class="price">${price}LE </span>
             </div>
             <div class="products-item-actions">
             <button onclick="removeProduct(${productId})" style="width: 30%; margin:auto; background-color:red;">Delete</button>

                 <div class="products-item-actions-count"><i class="fa-solid fa-minus"></i> <span
                         class="count-items">2</span> <i class="fa-solid fa-plus"></i>
                 </div>
             </div>
         </div>
     </div>
         
         `
        }
    }
}

function removeProduct(productId) {
    let storageProducts = Cart;
    carts = storageProducts.filter(product => product.productId !== productId);
    localStorage.setItem('carts', JSON.stringify(carts));
}

ShowProduct();
ShowCart();
