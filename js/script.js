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

    cartListNode.addEventListener("click",handleEvent2);

}



function addToCart(id,productsData){
    const chosenProduct=productsData.find(i=>i.id===+id);
    //console.log(productsData);
    //console.log(chosenProduct);
    chosenProducts.push(chosenProduct);

    //console.log(chosenProducts);

    const ids = chosenProducts.map(({ id }) => id);
    const showArray = chosenProducts.filter(({ id }, index) => !ids.includes(id, index + 1));

    //console.log(showArray);

    cartListNode.innerHTML="";


    showArray.forEach(product=>{
        const qty=chosenProducts.filter(p=>p.id===product.id).length;
        createFinalCard(product,qty,cartListNode);
        
    
    });



}


function createFinalCard(product,qty,cartListNode){

    //     //console.log(product);
    //     //console.log(qty);

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
    }





async function handleEvent2(event){

    const productsData=await fetchData();

    const tagName=event.target.tagName;
    const id=event.target.dataset.id;
    const type=event.target.innerText;
    if(tagName!=="BUTTON") return;
    //console.log("gyhbgjyhg")
    switch(type){
        case "+":
            //console.log("+");
            increase(id,productsData);
            break;
        case "-":
            console.log("-");
            //this.decrease(id);
            break;
        case "Remove":
            console.log("bye");
            //this.remove(id);
            break;
    }



    function increase(id,productsData){
    

        addToCart(id,productsData);
    
    };



    

}











document.addEventListener("DOMContentLoaded",render);

