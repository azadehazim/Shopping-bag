import { fetchData } from "../utils/httpReq.js";



const productsNode=document.getElementById("products");


async function render(){
    const productsData=await fetchData();
    console.log(productsData);
    showProducts(productsData);
}






function showProducts(productsData){
    productsData.forEach(product=>createCard(product));
}

function createCard(product){
    const cardEle=document.createElement("div");
    
    const {image,alt}=product;
    const imgEle=`<img alt=${alt} src=${image}>`;
    cardEle.innerHTML=imgEle;

    const {id,name,price}=product;
        const infoEle=`
            <div id="product-info">
                <h3>${name}</h3>
                <div>
                    <span>${price}</span>
                    <button data-id=${id}>+</button>
                </div>
            </div>
        `;
    cardEle.innerHTML+=infoEle;

   productsNode.appendChild(cardEle);

}










document.addEventListener("DOMContentLoaded",render);