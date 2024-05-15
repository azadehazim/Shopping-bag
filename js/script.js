import { fetchData } from "../utils/httpReq.js";


const productsNode=document.getElementById("products");
let chosenProducts=[];
let showArray=[];
//let newProducts=[];


const cartListNode=document.getElementById("cart-list");
const totalPriceNode=document.getElementById("total-price").querySelector("span");





async function render(){
    const productsData=await fetchData();
    
    //console.log(productsData);
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
    else{
        return
    }

    //return chosenProducts;

    //cartListNode.addEventListener("click",handleEvent2);

}



async function addToCart(id,productsData){
    const chosenProduct=productsData.find(i=>i.id===+id);
    //console.log(productsData);
    //console.log(chosenProduct);
    chosenProducts.push(chosenProduct);
    

    //console.log(chosenProducts);

    showCard(chosenProducts,cartListNode)



}


async function showCard(chosenProducts,cartListNode){
    //console.log(chosenProducts);

    const ids = chosenProducts.map(({ id }) => id);
    showArray = chosenProducts.filter(({ id }, index) => !ids.includes(id, index + 1));

    //console.log(showArray);

    cartListNode.innerHTML="";


    showArray.forEach(product=>{
        const qty=chosenProducts.filter(p=>p.id===product.id).length;
        createFinalCard(product,qty,cartListNode);
        
    
    });
}


async function createFinalCard(product,qty,cartListNode){

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

        calculatedPrice(chosenProducts,price,totalPriceNode)

    }





async function handleEvent2(event,productsData){

    // console.log(chosenProducts);

    productsData=await fetchData();

    const tagName=event.target.tagName;
    const id=event.target.dataset.id;
    const type=event.target.innerText;
    if(tagName!=="BUTTON") return;
    //console.log("gyhbgjyhg")
    switch(type){
        case "+":
            //console.log("+");
            increase(id,productsData);
            //return chosenProducts;
            break;
        case "-":
            console.log("-");
            decrease(id,chosenProducts,cartListNode);
            //return chosenProducts;
            break;
        case "Remove":
            console.log("bye");
            remove(id,chosenProducts,cartListNode);
            //return chosenProducts;
            break;
    }

    //console.log(event.target.tagName);
    //console.log(chosenProducts);


//return chosenProducts;


}


async function increase(id,productsData){

    addToCart(id,productsData);

}




async function decrease(id,chosenProducts,cartListNode){

    const index=chosenProducts.findIndex(p=>p.id===+id);
    //console.log(index);

    chosenProducts.splice(index,1);

    //console.log(chosenProducts);

    showCard(chosenProducts,cartListNode);

}


async function remove(id,chosenProducts,cartListNode){

    // console.log(chosenProducts.length);

    let j=chosenProducts.length;
    do{
        let index=chosenProducts.findIndex(p=>p.id===+id);
            if(index>=0){
            chosenProducts.splice(index,1);
            }
        j--
    }
    while(j>0)


    // console.log(chosenProducts.length);

    // console.log(chosenProducts);

    // let i=0;

    // chosenProducts.forEach((product,index)=>{
    //     if(product.id===+id){
    //         console.log(index);
    //         //console.log(chosenProducts);
    //         i++
    //         chosenProducts.splice(index,1);
    //     }
    // })


    //     console.log(`i= ${i}`);



        //console.log(chosenProducts);

    // newProducts=chosenProducts.filter(p=>p.id!==+id);
    // chosenProducts=newProducts;
    //console.log(chosenProducts);

   

    showCard(chosenProducts,cartListNode);

    //return chosenProducts;
    
}


function calculatedPrice(chosenProducts,price,totalPriceNode){
    const total=chosenProducts.reduce((acc,cur)=>acc+=cur.price,0);
    totalPriceNode.innerText="$ "+total;
}












document.addEventListener("DOMContentLoaded",render);



