var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var mainBtn = document.getElementById("mainBtn")
var allProduct;
if (localStorage.getItem("allProduct") == null) {
    allProduct = [];
}else{
    allProduct = JSON.parse(localStorage.getItem("allProduct"));
    displayProducts(allProduct)
}
var addProduct = function () {
    // if ( mainBtn == "Update") {
    //     allProduct.splice(productIndex,1)
    // }else{
        
    // }
    var isValidName = valdiateProuductName()
    var isValidCateogry = valdiateProuductCategory()
    if (isValidName && isValidCateogry){
        var product = {
        name: productName.value,
        price: productPrice.value,
        catrgory: productModel.value,
        description: productDesc.value,
    };
    allProduct.push(product);
    setInLocalStorage()
    displayProducts(allProduct);
    clearForm();
    }else{
    }
};
function displayProducts(productData){
    var date = ``
    for (var i = 0; i < productData.length; i++) {
        date += `<tr>
        <td>${i+1}</td>
        <td>${productData[i].name}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].catrgory}</td>
        <td>${productData[i].description}</td>
        <td>
            <button class="btn btn-warning" onclick="getUpdate(${i})">Update</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>`;
    }
    document.getElementById("rowData").innerHTML= date;
};
function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productModel.value = '';
    productDesc.value = '';
};
function deleteProduct(index) {
    allProduct.splice(index,1)
    setInLocalStorage();  
    displayProducts(allProduct);
};
function setInLocalStorage() {
    localStorage.setItem("allProduct",JSON.stringify(allProduct))
};
function getUpdate(productIndex) {
    productName.value  = allProduct[productIndex].name;
    productPrice.value = allProduct[productIndex].price;
    productModel.value =  allProduct[productIndex].catrgory;
    productDesc.value  = allProduct[productIndex].description;
    document.getElementById("mainBtn").innerText = "Update";
};
function searchProduct(termValue) {
    var termValue = "tos"
    var matchProduct = []
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].name.toLowerCase().includes(termValue.toLowerCase())== true) {
            matchProduct.push(allProduct[i])
        }
    }
    displayProducts(matchProduct)
}
searchProduct();
function valdiateProuductName() {
    var regex = /^[A-Z][a-z]{3,7}$/;
    if (regex.test(productName.value)) {
        document.getElementById("name-error").innerHTML = '';
        return true;
    }else{
        document.getElementById("name-error").innerHTML =`<span class="text-danger">should start with capital letter</span>`
        return false;
    }
}
function valdiateProuductCategory(){
    var regex = /^(tv|mobile|laptop)$/i
    if (regex.test(productModel.value)) {
        document.getElementById("Catrgory-error").innerHTML = '';
        return true;
    }else{
        document.getElementById("Catrgory-error").innerHTML =`<span class="text-danger">Catrgory should be tv or mobile or laptop</span>`
        return false;
    }
}