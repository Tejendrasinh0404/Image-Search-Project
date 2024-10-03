const searchParam = location.search.split("=").pop();


const access_key = 'RPkeIF9-MXKW5Ft54YCbcIuf1gdHSvx_3FNiLIRxZR4'
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`
const gallery = document.querySelector(".gallery")

let AllImages;
let CurrentImage=0;
const getImages =()=>{
    fetch(random_photo_url).then(res=>res.json())
    .then(data=>{
        AllImages = data
        makeImages(AllImages)
       
        
    });  
}
//fetch data for search images 
const searchImages =()=>{
    fetch(search_photo_url).then(res=>res.json())
    .then(data=>{
        AllImages = data.results
        makeImages(AllImages)
       
        
    });  
}
const makeImages =(data)=>{
data.forEach((item,index) => {
    let img = document.createElement("img")
    img.src = item.urls.regular;
    img.className = "gallery-img"
    gallery.appendChild(img)

    // popup Image 
    img.addEventListener("click",()=>{
        CurrentImage = index;
        showPopup(item)
    })
});
}

const showPopup =(item)=>{
let popup = document.querySelector(".image-popup");
const downloadBtn = document.querySelector(".download-btn");
const closeBtn = document.querySelector(".close-btn");
const image = document.querySelector(".large-img")

popup.classList.remove("hide")
downloadBtn.href=item.links.html;
image.src = item.urls.regular;
closeBtn.addEventListener("click",()=>{
    popup.classList.add("hide")
})
}


if(searchParam == ""){
    getImages()
}
else{
    searchImages()
}

// previous and next popup button 

const preBtns = document.querySelector(".pre-btn")
const nxtBtns = document.querySelector(".next-btn")
preBtns.addEventListener("click",()=>{
    if (CurrentImage > 0 ){
        CurrentImage --;
        showPopup(AllImages[CurrentImage])
    }
})
nxtBtns.addEventListener("click",()=>{
    if (CurrentImage < AllImages.length - 1 ){
        CurrentImage ++;
        showPopup(AllImages[CurrentImage])
    }
})

