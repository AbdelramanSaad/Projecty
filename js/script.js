let out_btn = document.getElementById('out-btn'); // back to login and reset data 
let login_btn = document.getElementById('login-btn'); //
let register_btn = document.getElementById('regeister-btn');
let user_email = document.getElementById('user-email');
let cartcounter = document.getElementById('cartcounter')
let cat = document.getElementById('cat');
let ho = document.getElementById('ho');
let ab = document.getElementById('ab');
let car = document.getElementById('car');
let co = document.getElementById('co');
let admin = document.getElementById('admin');
let checkpayment = document.getElementById("checkPayment")
let admin_show = document.getElementById('admin_show');
// let populer = document.getElementById("first")

var carts = localStorage.getItem("carts")
const Cart = JSON.parse(carts);

products = localStorage.getItem("products")
const product = JSON.parse(products);


var x = location.search;
var y = Number(x.split("=")[1]);

var login_users = JSON.parse(localStorage.getItem('AddUsers'));

// check existing users
if (y >= 0) {
    login_btn.style.display = "none";
    register_btn.style.display = "none";
    out_btn.style.display = "block";
    user_email.style.display = "block";
    user_email.innerHTML = login_users[y].email;
}
//  transation between pages 
admin_show.addEventListener("click", function () {
    admin_show.href = "users.html" + x;
    user_email.style.display = "block";
    user_email.innerHTML = login_users[y].email;
})

function stay(value) {
    cat.href = "category.html" + x;
    ho.href = "index.html" + x;
    car.href = "cart.html" + x;
    checkpayment.href = "checkout.html" + x;


    return function () {
        if (value >= 0) {
            login_btn.style.display = "none";
            register_btn.style.display = "none";
            out_btn.style.display = "block";
            user_email.style.display = "block";
            user_email.innerHTML = login_users[value].email;
        }
    }
}
//  move divs at home to category
function move(value) {
    window.location.href = "category.html" + x;
}
// check payment access  in checkout page
function tran(y) {
    window.location.href = "checkout.html?num=" + y;
    return function () {
        if (value >= 0) {
            login_btn.style.display = "none";
            register_btn.style.display = "none";
            out_btn.style.display = "block";
            user_email.style.display = "block";
            user_email.innerHTML = login_users[value].email;
        }
    }
}
// for clear cart data and log out
out_btn.addEventListener("click", function () {

    carts = [];
    localStorage.setItem('carts', JSON.stringify(carts));
    // localStorage.removeItem("carts")
    setTimeout(() => {
        location.href = "register.html";
    }, 1500);

})



function ShowProduct() {
    addproduct = document.getElementById('addproducts')
    cartcounter = document.getElementById('cartcounter')

    if (Cart != null) {
        if (cartcounter != null) {
            cartcounter.innerHTML += `<span> ${Cart.length}</span> `
        }
    }

    if (document.getElementById("addproducts") != null) {
        for (i = 0; i < product.length; i++) {
            var price = product[i][`productprice`]
            var image = product[i]['image']
            var pname = product[i]['productname']
            var productId = product[i]['productId']
            var productCategory = product[i]['productCategory']

            addproduct.innerHTML += `
<div class="col-md-4 col-lg-3 shadow my-4 item" product="${productCategory}">
 <div class="card p-2">
    <img src="images/${image}" class="card-img-top popular_img" height="300px" alt="...">
    <div class="card-body m-0 p-0 popular_content text-center">
        <h2 class="card-title">${pname}</h2>
        <h3 class="card-text">${price} L.E</h3>
        <div class="text-center">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <br>
            <p id="productId" style="display:none;">${productId}</p>
            <a  onClick="window.location.reload();"> <button class="btn btn-success add-to-cart" onclick="AddToCart(${productId})">Add to cart</button></a>
        </div>
    </div>
  </div>
</div>

    `
        }
    }

    // filter  products     by category 
    let list = document.querySelectorAll('.list');
    let item = document.querySelectorAll('.item');
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', () => {
            // button clicked active category
            for (let j = 0; j < list.length; j++) {
                list[j].classList.remove('active')
                console.log(list[j]);
            }
            // add selected item to category
            list[i].classList.add('active')
            let myList = list[i].getAttribute('my-list')
            console.log(myList);
            // add all items inside category
            for (let h = 0; h < item.length; h++) {
                item[h].classList.add('hide')
                let product = item[h].getAttribute('product')
                console.log(item[h]);
                if (myList == product) {
                    item[h].classList.remove('hide')
                }
            }
        })
    }
}

function AddToCart(id) {
    let storageProducts = product;
    let cartsid = storageProducts.filter(product => product.productId == id);
    let carts = [];
    if (localStorage.getItem('carts')) {
        carts = JSON.parse(localStorage.getItem('carts'));
    }
    carts.push({ 'productId': cartsid[0]["productId"], 'image': cartsid[0]["image"], 'productname': cartsid[0]["productname"], 'productprice': cartsid[0]["productprice"], 'count': 1 });
    localStorage.setItem('carts', JSON.stringify(carts));
}

function ShowCart() {
    var ShowCart = document.getElementById("ShowCart")
    var checkout = document.getElementById("checkout")

    if (Cart != null) {
        for (i = 0; i < Cart.length; i++) {
            var price = Cart[i][`productprice`]
            var image = Cart[i]['image']
            var pname = Cart[i]['productname']
            var productId = Cart[i]['productId']
            var productcount = Cart[i]['count']

            if (document.getElementById("ShowCart") != null) {

                ShowCart.innerHTML +=
                    `<div class="col-12 col-lg-12 m-3 w-75 text-center">
        <div class="card w-100">
            <img src="images/${image}" id="image">
            <div class="m-3">
                <h2 id="product">${pname}</h2>
                <p id="products-description">Product Description</p>
                <span>${price}LE </span>
            </div>
            <div class="text-center p-3">
               <div>
                 <a onClick="window.location.reload();"><button class="btn border" onclick="minProduct(${productId})"> <i class="fa-solid fa-minus"></i></button></a>
                 <span>${productcount}</span> 
                 <a onClick="window.location.reload();"> <button class="btn border"  onclick="plusProduct(${productId})"><i class="fa-solid fa-plus"></i></button></a>
               </div>
              <a onClick="window.location.reload();"><button onclick="removeProduct(${productId})" class="btn btn-danger m-3">Delete</button></a>
            </div>
        </div>
     </div>
         `}
        }
        var Total = 0;
        for (i = 0; i < Cart.length; i++) {
            var price = Cart[i][`productprice`]
            var image = Cart[i]['image']
            var pname = Cart[i]['productname']
            var productId = Cart[i]['productId']
            var productcount = Cart[i]['count']
            var total = Cart[i][`productprice`] * Cart[i]['count'];
            Total += Number(total)

            if (document.getElementById("ShowCart") != null) {
                checkout.innerHTML += `
                <div class="m-3 shadow p-3">
            <h4  style="color:hsl(202deg 100% 20%)"> Product No ` + Number(i + 1) + ` </h4>
            <p>Product name: ${pname}</p>
            <p>Qty: ${productcount}</p>
            <p>total price: ${total} </p>
            <p>Total: ${Total} </p>
            </div>
       `
            }
        }
    }
}

function removeProduct(productId) {
    let storageProducts = Cart;
    carts = storageProducts.filter(product => product.productId !== productId);
    localStorage.setItem('carts', JSON.stringify(carts));
}

function plusProduct(id) {

    var items = JSON.parse(localStorage.getItem('carts'))
    var item = items.find(product => product.productId == id);
    console.log(item.count + 1);
    if (item) {
        item.count += 1;
        console.log(item);
    } else {
        items.push({
            productname,
            count,
            productprice
        })
    }
    localStorage.setItem('carts', JSON.stringify(items));
}

function minProduct(id) {
    var items = JSON.parse(localStorage.getItem('carts'))
    var item = items.find(product => product.productId == id);
    if (item.count == 1) {
        item = 1
    } else {
        if (item) {
            item.count -= 1;
            console.log(item);
        } else {
            items.push({
                productname,
                count,
                productprice
            })
        }
    }
    localStorage.setItem('carts', JSON.stringify(items));
}

function ShowCheckout() {
    var finalcheckout = document.getElementById("finalcheckout")

    var Total = 0;
    for (i = 0; i < Cart.length; i++) {
        var price = Cart[i][`productprice`]
        var image = Cart[i]['image']
        var pname = Cart[i]['productname']
        var productId = Cart[i]['productId']
        var productcount = Cart[i]['count']
        var total = Cart[i][`productprice`] * Cart[i]['count'];
        Total += Number(total)
        if (finalcheckout != null) {
            finalcheckout.innerHTML += `
            <div class="m-3 shadow p-3">
             <h4 style="color:hsl(202deg 100% 20%)"> Product No ` + Number(i + 1) + ` </h4>
             <p>Product name: ${pname}</p>
             <p>Qty: ${productcount}</p>
             <p>Total Item price: ${total} </p>
             <p>Total Price: ${Total} </p>
            </div>
   `
        }
    }
}

function chechout() {
    carts = [];
    localStorage.setItem('carts', JSON.stringify(carts));
    alert("Your Order was done succesfully")
    localStorage.removeItem("carts")
    // window.location.reload()
    setTimeout(() => {
        location.href = "index.html" + x;
    }, 1000);
    setTimeout()

}

ShowCart();
ShowProduct();
ShowCheckout()



//  button admin to dash board 
if (login_users[y] != null) {
    if (login_users[y].role == "admin") {
        admin.style.display = "block";
    }
}




// function home(cat) {
//     let list = cat
//     let elec = []

//     let storageProducts = product;
//     item = storageProducts.filter(product => product.productCategory == list);
//     console.log(item);
//     localStorage.setItem('items', JSON.stringify(item));
// }