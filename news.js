const API_KEY = "c1e97168b0f4477c89ad6e8ff0c5b66f";
const url = "https://newsapi.org/v2/everything?q=";

function relode(){
    window.location.reload();
    window.style.scrollBehavior = "smooth"
}

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("news-card-tamplates");

    cardsContainer.innerHTML = "";

 
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataiCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataiCard (cardClone,article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:"Asia/jakarta"
    });

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML =`${article.source.name}· ${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, '_blank');
    });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click' ,() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav.classList.remove('active');
    curSelectedNav = null;
});

