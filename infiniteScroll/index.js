let userContainer = document.querySelector(".userContainer");
let pageNumber=1, pageSize =30;
let isLoading = false

//https://www.youtube.com/watch?v=n3i4j2b8PIA&list=PLp57ZqpB-mGFicYcEU6A1622-Mwq7u7hx&index=8
const fetchData = async (pageNumber, pageSize) =>{
    isLoading = true 
    const response = await fetch(`https://randomuser.me/api/?page=${pageNumber}&results=${pageSize}&seed=abc`)
    const data = response.json();
    return data;
}

const renderUser = (user) =>{
    let htmlString = `
        <div class="user">
            ${user.name.first}
        </div>
    `
    userContainer.insertAdjacentHTML("beforeend", htmlString)
}

const loadUser= async (pageNumber,pageSize) => {
    
    return new Promise(async (resolve, reject) => {
      const userList = await fetchData(pageNumber, pageSize);
      console.log(userList);
      userList.results.forEach((user) => {
        renderUser(user);
      });

      if (isLoading) { //once data is fetched from API set isLoading to false and observe the last element
        isLoading = false;
        observeLastElement();
      }

      resolve("success")
    }).catch ((err)=>{
        reject(err)
    });
}

loadUser(pageNumber,pageSize)

const getLastElement = () =>{
    return document.querySelector(".userContainer > .user:last-child")
}

const infiniteCallback = (entries, observer) =>{
    console.log(entries)
    if(entries[0].isIntersecting){
        pageNumber += 1;
        loadUser(pageNumber, pageSize).then(()=> observeLastElement())

        observer.unobserve(entries[0].target)
    }
}

const infiniteScroll = new IntersectionObserver(infiniteCallback , {})

const observeLastElement = () =>{
    infiniteScroll.observe(getLastElement())
}