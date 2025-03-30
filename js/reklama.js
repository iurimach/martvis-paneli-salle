//აქ ვიღებ დარეკლმბული გვერდებიდან კლიკზე სხელბის მიხევით ვფილტრავ და გამოვაჩენ, შემდეგ იდით გავფილტრავ 
//იდ ით ფილტრის DETAIL.JS აკეტებს, რომელსაც მთლიანი მონცმები მოაქ აიტმის შესახებ
// JSON მონაცემების დატვირთვა
async function loadItems() {
    const username = 'admin_iuri';  // თქვენი მომხმარებლის სახელი , აქ იგვე პაროლი ჩაწერე აპიზე წვდომა რო მქონდეს  რაც ფლსკზე მაქ
    const password = 'adminpassword123iurimatch';  // თქვენი პაროლი აპიზე წვდომისთვის, დახურული აპი მაქ

    // Base64-encode the username and password
    const base64Credentials = btoa(username + ":" + password);

    // ჩამოტვირთეთ მონაცემები fetch-ის დახმარებით
    try {
        const response = await fetch('https://iurimatch.com/salle/api/data', { //ეს არის ჩემი აპი სადაც ჯსონ მოდის, ფლასკზე მაქ აწყობილი
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64Credentials,  // Base64-encoded ავტორიზაცია
            }
        });

        if (!response.ok) {
            throw new Error('ავტორიზაცია ვერ შედგა ან არ გაქვთ წვდომა');
        }

        const items = await response.json();  // JSON მონაცემების მიღება
        return items;
    } catch (error) {
        console.error('შეცდომა:', error);
    }
}

// ფილტრის ფუნქცია - სახელით
async function filter_by_name(name) {
    const items = await loadItems();
    const filteredItems = items.filter(item => item.name.includes(name));
    displayItems(filteredItems);
    displenonestyle() //გავაქრე
    toggleCatalog() // გავაქრე კატალოგი
}

// შედეგების გამოჩენა HTML-ში
function displayItems(items) {
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = ''; // გაწმენდა არსებულ მონაცემების

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img class="item_image" src="${item.image}" alt="${item.name}">
            <h5 class="item_name">${item.name}</h5>
            <p class="item_description1">${item.description1}</p>
            <div class="item_fasi_div">
                <p class="item_new_price"> ${item.axali_fasi } ₾</p>
                <p class="item_old_price"> ${item.zveli_fasi} ₾</p>
                <p class="item_procent"> -${item.fasdakleba}%</p>
            </div>
            <div class="item_xazi"></div>
            <p class="item_vada"> მოქმედებს: ${item.vada}</p>
           
           
        `;
        itemDiv.onclick = function() {
            showDetails(item.product_id);
        };
        itemsDiv.appendChild(itemDiv);
    });
}

// დეტალების გვერდზე გადასვლა
function showDetails(product_id) {
    loadItems().then(items => {
        const item = items.find(i => i.product_id === product_id);
        if (item) {
            localStorage.setItem('selectedItem', JSON.stringify(item));
            window.location.href = 'details.html';
        }
    });
}

function displenonestyle(){
    const classNames= [ 'gasaqrobi']

    classNames.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
          element.style.display = 'none';
        });
      });

}

//გააქრე კარუსელები და დივები სერჩის ღილაკზე გაკტიურბისას
function displenonestyle(){
    const classNames= [ 'gasaqrobi']

    classNames.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
          element.style.display = 'none';
        });
      });

}

// კატალოგის ღილაკის ფუნქციონალობა (კატალოგის გახსნა და დახურვა)
// კატალოგის გახსნა და დახურვა
function toggleCatalog() {
    const catalogMenu = document.getElementById('catalog-menu');
   

    // ვამოწმებთ როგორია სტილი ახლა
    const currentDisplay = window.getComputedStyle(catalogMenu).display;
    if (currentDisplay === "block") {
        catalogMenu.style.display = "none"; // კატალოგის დახურვა
    } else {
        catalogMenu.style.display = "block"; // კატალოგის გახსნა
    }
}

// კატალოგის ღილაკზე მოისმინეთ კლიკი


