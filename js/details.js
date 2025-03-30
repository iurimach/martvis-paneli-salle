const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));

if (selectedItem) {
    const detailsDiv = document.getElementById('itemDetails');
    const detailImageWrapper = document.getElementById('detail_image_wrapper');
    const detailImagesAllWrapper = document.getElementById('detail_images_all_wrapper');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

   
    // სურათის გამოსახვა
    const renderMainImage = (src) => {
        // აიღეთ detailImageWrapper ელემენტი
        const detailImageWrapper = document.getElementById('detail_image_wrapper');
        
        // შექმენით სურათი და დაამატეთ ბექგრაუნდად
        const imgElement = document.createElement('img');
        imgElement.id = "detailImg";
        imgElement.src = src;
        imgElement.alt = selectedItem.name;
       
        // დაამატეთ პარაგრაფი ფასდკლების 
        const paragraph = document.createElement('p');
        paragraph.textContent = "-"+selectedItem.fasdakleba+ "%";
        paragraph.classList.add('item_procent')
        
        // პარაგრაფის სტილები
       
    
        // დააბრუნეთ სურათის ბექგრაუნდად
        detailImageWrapper.innerHTML = '';  // ამოიღეთ ძველი კონტენტი
        detailImageWrapper.style.position = 'relative';  // საჭიროების შემთხვევაში პარაგრაფი გადანაცვლდება
        detailImageWrapper.appendChild(imgElement);
        detailImageWrapper.appendChild(paragraph);
    };
    
    
  
    // დეტალების დამატება
    const renderDetails = () => {
        detailsDiv.innerHTML = `
            <h2 class="selectitem_name" id="select_item_name">${selectedItem.name}</h2>
            <div class="detaild_phone_div">
                <div class="misamarti_wrapper">
                     <img src="../img/icon/adgili.png" alt="misamarti_ligi" class="misamarti_logo">
                    <p> ${selectedItem.address}</p>
                </div>
                 <div class="telefon_wrapper">
                     <img src="../img/icon/telefon.png" alt="misamarti_ligi" class="telefon_logo">
                    <p> ${selectedItem.phone}</p>
                </div>
        
              

            </div>
              <p id="product_id">პროდუქტის კოდი :  ${selectedItem.product_id}</p>
             <p class="description1" id="description1">${selectedItem.description1}</p>
              
             
              
          
        `;
        // <a href="${selectedItem.ahref}" target="_blank">მეტი ინფორმაციისთვის</a>
      
        selectedItem.description1_details.forEach(item_desc => {
            
            const paragraf = document.createElement('li');
            paragraf.textContent = item_desc;
            if(paragraf.textContent.length > 1){// ცაიელი არის აღარ დაამატებს ჰტმლში
                detailsDiv.appendChild(paragraf);
            }
           
        });  // აქ ვამტებ აღწერა 2 ს ლუპით რადგან არაი არის 
        selectedItem.description2_details.forEach(item_desc => {
            
            const paragraf = document.createElement('li');
            paragraf.textContent = item_desc;
            if(paragraf.textContent.length > 1){// ცარიელი არის აღარ დაამატებს ჰტმლში
                detailsDiv.appendChild(paragraf);
            }
        });  
        // აქ ვამტებ აღწერა 3  
        const description3=document.createElement("p")
        description3.textContent=selectedItem.description3
        detailsDiv.appendChild(description3);
        // აქ ვამტებ აღწერა 3 ს ლუპით რადგან არაი არის 
        selectedItem.description3_details.forEach(item_desc => {
            
            const paragraf = document.createElement('li');
            paragraf.textContent = item_desc;
            if(paragraf.textContent.length > 1){// ცარიელი არის აღარ დაამატებს ჰტმლში
                detailsDiv.appendChild(paragraf);
            }
        });
        //დამატებითი აგწერა
        selectedItem.damatebiTi_agwera.forEach(item_desc => {
            
            const paragraf = document.createElement('li');
            paragraf.textContent = item_desc;
            if(paragraf.textContent.length > 1){// ცარიელი არის აღარ დაამატებს ჰტმლში
                detailsDiv.appendChild(paragraf);
            }
        });
        

    };
 
    const allImages = [selectedItem.image, ...selectedItem.images];
    let currentIndex = 0;
    
    // სურათების ჩაწერა
    const renderImages = () => {
        allImages.forEach((url, index) => {
            if (url && url.trim() !== "") {  // შემოწმება, რომ URL არ არის ცარიელი, ზეოგჯერ არიში ცარიელი დატა გაიპრება ხოლმე
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = selectedItem.name;
                imgElement.width = 100;
                imgElement.height = 100;
    
                // სურათზე დაკლიკების დროს გახსენი მოდალის ფანჯარა
                imgElement.addEventListener('click', function() {
                    openModal(index);  // აქ ინდექსი სწორი იქნება
                });
    
                // სურათზე მყარი გადასვლა
                imgElement.addEventListener('mouseenter', () => renderMainImage(url));
    
                detailImagesAllWrapper.appendChild(imgElement);
            }
        });
    };

// მოდალის გახსნა
const openModal = (index) => {
    
    currentIndex = index;
    console.log(currentIndex, "mimdinre indeqi");
    imageModal.style.display = 'block';
    modalImage.src = allImages[index];
    modalImage.alt = selectedItem.name;
   
    const element = document.querySelector('.section1_wrapper3');
    element.style.display = 'none';  // ელემენტის დამალვა
};

// მოდალის დახურვა
closeModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
    const element = document.querySelector('.section1_wrapper3');
    element.style.display = 'block';  // ელემენტის დამალვა
});

// სურათების გადაადგილება
const navigateModal = (direction) => {
    currentIndex = (currentIndex + direction + allImages.length) % allImages.length;
    openModal(currentIndex);
};

prevBtn.addEventListener('click', () => navigateModal(-1));
nextBtn.addEventListener('click', () => navigateModal(1));

// Detail Image Wrapper-ის კლიკით გახსნა მოდალში


// სურათის გადიდება detail_img სურათზე კლიკით
detailImageWrapper.addEventListener('click', () => {
    const currentImage = document.querySelector('#detail_image_wrapper img');
    if (currentImage) {
        const imageSrc = currentImage.getAttribute('src');
        openModal(allImages.indexOf(imageSrc)); // სწორი ინდექსი
        
    }
    const element = document.querySelector('.section1_wrapper3');
    element.style.display = 'none';  // ელემენტის დამალვა

});


    // ყველაფერი ერთობლივად
    renderMainImage(selectedItem.image);
    renderImages();
    renderDetails();
   
    
} else {
    document.getElementById('itemDetails').innerHTML = '<p>აიტემი არ მოიძებნა.</p>';
}



// // ღილაკზე დაჭერის დროს ფუნქციის გაშვება -კოდის გენარცია გამოჩენა
//
    // ღილაკზე ხელის დაჭერისას დიალოგის ფანჯრის გამოჩენა
    document.getElementById("openDialogBtn").addEventListener("click", () => {
        // გამოჩენა დიალოგის ფანჯარას
        document.getElementById("dialogContainer").style.display = 'block';
        // გამოჩენა შავი ფონის
       
        // დაფარავს ღილაკს
        document.getElementById("openDialogBtn").style.display = 'none';
    });
    
    // კოდის გენერაცია
    function generateRandomNumber() {
        // შემთხვევითი ციფრი 8 ციფრამდე
        const randomNumber = Math.floor(Math.random() * 100000000); // 0 - 99999999
    
        // შექმნათ შედეგი, სადაც დაემატება "zoro"
        const result = randomNumber.toString().padStart(8, '0'); // 8 ციფრის ფორმატში
    
        // შედეგის გამოჩენა HTML-ში
        document.getElementById("result").textContent = `კოდი: ${result}`;
    
        // კოდის შედეგის ფანჯრის გახსნა
        document.getElementById("resultContainer").style.display = 'block';
        document.getElementById("dialogContainer").style.display = 'none'; // დიალოგი დაიხურება
       
    }
    
    // ღილაკზე დაჭერის დროს ფუნქციის გაშვება
    document.getElementById("generateCodeBtn").addEventListener("click", () => {
        const phoneNumber = document.getElementById("phoneNumber").value;
        if (phoneNumber.length === 9 && /^[0-9]+$/.test(phoneNumber)) {
            getdata_fur_gmail()
            generateRandomNumber();
          
            
        } else {
            alert(" შეიყვანოთ სწორი  ნომერი მაგლითად 596800554.");
        }
        
    });
    
    // დახურვის ღილაკი
    document.getElementById("closeDialogBtn").addEventListener("click", () => {
        document.getElementById("dialogContainer").style.display = 'none'; // დაიხურება დიალოგი
        document.getElementById("overlay").style.display = 'none'; // შავი ფონი დაიხურება
        document.getElementById("openDialogBtn").style.display = 'block'; // ისახება ღილაკი
    });
// ღილაკის და მენიუს ჩართვა/დახურვა burgeri
    const burgerBtn = document.getElementById('burgerBtn');
    const section1Wrapper3 = document.getElementById('section1Wrapper3');

    // როდესაც ბურგერ ღილაკზე დავაჭერთ
    burgerBtn.addEventListener('click', function() {
        // toggle კლასი, რომ გავხსნათ ან დავხუროთ მენიუ
        section1Wrapper3.classList.toggle('open');
    });
// მონცმების აღება რათა გავგზვნო მეილზე
function getdata_fur_gmail(){
    const fullName=document.getElementById('fullName').value
    
    const phoneNumber=document.getElementById('phoneNumber').value //ხელიტ ივსება ჰტმლში
    
    const select_item_name=document.getElementById('select_item_name').innerText;//რადგან დინმიურად ივსეა ჯსიტ ასე ვიღებ
    
    const product_id=document.getElementById('product_id').innerText
    
    const description1=document.getElementById('description1').innerText
    
    SendMail(fullName,phoneNumber, select_item_name , product_id,description1)

}


function SendMail(fullName,phoneNumber, select_item_name , product_id,description1){ // პარმეტრებს ვაწოდებ summ ფუნქციიდან

    console.log('desc იშნიც გაიგზვნა ეს' + fullName,phoneNumber, select_item_name , product_id,description1)
    var params={
            
        message: "სახელი გვარი : " + fullName+ 
        " ,  " + "ტელ :"  + phoneNumber+ 
        
         ", " + " პროდუქტის სახელი : "  + select_item_name +
         " ,   " +"პროდუქტის იდ :"  + product_id+
         " ,   " +"აღწერა1:"  + description1 
        
    }
         // აქ ემილის პარმეტრბი წერია ,emailjs რაც მომანიჭა .. 1-service id . წერია email service განყოფილბში
        //  მე-2 პარმეტრია template id, ნახავ > email template განყოფილბაში >settings >Template ID ინფუთში რაც უწერია
    emailjs.send("service-matchara_18", "template_0843m4r",params).then(function(res){
        alert("თქვენი მონაცმები შენახულია")
        hideDialog()  // დახურავს დიალოგს ეს მიეხმარება გაასუფტავოს ფორმა რეგისტრციის

    
    })
}
