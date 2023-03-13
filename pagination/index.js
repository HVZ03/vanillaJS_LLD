
let pageNumber = 1, itemsPerPage = 12;
let numberOfPages
var productList;

const productsContainer = document.querySelector(".productsContainer");
const pageController = document.querySelector(".pageController");

const fetchData = async()=>{
    const response = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await response.json();
    return data
}

const renderProduct = (product) =>{
    let htmlString = 
    `
        <div class="product">
        <img class="image" src="${product.thumbnail}" alt=${product.title}/>
        <div>${product.title}</div>
        </div>
    `

    productsContainer.insertAdjacentHTML("beforeend", htmlString)
}

const renderPage = (productList,pageNumber) =>{
    productList.products.slice(pageNumber*itemsPerPage-itemsPerPage,pageNumber*itemsPerPage).forEach(product => {
        renderProduct(product)
    });

    numberOfPages = Math.ceil(100/itemsPerPage)
    console.log(numberOfPages)

    if(pageNumber === 1)
        pageController.insertAdjacentHTML("beforeend", `<span class="leftPointer__inactive"> ⬅️</span>`)
    else
        pageController.insertAdjacentHTML("beforeend", `<span class="leftPointer"> ⬅️</span>`)

    pageArray = [...Array(numberOfPages)]
    pageArray.map((_,index)=>{
        let ispageActive = pageNumber === index+1;
        if(ispageActive){
            pageController.insertAdjacentHTML("beforeend", `<span class="pageNumber__active"> ${index+1}</span>`)
        }
        else
            pageController.insertAdjacentHTML("beforeend", `<span class="pageNumber"> ${index+1}</span>`)
    })

    if(pageNumber === numberOfPages )
        pageController.insertAdjacentHTML("beforeend", `<span class="rightPointer__inactive"> ➡️</span>`)
    else
        pageController.insertAdjacentHTML("beforeend", `<span class="rightPointer"> ➡️</span>`)
}

const loadProducts = async (pageNumber)=>{
    productList = await fetchData(); //fetch the data and store it in global var
    renderPage(productList, pageNumber)
}

pageController.addEventListener("click", (event)=>{ //event delegation
    if(event.target.matches("span")){
        console.log(event.target.className)
        if(event.target.className.includes("pageNumber"))
            pageNumber = parseInt(event.target.innerHTML)
        else if(event.target.className === "leftPointer" && pageNumber>1)
            pageNumber -= 1;
        else if(event.target.className === "rightPointer" && pageNumber<numberOfPages)
            pageNumber += 1;

        productsContainer.innerHTML= ''
        pageController.innerHTML = ''
        console.log("new page number: ", pageNumber)
        renderPage(productList,pageNumber)
    }
})

loadProducts(pageNumber) //call it once