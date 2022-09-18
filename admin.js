let cat = document.getElementById('cat');
let ho = document.getElementById('ho');
let ab = document.getElementById('ab');
let car = document.getElementById('car');
let co = document.getElementById('co');
let admin_e = document.getElementById('admin_e');
let admin1 = document.getElementById('admin1');
let checkpayment = document.getElementById("checkPayment")
let create = document.getElementById('create');
let update = document.getElementById('update');
let report = document.getElementById('report');
let login_btn = document.getElementById('login-btn');
let register_btn = document.getElementById('regeister-btn');
let out_btn = document.getElementById('out-btn'); // back to login and reset data 
let user_email = document.getElementById('user-email');
let cartcounter = document.getElementById('cartcounter')

moveBack.addEventListener("click",function(){
    moveBack.href = "index.html?num=" + y;
})
report.addEventListener("click",function(){
    report.href = "users.html?num=" + y;
})
update.addEventListener("click",function(){
    update.href = "update.html?num=" + y;
})
create.addEventListener("click",function(){
    create.href = "addproduct.html?num=" + y;
})
// control.addEventListener("click",function(e){
//     control.href = "control_plan.html?num=" + y;
// })


var x = location.search;
var y = Number(x.split("=")[1]);
var login_users = JSON.parse(localStorage.getItem('AddUsers'));

user_email.style.display = "block";
user_email.innerHTML = login_users[y].email;
user_email.style.color = "white";


if (login_users[y] != null) {
    if (login_users[y].role != "admin") {
        window.location.href = 'index.htm';
    }
}




products = localStorage.getItem("products")
const product = JSON.parse(products);

users = localStorage.getItem("AddUsers")
const Users = JSON.parse(users);

if (login_users[y] != null) {
    if (login_users[y].role != "admin") {
        window.location.href = "index.html"
    }
}

function AddNewProduct() {
    var ProductImage = document.getElementById("image").value
    var ProductName = document.getElementById("product").value
    var ProductPice = document.getElementById("price").value
    var ProductCategory = document.getElementById("category").value

    productId = 1 + Math.random() * 0x10000
    productId.toString(16)

    let products = [];
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({ 'productId': productId, 'productCategory': ProductCategory, 'image': ProductImage, 'productname': ProductName, 'productprice': ProductPice });
    localStorage.setItem('products', JSON.stringify(products));
    window.confirm("Product added succesfully")
}

function ShowUpdateProduct() {
    var UpdateProduct = document.getElementById('updateProductes')
    for (i = 0; i < product.length; i++) {
        var price = product[i][`productprice`]
        var image = product[i]['image']
        var pname = product[i]['productname']
        var productId = product[i]['productId']
        var productCategory = product[i]['productCategory']

        if (UpdateProduct != null) {

            UpdateProduct.innerHTML += `<div class="card">
            <img src="images/${image}" width="200px" id="image" height="200px" style=" margin-top: 30px;">
            <label class="space">Product Image url</label>
            <input id="${image}${productId}" value="${image}"></input>
            <label class="space">Product name</label>
            <input id="${pname}${productId}" value="${pname}"> </input>
            <label class="space">Product Price</label>
            <input id="${price}${productId}" value="${price}"> </input>
            <label class="space">Product Category</label>
            <input id="${productCategory}${productId}" value="${productCategory}"> </input>
            <button type="submit" name="submit" onclick="UpdateProduct(${productId})">Update</button>

            </div>`
        }
    }
}

function UpdateProduct(id) {
    let storageProducts = product;
    let updatedProduct = storageProducts.filter(product => product.productId === id);

    var price = updatedProduct[0][`productprice`]
    var image = updatedProduct[0]['image']
    var pname = updatedProduct[0]['productname']
    var productId = updatedProduct[0]['productId']
    var productCategory = updatedProduct[0]['productCategory']

    var ProductImage = document.getElementById(`${image}${productId}`).value
    var ProductName = document.getElementById(`${pname}${productId}`).value
    var ProductPice = document.getElementById(`${price}${productId}`).value
    var ProductCategory = document.getElementById(`${productCategory}${productId}`).value


    updatedProduct[0]['image'] = ProductImage
    updatedProduct[0]['productCategory'] = ProductCategory
    updatedProduct[0]['productname'] = ProductName
    updatedProduct[0]['productprice'] = ProductPice

    localStorage.setItem('products', JSON.stringify(storageProducts));
}

function ShowUsers() {
    var updateUsers = document.getElementById("updateUsers")

    if (Users != null) {
        for (i = 0; i < Users.length; i++) {
            var email = Users[i][`email`]
            var role = Users[i]['role']
            var username = Users[i]['username']
            var userid = Users[i]['id']

            if (updateUsers != null) {
                updateUsers.innerHTML += `
            <tr>
            <td>${i + 1}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td> <input id="${userid}" value="${role}">  </input> </td>
           <td> 
           <button style="background-color: blue;margin:0; width: 100% !important;" onclick="UpdateUser(${userid})" > edit</button>
           </td>
        <td>       
            <button style="background-color: red; margin:0;width: 100% !important;" onclick="DeleteUser(${userid})"> Delete</button>
</td>
            </tr>
            `
            }
        }
    }

}

function DeleteUser(id) {
    let storageUser = Users;
    let deleteuser = storageUser.filter(Users => Users.id !== id);
    localStorage.setItem('AddUsers', JSON.stringify(deleteuser));
}

function UpdateUser(id) {
    let storageUser = Users;
    let updatedUser = storageUser.filter(Users => Users.id == id);

    var updatedrole = document.getElementById(id).value
    updatedUser[0]["role"] = updatedrole

    localStorage.setItem('AddUsers', JSON.stringify(storageUser));
}

ShowUsers()
ShowUpdateProduct()

