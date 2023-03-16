
const fetchData = async (query) =>{
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`)
    console.log(response);
    const data = await response.json();
    return data;
}

const searchBar = document.querySelector(".searchBar");
const container = document.querySelector(".container");

let query="";

//https://www.youtube.com/watch?v=kSiuXLfF9HM&t=326s
const debounce = (fn, duration) => {
    let timer = null;
    return function (...args){ 
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(()=>{
            fn.apply(this,args)
        }, duration)
    }
}

container.addEventListener("click", (event)=>{
    console.log(event);
    if(event.target.matches("span")){
        searchBar.value = `${event.target.innerHTML}`
        container.innerHTML = ''
    }
})

const searchCallback = async (event)=>{
    query = event.target.value;
    console.log(query)
    let searchResults
    if(query)
        searchResults  = await fetchData(query);
    console.log(searchResults);

    if(searchResults && searchResults.length){
        container.innerHTML = ''
        searchResults.forEach(element => {
            console.log(element.name)
            let htmlStr = `
            <div class="item">
                <span>${element.name.official}</span>
            </div>
        `
        container.insertAdjacentHTML("beforeend", htmlStr)
        });
    }
    else container.innerHTML = ''

}

searchBar.addEventListener("input", debounce(searchCallback, 1000))

