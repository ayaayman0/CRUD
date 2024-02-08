var proName=document.getElementById("ProductName");
var proPrice=document.getElementById("ProductPrice");
var proCat=document.getElementById("Productcat");
var proDes=document.getElementById("Productdes");
var productUrl=document.getElementById("productUrl");
var btnAddProduct=document.getElementById("btnAddProduct");

var ProductList;
var inCase = 'create';
var empty;

if (localStorage.Product !=null) {
    ProductList=JSON.parse(localStorage.Product);
}else{
    ProductList=[]
}

function addproduct(){
    if (validProductName() && validProductPrice() && validProductCategory()==true) {
        var Product={
            name: proName.value,
            price: proPrice.value,
            Catagory: proCat.value,
            description: proDes.value,
            url:productUrl.value,
        }

        if (inCase === 'create'){
            ProductList.push(Product);
            displayProduct();
        }
        else{
            ProductList[empty]=Product
            displayProduct();
            inCase = 'create'
            btnAddProduct.innerText='Add Product'
        }

        clear();
        localStorage.setItem("Product",JSON.stringify(ProductList))

    }else{
        alert("invalid input please try again")
    }
    
}

function displayProduct(){
    cartona=``;
    for (var i = 1; i < ProductList.length; i++) {
        cartona+=`<tr>
        <td>${i}</td>
        <td>${ProductList[i].name}</td>
        <td>${ProductList[i].price}</td>
        <td>${ProductList[i].Catagory}</td>
        <td>${ProductList[i].description}</td>
        <td><button type="submit" class="btn btn-outline-success" onclick="visititem(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button type="submit" class="btn btn-outline-warning" onclick="updateProduct(${i})"><i class="fa-regular fa-pen-to-square"></i> Update</button></td>
        <td><button type="submit" class="btn btn-outline-danger " onclick="deleteProd(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>`
    }
    document.getElementById("tbody").innerHTML=cartona;
}
displayProduct()

function clear(){
  proName.value=''
  proPrice.value=''
  proCat.value=''
  proDes.value=''
  productUrl.value=''
}

function visititem(index){
    window.open(ProductList[index].url);
}

function deleteProd(index){
    ProductList.splice(index,1)
    localStorage.Product = JSON.stringify(ProductList)
    displayProduct();
}

function updateProduct(index){
  proName.value=ProductList[index].name
  proPrice.value=ProductList[index].price
  proCat.value=ProductList[index].Catagory
  proDes.value=ProductList[index].description
  productUrl.value=ProductList[index].url
  btnAddProduct.innerText='Update'
  inCase = 'update'
  empty = index
  scroll({
      top:0,
      behavior:'smooth',
  })
}

function searchProduct(searchkey) {
    cartona=``;
    for (var i = 0; i < ProductList.length; i++) {
        if (ProductList[i].name.toLowerCase().includes(searchkey.toLowerCase())==true) {

            ProductList[i].newChrt=ProductList[i].name.replace(searchkey,`<span class="fw-bolder text-danger">${searchkey}</span>`)
            cartona+=`<tr>
            <td>${i}</td>
            <td>${ProductList[i].newChrt?ProductList[i].newChrt:ProductList[i].name}</td>
            <td>${ProductList[i].price}</td>
            <td>${ProductList[i].Catagory}</td>
            <td>${ProductList[i].description}</td>
            <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
            <td><button type="submit" class="btn btn-outline-danger " onclick="deleteProd(${i})">Delete</button></td>
            </tr>`
        }
    document.getElementById("tbody").innerHTML=cartona;
    }        
}

function validProductName() {
    var regex=/^[A-Z][a-z]{2,9}$/
    if (regex.test(proName.value)) {
        document.getElementById("valid-name").classList.add("d-none")
        return true
    }else{
        document.getElementById("valid-name").classList.remove("d-none")
        return false
    }
}

function validProductPrice() {
    var regex=/^[0-9]{3,6}$/
    if (regex.test(proPrice.value)) {
        document.getElementById("valid-price").classList.add("d-none")
        return true
    }else{
        document.getElementById("valid-price").classList.remove("d-none")
        return false
    }
}

function validProductCategory() {
    var category=document.getElementById("Productcat").value
    if (category=="") {
        document.getElementById("valid-cat").classList.remove("d-none")
        return false
    }else{
        document.getElementById("valid-cat").classList.add("d-none")
        return true
    }
}