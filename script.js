const characterList = document.querySelector(".character-list");
const searchInput = document.querySelector("input[type='text']");
const loadingIndicator = document.querySelector(".loading-indicator");
const ulTag = document.querySelector(".paginationUl");
let totalPages = 42; 
const pagination = document.querySelector(".pagination")
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
        <div class = "card-image-content" style="display: flex; flex-direction: column; align-items: center; gap: 15px; width: auto;">
          <img src="${image}" class = "cardsImage" onclick="myFunction()"></img> 
          <h3>${name}</h3>
        </div>
        <div class = "card-text"> 
        <p><span style="font-size: 18px; color: #4800bcb9">Location:</span> ${location.name}</p>
        <p><span style="font-size: 18px; color: #4800bcb9">Species:</span> ${species}</p> 
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

/////////////////////////////////////////////////////////////////////////////////////////
let allCharacters = []; 

const fetchAllCharacters = async () => {
  allCharacters = []; 
  loadingIndicator.style.display = "block";
  try {
    for (let page = 1; page <= totalPages; page++) {
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      const api = await fetch(url);
      const data = await api.json();
      allCharacters = allCharacters.concat(data.results);
    }
    loadingIndicator.style.display = "none";
  } catch (error) {
    console.error("Error fetching all characters:", error);
    loadingIndicator.style.display = "none";
  }
};

const displayFilteredCharacters = (filterCategory, filterValue) => {
  const filteredCharacters = allCharacters.filter(
    (character) => character[filterCategory] === filterValue
  );

  if (filteredCharacters.length === 0) {
    characterList.innerHTML = `<p style="text-align: center; color: red;">No characters found for "${filterValue}"</p>`;
    return;
  }

  characterList.innerHTML = "";
  filteredCharacters.forEach(({ image, name, status, species, location, gender }) => {
    const listItem = document.createElement("li");
    listItem.classList.add("character-item");
    listItem.innerHTML = `
      <div class="card-image-content" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
        <img src="${image}" class="cardsImage" onclick="myFunction()"></img> 
        <h3>${name}</h3>
      </div>
       <div class = "card-text">
        <p><span style="font-size: 18px; color: #4800bcb9">Location:</span> ${location.name}</p>
        <p><span style="font-size: 18px; color: #4800bcb9">Species:</span> ${species}</p> 
        <p><span style="font-size: 18px; color: #4800bcb9">Status:</span> ${status}</p>
        <p><span style="font-size: 18px; color: #4800bcb9">Gender:</span> ${gender}</p>
        </div>
         <div class = "hover-text" >
        <h3>${name}</h3>
        <p><span style="font-size: 18px; color: black">Location:</span> ${location.name}</p>
        <p><span style="font-size: 18px; color: black">Species:</span> ${species}</p> 
        <p><span style="font-size: 18px; color: black">Status:</span> ${status}</p>
        <p><span style="font-size: 18px; color: black">Gender:</span> ${gender}</p>
        </div>
    `;
    characterList.appendChild(listItem);
    listItem.style.backgroundColor = "#85d4ee"
  });
};

document.querySelector("[data-filter='Human']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Human");     
    });
  } else {
    displayFilteredCharacters("species", "Human");

  }
});
document.querySelector("[data-filter='Alien']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Alien");
    });
  } else {
    displayFilteredCharacters("species", "Alien");
  }
});
document.querySelector("[data-filter='Humanoid']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Humanoid");
    });
  } else {
    displayFilteredCharacters("species", "Humanoid");
  }
});

document.querySelector("[data-filter='Mythological Creature']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Mythological Creature");
    });
  } else {
    displayFilteredCharacters("species", "Mythological Creature");
  }
});
document.querySelector("[data-filter='Animal']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Animal");
    });
  } else {
    displayFilteredCharacters("species", "Animal");
  }
});
document.querySelector("[data-filter='Robot']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Robot");
    });
  } else {
    displayFilteredCharacters("species", "Robot");
  }
});
document.querySelector("[data-filter='Disease']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Disease");
    });
  } else {
    displayFilteredCharacters("species", "Disease");
  }
});
document.querySelector("[data-filter='Cronenberg']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("species", "Cronenberg");
    });
  } else {
    displayFilteredCharacters("species", "Cronenberg");
  }
});
document.querySelector("[data-filter='Alive']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("status", "Alive");
    });
  } else {
    displayFilteredCharacters("status", "Alive");
  }
});

document.querySelector("[data-filter='Dead']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("status", "Dead");
    });
  } else {
    displayFilteredCharacters("status", "Dead");
  }
  listItem.style.backgroundColor = 'green'
});
document.querySelector("[data-filter='Male']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("gender", "Male");
    });
  } else {
    displayFilteredCharacters("gender", "Male");
  }
});
document.querySelector("[data-filter='Female']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("gender", "Female");
    });
  } else {
    displayFilteredCharacters("gender", "Female");
  }
});
document.querySelector("[data-filter='Unknown']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("gender", "Unknown");
    });
  } else {
    displayFilteredCharacters("gender", "Unknown");
  }
});
document.querySelector("[data-filter='Genderless']").addEventListener("click", () => {
  if (allCharacters.length === 0) {
    fetchAllCharacters().then(() => {
      displayFilteredCharacters("gender", "Genderless");
    });
  } else {
    displayFilteredCharacters("gender", "Genderless");
  }
});
fetchAllCharacters();
//////////////////////////////////////////////////////////////////

// const showMore = document.querySelector(".showMore")
// const showMoreBtn = document.querySelector(".showMoreBtn")
// let  characters = 20;
// showMoreBtn.addEventListener('click', () => {
//   for(var i = characters; i > characters + 20; i++){
//     characterList[i].style.display = 'inline-block'
//   }
//   characters += 20;
//   if(characters >= characterList.length){
//     showMoreBtn.style.display = none;
//   }
// })


////////////////////////////////////Pagination///////////////////////////////////////////////////
const renderPagination = (totalPages, currentPage) => {
  let btnTag = "";
  let beforePages = currentPage - 1;
  let afterPages = currentPage + 1;
  let activebtn;

  if (currentPage > 1) {
    btnTag += `<button class="page-arrow" onclick="changePage(${currentPage - 1})">&#10216;</button>`;
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
    btnTag += `<button class="page-arrow" onclick="changePage(${currentPage + 1})">&#10217;</button>`;
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
document.getElementById('clearBtn').addEventListener('click', ()=>{
  searchInput.value = "";
  getCharacters()
});

////////////////////////Button+Dropdown/////////////////////////////
const dropdowns = document.querySelectorAll('.dropdown');
const resetBtn = document.getElementById('resetBtn');

const defaultText = {
    species: "Species",
    status: "Status",
    gender: "Gender",
};

dropdowns.forEach((dropdown, index) => {
    const select = dropdown.querySelector('.select');
    const selected = dropdown.querySelector('.selected');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const spanClose = dropdown.querySelector('.span, .span2, .span3');
    const spanRemove = dropdown.querySelector('.optionSpan1, .optionSpan2, .optionSpan3')
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
        // if (spanClose) spanClose.style.display = 'block';
        if (selected.innerText === 'Species'){
          spanClose.style.display = 'block';
        } 
        else if (selected.innerText === 'Gender'){
          spanClose.style.display = 'block';
        } 
        else if (selected.innerText === 'Status'){
          spanClose.style.display = 'block';
        } 
    });

 
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            if (spanClose) spanClose.style.display = 'none';
            if (spanRemove) spanRemove.style.display = 'block'
        });
    });
});

resetBtn.addEventListener('click', () => {
    dropdowns.forEach((dropdown, index) => {
        const selected = dropdown.querySelector('.selected');
        const options = dropdown.querySelectorAll('.menu li');
        const spanClose = dropdown.querySelector('.span, .span2, .span3');
        const spanRemove = dropdown.querySelector('.optionSpan1, .optionSpan2, .optionSpan3')

        if (index === 0) {
            selected.innerText = defaultText.species;
        } else if (index === 1) {
            selected.innerText = defaultText.status;
        } else if (index === 2) {
            selected.innerText = defaultText.gender;
        }

        options.forEach(option => {
          option.classList.remove('active')
        });

        if (spanClose) spanClose.style.display = 'none';
        if(spanRemove) spanRemove.style.display = 'none';
    });

    const pagination = document.querySelector('.pagination');
    if (pagination) pagination.style.display = 'block';
    getCharacters()
});

const spanText4 = document.querySelector('.span')
spanText4.addEventListener('click', () =>{
  getCharacters()
  spanText4.innerText = ''
})
const spanText2 = document.querySelector('.span2')
spanText2.addEventListener('click', () =>{
  getCharacters()
  spanText2.innerText = ''
})
const spanText3 = document.querySelector('.span3')
spanText3.addEventListener('click', () =>{
  getCharacters()
  spanText3.innerText = ''
})
/////////////////////////////////////////////////////////////////////////////////

const spanRemoveOne = document.querySelector('.optionSpan1')
const spanRemoveTwo = document.querySelector('.optionSpan2')
const spanRemoveThree = document.querySelector('.optionSpan3')
const selected = document.querySelector('.selected');

spanRemoveOne.addEventListener('click', () => {
  dropdowns.forEach((dropdown, index) => {
      const selected = dropdown.querySelector('.selected');
      const options = dropdown.querySelectorAll('.menu li');

      if (index === 0) {
          selected.innerText = defaultText.species;
        }

      options.forEach(option => {
        option.classList.remove('active')
      });

      spanRemoveOne.style.display = 'none';
  });

  const pagination = document.querySelector('.pagination');
  if (pagination) pagination.style.display = 'block';
  getCharacters(1)
});

spanRemoveTwo.addEventListener('click', () => {
  dropdowns.forEach((dropdown, index) => {
      const selected = dropdown.querySelector('.selected');
      const options = dropdown.querySelectorAll('.menu li');

      if (index === 1) {
          selected.innerText = defaultText.status;
      }

      options.forEach(option => {
        option.classList.remove('active')
      });

      spanRemoveTwo.style.display = 'none';
  });

  const pagination = document.querySelector('.pagination');
  if (pagination) pagination.style.display = 'block';
  getCharacters(1)
});

spanRemoveThree.addEventListener('click', () => {
  dropdowns.forEach((dropdown, index) => {
      const selected = dropdown.querySelector('.selected');
      const options = dropdown.querySelectorAll('.menu li');

      if (index === 2) {
          selected.innerText = defaultText.gender;
        }

      options.forEach(option => {
        option.classList.remove('active')
      });

      spanRemoveThree.style.display = 'none';
  });

  const pagination = document.querySelector('.pagination');
  if (pagination) pagination.style.display = 'block';
  getCharacters(1)
});


// const optionSpanOne = document.querySelector('.optionSpan1')
// optionSpanOne.addEventListener('click', ()=>{
//   optionSpanOne.innerText = ''
// })



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

    const navImage = document.querySelector('.navImg')
    navImage.addEventListener('click', () =>{
      home.style.display = "block"
      character.style.display = "none"
      charBtn.style.backgroundColor = "transparent"
      charBtn.style.color = "#00609d"
       homeBtn.style.backgroundColor = "#3dc5f1"
      homeBtn.style.color = "white"
    })

/////////////////////////////////////////////////////////////////////////////////////
listItems = document.querySelectorAll('.character-list li:hover')
const cardsImage = document.querySelector('.cardsImage')
function myFunction(){
  listItem.style.transform = 'scale(1)'
}

/////////////////////////////////////////Scroll Reveal////////////////////////////////

ScrollReveal({
   reset: true,
   distance: '80px',
   duration: '1000',
   delay: '200'
});
ScrollReveal().reveal('.front-h2', { origin: 'left' });
ScrollReveal().reveal('.front-h3', { origin: 'right' });
ScrollReveal().reveal('.navImg', { origin: 'top' });
ScrollReveal().reveal('.navbarBtns', { origin: 'right' });