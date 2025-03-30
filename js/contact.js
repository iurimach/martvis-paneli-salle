try {

    document.getElementById('send_data_bt').addEventListener('click', function(e) {
        e.preventDefault(); // ფორმის სუბმიტის შეჩერება

        let phoneValue = document.getElementById('user_phone').value;

        // შეამოწმეთ, რომ ტელეფონი შეიცავს მხოლოდ 9 ციფრს
        if (!/^\d{9}$/.test(phoneValue)) {
            alert('ტელეფონის ნომერი უნდა იყოს 9 ციფრი.');
        } else {
            // თუ ნომერი სწორია, შეგიძლიათ გააგრძელოთ ფორმის გაგზავნა
            getdata_fur_gmail()
        }
    });

}
catch (error) {
    // თუ მოხდა შეცდომა, გამოვაქვეყნოთ შეცდომის მესიჯი
    console.error('შეცდომა:', error.message);
}
function getdata_fur_gmail(){

  
    const user_name=document.getElementById('user_name').value
    
    const user_phone=document.getElementById('user_phone').value //ხელიტ ივსება ჰტმლში
    
    const product_link=document.getElementById('product_link').value ;//რადგან დინმიურად ივსეა ჯსიტ ასე ვიღებ
    
    const user_adress=document.getElementById('user_adress').value 
    
    const more_details=document.getElementById('more_details').value 

 
    console.log(user_name,user_adress,user_phone,product_link,more_details)
  
    
    
    SendMail(user_name,user_adress,user_phone,product_link,more_details)

}


 
function SendMail(user_name,user_adress,user_phone,product_link,more_details){ // პარმეტრებს ვაწოდებ summ ფუნქციიდან

    
    var params={
            
        message: "სახელი გვარი : " + user_name+ 
        " ,  " + "ტელ :"  + user_phone+ 
        " ,  " + "მისამართი:"  + user_adress+ 
         ", " + " პროდუქტის სახელი : "  + product_link +
        
         " ,   " +"აღწერა1:"  + more_details
        
    }
         // აქ ემილის პარმეტრბი წერია ,emailjs რაც მომანიჭა .. 1-service id . წერია email service განყოფილბში
        //  მე-2 პარმეტრია template id, ნახავ > email template განყოფილბაში >settings >Template ID ინფუთში რაც უწერია
    emailjs.send("service-matchara_18", "template_0843m4r",params).then(function(res){
        alert("თქვენი მონაცმები შენახულია, ოპერატორი მალე დაგიკავშირდებათ")
          // დახურავს დიალოგს ეს მიეხმარება გაასუფტავოს ფორმა რეგისტრციის

    
    })
}



// ღილაკის დაჭერისას ჩატ ბოტის ღიობის მართვა
const chatButton = document.getElementById('chatButton');
const chatContainer = document.getElementById('chatContainer');
// const chatButton_close = document.getElementById('chatButton_close');

const chatButton_close = document.getElementById('chatButton_close');

chatButton.addEventListener('click', () => {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block'; // ჩატ ბოტის გახსნა
    } else {
        chatContainer.style.display = 'none'; // ჩატ ბოტის დახურვა
    }
});
chatButton_close.addEventListener('click', () => {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block'; // ჩატ ბოტის გახსნა
    } else {
        chatContainer.style.display = 'none'; // ჩატ ბოტის დახურვა
    }
});


// ყველა კითხვაზე დაჭერის შემთხვევაში პასუხის გამოჩენა/დაკეცვა
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', function() {
        const questionId = question.getAttribute('data-id');
        const answer = document.getElementById(`answer${questionId}`);

        // პასუხის_toggle გაკეთება
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block'; // პასუხის გახსნა
        } else {
            answer.style.display = 'none'; // პასუხის დახურვა
        }
    });
});