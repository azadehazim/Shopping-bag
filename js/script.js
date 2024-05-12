import { fetchData } from "../utils/httpReq.js";



const productsNode=document.getElementById("products");



async function render(){
    const productsData=await fetchData();
    console.log(productsData);
    showProducts(productsData);

    productsNode.addEventListener("click",handleEvent);
   
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
    // const button=document.createElement("button");
    // button.innerHTML="+";
    // button.id="plusButton"
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



function handleEvent(event){
    if(event.target.tagName==="BUTTON"){
        console.log("hi");
        addToCart(event.target.dataset.id);
    }
}


function addToCart(id){
    console.log(id);
}






document.addEventListener("DOMContentLoaded",render);