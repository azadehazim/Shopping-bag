import { fetchData } from "../utils/httpReq.js";


const productsNode=document.getElementById("products");
let chosenProducts=[];
let showArray=[];

const cartListNode=document.getElementById("cart-list");
const totalPriceNode=document.getElementById("total-price").querySelector("span");



async function render(){
    const productsData=await fetchData();
    
    showProducts(productsData);
    
    productsNode.addEventListener("click",handleEvent);
   
    cartListNode.addEventListener("click",handleEvent2);

    
}



async function showProducts(productsData){
    productsData.forEach(product=>createCard(product));

  
}

async function createCard(product){
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



async function handleEvent(event){

    const productsData=await fetchData();

    if(event.target.tagName==="BUTTON"){
    
        addToCart(event.target.dataset.id,productsData);
    }
    else{
        return
    }

}



async function addToCart(id,productsData){
    const chosenProduct=productsData.find(i=>i.id===+id);
    
    chosenProducts.push(chosenProduct);

    showCard(chosenProducts,cartListNode)
   

}


async function showCard(chosenProducts,cartListNode){

    if(chosenProducts.length===0){
        totalPriceNode.innerText=0;
    }
    
    const ids = chosenProducts.map(({ id }) => id);
    showArray = chosenProducts.filter(({ id }, index) => !ids.includes(id, index + 1));

    cartListNode.innerHTML="";


    showArray.forEach(product=>{
        const qty=chosenProducts.filter(p=>p.id===product.id).length;
        createFinalCard(product,qty,cartListNode);
        
    });
}


async function createFinalCard(product,qty,cartListNode){

        const cardEle=document.createElement("div");

        const {name,price,image,alt,id}=product;
        const imgJSX=`<img alt=${alt} src=${image}>`;

        cardEle.innerHTML=imgJSX;

        const infoJSX=`
        <div id="cart-info">
            <h4>${name}</h4>
            <p>${price}</p>
        </div>
        `;

        cardEle.innerHTML+=infoJSX;

        const controlJSX=`
        <div id="cart-control">
            <div>
                <button data-id=${id}>-</button>
                <span>${qty}</span>
                <button data-id=${id}>+</button>
            </div>
            <button data-id=${id}>Remove</button>
        </div>
        `;

        cardEle.innerHTML+=controlJSX;


        cartListNode.appendChild(cardEle)

        calculatedPrice(chosenProducts,price,totalPriceNode)

    }





async function handleEvent2(event,productsData){

    productsData=await fetchData();

    const tagName=event.target.tagName;
    const id=event.target.dataset.id;
    const type=event.target.innerText;
    if(tagName!=="BUTTON") return;
   
    switch(type){
        case "+":
            increase(id,productsData);
            break;
        case "-":
            decrease(id,chosenProducts,cartListNode);
            break;
        case "Remove":
            remove(id,chosenProducts,cartListNode);
            break;
    }

}


async function increase(id,productsData){

    addToCart(id,productsData);

}




async function decrease(id,chosenProducts,cartListNode){

    const index=chosenProducts.findIndex(p=>p.id===+id);

    chosenProducts.splice(index,1);

    showCard(chosenProducts,cartListNode);

}


async function remove(id,chosenProducts,cartListNode){

    let j=chosenProducts.length;
    do{
        let index=chosenProducts.findIndex(p=>p.id===+id);
            if(index>=0){
            chosenProducts.splice(index,1);
            }
        j--
    }
    while(j>0)

    showCard(chosenProducts,cartListNode);

}


function calculatedPrice(chosenProducts,price,totalPriceNode){
    
    const total=chosenProducts.reduce((acc,cur)=>acc+=cur.price,0);
    totalPriceNode.innerText="$ "+total;
    
}








document.addEventListener("DOMContentLoaded",render);



