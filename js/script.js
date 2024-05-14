import { fetchData } from "../utils/httpReq.js";


const productsNode=document.getElementById("products");
let chosenProducts=[];

const cartListNode=document.getElementById("cart-list");
const totalPriceNode=document.getElementById("total-price").querySelector("span");





async function render(){
    const productsData=await fetchData();
    
    //console.log(productsData);
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



async function handleEvent(event){

    const productsData=await fetchData();

    if(event.target.tagName==="BUTTON"){
        console.log("hi");
        addToCart(event.target.dataset.id,productsData);
    }
}



function addToCart(id,productsData){
    const chosenProduct=productsData.find(i=>i.id===+id);
    //console.log(chosenProduct);
    chosenProducts.push(chosenProduct);

    console.log(chosenProducts);

    const ids = chosenProducts.map(({ id }) => id);
    const showArray = chosenProducts.filter(({ id }, index) => !ids.includes(id, index + 1));

    console.log(showArray);

}










document.addEventListener("DOMContentLoaded",render);

