const characterList = document.querySelector(".character-list");
const searchInput = document.querySelector(".search-input");
const loadingIndicator = document.querySelector(".loading-indicator");
let isLoading;
const paginationBox = document.querySelector("pagination");

const getCharacters = async () => {
  try {
    isLoading = true;

    loadingIndicator.style.display = "block";

    const api = await fetch(
      "https://rickandmortyapi.com/api/character/?page=2"
    );
    const data = await api.json();
    const characters = data.results;
    const filterCharacters = characters.filter(
      (character) => character.id <= 826
    );

    characterList.innerHTML = "";

    filterCharacters.forEach(
      ({ image, name, status, species, location, gender }) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
      <div style = "display: flex; flex-direction: column; align-items: center; gap: 15px;">
        <img src = "https://rickandmortyapi.com/api/character/avatar/1.jpeg" style = "width:160px; border-radius:50%; padding:10px; border:2px dashed green;"></img> 
        <h3 >${name}</h3>
        </div>
        <p><span style = "font-size: 18px; color: #4800bcb9">Location:</span> ${location.name}</p>
        <p><span style = "font-size: 18px; color: #4800bcb9">Species:</span> ${species}</p> 
        <p><span style = "font-size: 18px; color: #4800bcb9">Status:</span> ${status}</p>
        <p><span style = "font-size: 18px; color: #4800bcb9">Gender:</span> ${gender}</p> 
      `;
        characterList.appendChild(listItem);
        listItem.style.backgroundColor = "#d3b8ff";
        listItem.style.color = "#4f545e";
      }
    );

    isLoading = false;
    loadingIndicator.style.display = "none";
  } catch {
    console.log("Error fetching characters");
  }
};

const filterCharacter = (query) => {
  const characters = characterList.querySelectorAll("li");
  characters.forEach((character) => {
    const text = character.textContent.toLowerCase();

    if (text.includes(query)) {
      character.style.display = "flex";
    } else {
      character.style.display = "none";
    }
  });
};

const searchQuery = (event) => {
  const query = event.target.value.toLowerCase();
  filterCharacter(query);
};

searchInput.addEventListener("input", searchQuery);
window.addEventListener("DOMContentLoaded", getCharacters);

///////////////////////////pagination//////////////////////////////

const ulTag = document.querySelector(".paginationUl");
let totalPages = 42;
function element(totalPages, page) {
  let btnTag = "";
  let beforePages = page - 1;
  let afterPages = page + 1;
  let activebtn;

  if (page > 1) {
    btnTag += `<button class="page-arrow" onclick = "element(totalPages, ${page - 1})">prev</button>`;
  }
  if(page > 2){
    btnTag += `<button class="numb"  onclick = "element(totalPages, 1)">1</button>`

    if(page>3){
    btnTag += `<button class="dots">...</button>`
    }
  }

  if(page == totalPages){
    beforePages = beforePages - 2;
  }
  else if(page == totalPages - 1){
    beforePages = beforePages -1;
  }

  if(page == 1){
    afterPages = afterPages + 2;
  }
  else if(page == 2){
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {

    if(pageLength > totalPages){
        continue;
    }
    if(pageLength == 0){
        pageLength = pageLength + 1;
    }

    if(page == pageLength){
        activebtn = "active"
    }
    else{
        activebtn = ""
    }
    btnTag += `<button class="numb ${activebtn}" onclick = "element(totalPages, ${pageLength})">${pageLength}</button>`    
  }

  if(page < totalPages - 1){
    if(page < totalPages - 2){
    btnTag += `<button class="dots">...</button>`
    }
    btnTag += `<button class="numb"  onclick = "element(totalPages, ${totalPages})">${totalPages}</button>`
  }

  if (page < totalPages) {
    btnTag += `<button class="page-arrow" onclick = "element(totalPages, ${page + 1})">next</button>`;
  }
  ulTag.innerHTML = btnTag
}

element(totalPages, 1);
////////////////////////Button+Dropdown/////////////////////////////
const dropdowns = document.querySelectorAll('.dropdown');
const reset = document.getElementById("resetBtn")

dropdowns.forEach(dropdown =>{
    const select = dropdown.querySelector(".select")
    const caret = dropdown.querySelector(".caret")
    const menu = dropdown.querySelector(".menu")
    const options = dropdown.querySelectorAll(".menu li")
    const selected = dropdown.querySelector(".selected")

    select.addEventListener("click", ()=>{
        select.classList.toggle('select-clicked')
        caret.classList.toggle('caret-rotate')
        menu.classList.toggle('menu-open')
    });
    options.forEach(option =>{
        option.addEventListener('click', ()=>{
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked')
            caret.classList.remove('caret-rotate')
            menu.classList.remove('menu-open')
            
            options.forEach(option =>{
                option.classList.remove('active')
            });
            option.classList.add('active')
        });
    });
});
reset.addEventListener('click', () =>{
    location.reload()
})