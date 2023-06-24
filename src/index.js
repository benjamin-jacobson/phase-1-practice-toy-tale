let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  // Buttons event listener
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

 // Form submit and update
 const inputForm = document.querySelector("form"); 
 inputForm.addEventListener("submit", getFormContentToJsonDb)
});


let toyBox = document.getElementById('toy-collection')
// console.log(toyBox)

function getData(){
  url = 'http://localhost:3000/toys'
  fetch(url)
  .then(res => res.json())
  .then(data =>showData(data))
}

getData()

function showData(data){
  let toyBox = document.getElementById('toy-collection')
  for (item of data) {
    // console.log(item)
    let newDiv = document.createElement('div')
    newDiv.classList.add("card")

    // text
    let p = document.createElement('p')
    p.innerText = item.name
    newDiv.append(p)
    // image
    let i = document.createElement('img')
    i.src = item.image //this is the url key
    i.classList.add("toy-avatar")
    newDiv.append(i)
    // text
    let p2 = document.createElement('p')
    p2.innerText = `${item.likes} likes!` // number of likes
    newDiv.append(p2)
    // button button
    let p3 = document.createElement('button')
    p3.setAttribute('likesCount', item.likes)
    p3.id = item.id
    p3.innerText = `Like` // number of likes
    p3.classList.add("button")
    p3.addEventListener("click", likeAction)
    newDiv.append(p3)
    toyBox.append(newDiv)
  }
}

function likeAction(e){
  e.preventDefault()
  // console.log(e.target.id) // this is the id of the data
  // console.log(`current count parent ${e.target.likesCount}`) // Need to figure this out
  
  // Existing count
  let currentCount = fetch(`http://localhost:3000/toys/${e.target.id}`)
  .then(res => res.json())
  .then(data => updateLikeCount(data))
}

// Update the like count fetch
function updateLikeCount(e) {
  // console.log(e)
  let newData = {'likes': parseInt(`${e.likes + 10000}`)}
  fetch(`http://localhost:3000/toys/${e.id}`, 
  {
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newData)  //// Need to set the current data to current count +1
  });

  // reloads the DOM with new JSON data
  location.reload();
}


// Add the new image content to database
function getFormContentToJsonDb(e) {
  e.preventDefault();
  // console.log(e)
  // console.log("I was submitted");

  let newPostData = {'name': e.target.children[1].value,
                     'image': e.target.children[3].value,
                     'likes': parseInt(0)}
  fetch(`http://localhost:3000/toys`, 
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newPostData)
  });

  // reloads the DOM with new JSON data
  location.reload();
}