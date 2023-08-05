let buttonDiv = document.querySelector("#button-container");
let i = 0;
for(i=0;i<20;i++){
    let htmlString = 
    `
        <button type="button" id=${i+1}>Button#${i+1}</button>
    `
    buttonDiv.insertAdjacentHTML("beforeend", htmlString);
}

buttonDiv.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON') {
        alert(`Button ${event.target.id}` );
    }
  })
