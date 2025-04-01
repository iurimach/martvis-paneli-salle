

 
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
console.log("js parnet open")
// ფილტრის ფუნქცია (კატეგორიის მიხედვით)
async function filterCategory() {
    try {
        // მონაცემების მიღება
        const data = await fetchData();

        // ფილტრაციის მიხედვით გაფილტრო კატეგორიები
        const filteredItems = data.filter(item => 
            item.category.includes("ტექნიკა") || item.category.includes("მსხვილი ტექნიკა") || item.category.includes("სამზარეულოს ტექნიკა") || item.category.includes("ტელეფონი")
        );
        
        // გამოტანა განახლებულ მონაცემების
        catalogMenu.style.display = "none"  //კატლოგის ჩამოშლილ ღილაკს აკეცავს,იტემის მოძებნის შემთხვევაში
        displayItems(filteredItems);  // ეს ფუნქცია იქნება გარე ფუნქცია, რომელიც აჩვენებს შედეგებს
    } catch (error) {
        console.error('შეცდომა ფილტრაციისას:', error);
    }
}

// გახსნის კოდი, რომ ფილტრი გაშვება
window.onload = function() {
    filterCategory();  // ეს ავტომატურად გამოიძახებს filterCategory() ფუნქციას
};