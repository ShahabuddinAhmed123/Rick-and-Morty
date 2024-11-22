const characterList = document.querySelector(".character-list");
const searchInput = document.querySelector("input[type='text']");
const loadingIndicator = document.querySelector(".loading-indicator");
const ulTag = document.querySelector(".paginationUl");
let totalPages = 42; 
let currentSearchQuery = "";

const getCharacters = async (page = 1, query = "") => {
  try {
    loadingIndicator.style.display = "block";
    const url = query
      ? `https://rickandmortyapi.com/api/character/?page=${page}&name=${query}`
      : `https://rickandmortyapi.com/api/character/?page=${page}`;
    const api = await fetch(url);
    const data = await api.json();

    if (data.error) {
      characterList.innerHTML = `<p style="text-align: center; color: red;">No characters found for "${query}"</p>`;
      loadingIndicator.style.display = "none";
      return;
    }
    const characters = data.results;
    characterList.innerHTML = "";

    characters.forEach(({ image, name, status, species, location, gender }) => {
      const listItem = document.createElement("li");
        listItem.classList.add("character-item"); 
      listItem.setAttribute("data-species", species); 
      listItem.setAttribute("data-status", status);
      listItem.setAttribute("data-gender", gender); 
      listItem.innerHTML = `
        <div class = "card-image-content" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
          <img src="${image}" class = "cards-image"></img> 
          <h3>${name}</h3>
        </div>
        <div class = "card-text">
        <p><span style="font-size: 18px; color: #4800bcb9">Location:</span> ${location.name}</p>
        <p class = "Species"><span style="font-size: 18px; color: #4800bcb9">Species:</span> ${species}</p> 
        <p><span style="font-size: 18px; color: #4800bcb9">Status:</span> ${status}</p>
        <p><span style="font-size: 18px; color: #4800bcb9">Gender:</span> ${gender}</p>
        </div>
        <div class = "hover-text">
        <h3>${name}</h3>
        <p><span style="font-size: 18px; color: black">Location:</span> ${location.name}</p>
        <p><span style="font-size: 18px; color: black">Species:</span> ${species}</p> 
        <p><span style="font-size: 18px; color: black">Status:</span> ${status}</p>
        <p><span style="font-size: 18px; color: black">Gender:</span> ${gender}</p>
        </div>
      `;
      characterList.appendChild(listItem);
      listItem.style.color = "#4f545e";
      listItem.style.backgroundColor = "#85d4ee";
    });

   

    loadingIndicator.style.display = "none";
  } catch (error) {
    console.error("Error fetching characters:", error);
    loadingIndicator.style.display = "none";
  }
};
const filterCards = (category, value) => {
  const allCards = document.querySelectorAll(".character-item");
  allCards.forEach(card => {
    const cardValue = card.getAttribute(`data-${category}`);
    if (cardValue === value || value === "All") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};
const dropdownItems = document.querySelectorAll(".dropdown li");
dropdownItems.forEach(item => {
  item.addEventListener("click", (e) => {
    const filterCategory = e.target.getAttribute("data-filter-category");
    const filterValue = e.target.getAttribute("data-filter");    
    filterCards(filterCategory, filterValue);
  });
});

getCharacters();

document.querySelector(".menu1").addEventListener("click", (e) => {
  filterCards("species", e.target.getAttribute("data-filter"));
});
document.querySelector(".menu2").addEventListener("click", (e) => {
  filterCards("status", e.target.getAttribute("data-filter"));
});
document.querySelector(".menu3").addEventListener("click", (e) => {
  filterCards("gender", e.target.getAttribute("data-filter"));
});
///////////////////////////////////////////////////////////////////////////////////////
const renderPagination = (totalPages, currentPage) => {
  let btnTag = "";
  let beforePages = currentPage - 1;
  let afterPages = currentPage + 1;
  let activebtn;

  if (currentPage > 1) {
    btnTag += `<button class="page-arrow" onclick="changePage(${currentPage - 1})">prev</button>`;
  }
  if (currentPage > 2) {
    btnTag += `<button class="numb" onclick="changePage(1)">1</button>`;
    if (currentPage > 3) {
      btnTag += `<button class="dots">...</button>`;
    }
  }

  if (currentPage === totalPages) {
    beforePages -= 2;
  } else if (currentPage === totalPages - 1) {
    beforePages -= 1;
  }

  if (currentPage === 1) {
    afterPages += 2;
  } else if (currentPage === 2) {
    afterPages += 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages || pageLength < 1) continue;

    activebtn = pageLength === currentPage ? "active" : "";
    btnTag += `<button class="numb ${activebtn}" onclick="changePage(${pageLength})">${pageLength}</button>`;
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      btnTag += `<button class="dots">...</button>`;
    }
    btnTag += `<button class="numb" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  if (currentPage < totalPages) {
    btnTag += `<button class="page-arrow" onclick="changePage(${currentPage + 1})">next</button>`;
  }

  ulTag.innerHTML = btnTag;
};

const changePage = (page) => {
  getCharacters(page, currentSearchQuery);
  renderPagination(totalPages, page);
};

const handleSearch = (event) => {
  currentSearchQuery = event.target.value.trim().toLowerCase();
  getCharacters(1, currentSearchQuery);
  renderPagination(totalPages, 1);
};

searchInput.addEventListener("input", handleSearch);
window.addEventListener("DOMContentLoaded", () => {
  getCharacters(1);
  renderPagination(totalPages, 1);
});


////////////////////////Button+Dropdown/////////////////////////////

const dropdowns = document.querySelectorAll('.dropdown');
const reset = document.getElementById("resetBtn")

dropdowns.forEach(dropdown =>{
    const select = dropdown.querySelector(".select")
    // const caret = dropdown.querySelector(".caret")
    const menu = dropdown.querySelector(".menu")
    const options = dropdown.querySelectorAll(".menu li")
    const selected = dropdown.querySelector(".selected")

    select.addEventListener("click", ()=>{
        select.classList.toggle('select-clicked')
        // caret.classList.toggle('caret-rotate')
        menu.classList.toggle('menu-open')
    });
    options.forEach(option =>{
        option.addEventListener('click', ()=>{
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked')
            // caret.classList.remove('caret-rotate')
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


///////////////////////////////////////////////////////////

const stickyText = document.getElementById('stickyText');
    const offsetTop = stickyText.offsetTop;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > offsetTop ) { 
        stickyText.classList.add('sticky', 'change-color');
      } else {
        stickyText.classList.remove('sticky', 'change-color');
      }
    });

    const homeBtn = document.getElementById("homeBtn")
    const charBtn = document.getElementById("characterBtn")
    var home = document.querySelector(".main-page-cntnt")
    var character = document.querySelector(".home-page")

    homeBtn.addEventListener('click', () =>{
      home.style.display = "block"
      character.style.display = "none"
      charBtn.style.backgroundColor = "transparent"
      charBtn.style.color = "#00609d"
       homeBtn.style.backgroundColor = "#3dc5f1"
      homeBtn.style.color = "white"

    })
    charBtn.addEventListener('click', () =>{
      home.style.display = "none"
      character.style.display = "block"
      charBtn.style.backgroundColor = "#3dc5f1"
      charBtn.style.color = "white"
       homeBtn.style.backgroundColor = "transparent"
      homeBtn.style.color = "#00609d"
    })
///////////////////////filter/////////////////////

function showHuman(){
  var ul, li, i;
  ul = document.getElementById(".card-text")
  li = document.querySelector(".Species")
  for(i = li.length -1 ; i >= 0; i--){
    if (li[i].textContent.trim() !== "Human") {
        ul.removeChild(li[i]);
    }
  }
}
