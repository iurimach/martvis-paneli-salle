// კატალოგის ღილაკის ფუნქციონალობა (კატალოგის გახსნა და დახურვა)
const catalogToggle = document.getElementById('catalog-toggle');
const catalogMenu = document.getElementById('catalog-menu');

catalogToggle.addEventListener('click', () => {
  
// გაჯიტდა იფ პირობაში არ შედიოდა ეგრევე ამიტო getComputedStyl სტილის დამტება დაჭირდა 
  const currentDisplay = window.getComputedStyle(catalogMenu).display;
  if (currentDisplay === "block") {

    catalogMenu.style.display = "none";
  } else {
    catalogMenu.style.display = "block";
  }
});
 
 

function displenonestyle(){
    const classNames= [ 'gasaqrobi']

    classNames.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
          element.style.display = 'none';
        });
      });

}

//   // ფუნქცია, რომელიც აჩვენებს ფილტრირებულ მონაცემებს // გამოჩენით 
//  // JSON მონაცემების ფაილიდან წამოღება
//  async function fetchData() {
//     const response = await fetch('json-data/alldata.json'); // მოცემული JSON ფაილი
//     const data = await response.json();
//     console.log(data," ალლ_data")
//     return data;
// }

async function fetchData() {
    const username = 'admin_iuri';  // თქვენი მომხმარებლის სახელი დახურულ ,აპის რო მივწვდე
    const password = 'adminpassword123iurimatch';  // თქვენი პაროლი დახურილი ,აპის რო მივწვდე

    // Base64-encode the username and password
    const base64Credentials = btoa(username + ":" + password);

    // შექმენით მოთხოვნა fetch-ში ავტორიზაციის header-ით
    try {
        const response = await fetch('https://iurimatch.com/salle/api/data', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64Credentials,  // Base64-encoded ავტორიზაცია
            }
        });

        if (!response.ok) {
            throw new Error('ავტორიზაცია ვერ შედგა ან არ გაქვთ წვდომა');
        }

        const data = await response.json();  // JSON მონაცემების მიღება
        console.log(data, " - მიღებული მონაცემები");

        return data;  // დამთავრებული მონაცემები
    } catch (error) {
        console.error('შეცდომა:', error);
    }
}


function globalSearch(query) {
    fetchData().then(data => {
        // წამოიღებს ყველა მონაცემს და დააფილტრავს სახელზე ან აღწერაზე
        const filteredItems = data.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.product_id.toLowerCase().includes(query.toLowerCase()) || 
                   item.description1.toLowerCase().includes(query.toLowerCase()) || 
                   item.description2.toLowerCase().includes(query.toLowerCase()) ||
                   item.description3.toLowerCase().includes(query.toLowerCase());
        });
        displenonestyle() //გააქრობს დივებს
        catalogMenu.style.display = "none"  //კატლოგის ჩამოშლილ ღილაკს აკეცავს,იტემის მოძებნის შემთხვევაში
        displayItems(filteredItems); //ეს ფუნქცია, reklama.js ში არის იქედან გამოვაჩინე, 
        displayItems(filteredItems);  // გამოტანის ფუნქცია
    });
}

// ფილტრაციის ფუნქცია (კატეგორიის მიხედვით)
function filterCategory(category) {
    fetchData().then(data => {
        displenonestyle()
        const filteredItems = data.filter(item => item.category.includes(category));
       
        catalogMenu.style.display = "none"  //კატლოგის ჩამოშლილ ღილაკს აკეცავს,იტემის მოძებნის შემთხვევაში
        displayItems(filteredItems); //ეს ფუნქცია, reklama.js ში არის იქედან გამოვაჩინე, 
    });
}

// ყველა აიტემისShown:  "კომენტირების შიგნით" functionality
function showAll() {
    fetchData().then(data => {
        displayItems(data);
    });
}

// PARTNIOR ველიუ "YES"-ის მქონე აიტემების ფილტრი
function filterPartner() {
    fetchData().then(data => {
        const partnerItems = data.filter(item => item.partnior === "YES");
        displayItems(partnerItems);
    });
}





// ვქმნით ცვლადს, რომელიც აჩვენებს მიმდინარე თარიღსა და დროს
        function updateTime() {
            const currentDate = new Date();
            
            // ვიღებთ დღეს, თვეს და წელს
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // თვე იწყება 0-დან
            const year = currentDate.getFullYear();

            // ვაახლებთ HTML ელემენტს
            document.getElementById('current-time').innerText = 
                `დღეს არის: ${day}-${month}-${year}`;
        }

        // განახლება ყოველ 1000 მილი წამში (1 წამში ერთხელ)
        setInterval(updateTime, 1000);


function openWhatsApp() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // მობილური მოწყობილობა
        window.location.href = "whatsapp://send?phone=995568800554";
    } else {
        // დესკტოპი
        window.open("https://wa.me/995568800554", "_blank");
    }
}

