//region SECTIONS LOADING AND STORING IN LOCALSTORAGE
let ms_name;
let ms_html_id;
let ms_img_url;

let names;
let html_ids;
let img_urls;

function loadSections () {
    fetch('/load-sections', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            ms_name: ms_name,
            ms_html_id: ms_html_id,
            ms_img_url: ms_img_url
        })
    })
        .then(res => res.json())
        .then(data => {
            storeSections(data);
        });
    const storeSections = (data) => {
        localStorage.setItem('sections', JSON.stringify(data));
    }
}
//endregion

//region SUBSECTIONS LOADING AND STORING IN LOCALSTORAGE
let sub_parent_name;
let sub_name;
let sub_html_id;
let sub_img_url;

let sub_parent_names;
let sub_names;
let sub_html_ids;
let sub_img_urls;

function loadSubSections () {
    fetch('/load-subsections', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            ss_parent_name: sub_parent_name,
            ss_name: sub_name,
            ss_html_id: sub_html_id,
            ss_img_url: sub_img_url
        })
    })
        .then(res => res.json())
        .then(data => {
            storeSubSections(data);
        });
    const storeSubSections = (data) => {
        localStorage.setItem('subsections', JSON.stringify(data));
    }
}
//endregion

//region CALLING LOAD FUNCTIONS
function loadDataFromDB () {
    loadSections();
    loadSubSections();
}
loadDataFromDB();

//endregion

// region PARSING DATA FROM LOCALSTORAGE TO ARRAYS

//Get data as a string and parse it to array
const sections = JSON.parse(localStorage.getItem('sections'));
//Now make separated arrays containing necessary data
if (Array.isArray(sections)) {
    names = sections.map(item => item.name);
    html_ids = sections.map(item => item.html_id);
    img_urls = sections.map(item => item.img_url);
} else {
    console.log("Invalid data format. Expected an array. Perhaps there are no sections. Try creating one.");
}
//Get data as a string and parse it to array
const subsections = JSON.parse(localStorage.getItem('subsections'));
//Now make separated arrays containing necessary data
if (Array.isArray(subsections)) {
    sub_parent_names = subsections.map(item => item.parent_section_name);
    sub_names = subsections.map(item => item.subsection_name);
    sub_html_ids = subsections.map(item => item.html_id);
    sub_img_urls = subsections.map(item => item.img_url);
} else {
    console.log("Invalid data format. Expected an array. Perhaps there are no subsections. Try creating one.");
}

//endregion

//region FUNCTIONS TO CREATE SITE CONTENT FROM PARSED DATA
function CreateSection(name, id, img_url){
    //Get parent div
    let parent = document.querySelector('.container');
    
    let element = document.createElement("button");
    
    element.classList.add('element');
    element.classList.add('main-section-navigator');
    
    element.id = id;    
    element.setAttribute('data-tilt', '');
    
    let innerImage = document.createElement("img");    
    innerImage.src = img_url;    
    innerImage.alt = '';
    
    parent.appendChild(element);    
    element.appendChild(innerImage);
    element.append(name);
}
function CreateSubSectionsContainers() {
    let parent = document.querySelector('.container');
    
    let allChildren = parent.querySelectorAll('button');

    let place = document.querySelector('.all-subsections-container');

    allChildren.forEach(button => {
        console.log(button.id);
        
        let element = document.createElement('div');
        element.classList.add('subsections-container');
        element.id = button.id + '-sub';
        
        
        let buttonDiv = document.createElement('div');
        
        buttonDiv.classList.add('subsections-buttons');
        buttonDiv.classList.add('hidden');
        
        place.prepend(element);
        element.prepend(buttonDiv);        
    });
    
}
function CreateSubSection(sub_parent_name, sub_name, sub_html_id, sub_img_url){
    console.log(`Creating subsection: ${sub_name}`);
    //Get sub parent html id
    let parentHTMLID = html_ids[names.indexOf(sub_parent_name)];
    console.log(`parentHTMLID: ${parentHTMLID}`);
    //Select parent div
    let parentDIV = document.querySelector('#' + parentHTMLID + '-sub');
    
    let buttonsContainer = parentDIV.querySelector('.subsections-buttons');
    //Create a button leading to subsection
    let button = document.createElement('button');
    button.classList.add('element');
    button.classList.add('sub-section-navigator');
    button.setAttribute('data-tilt', '');
    button.id = parentHTMLID + '-sub' + '_' + sub_html_id;

    let innerImage = document.createElement("img");
    innerImage.src = sub_img_url;
    innerImage.alt = '';

    buttonsContainer.appendChild(button);
    button.appendChild(innerImage);
    button.append(sub_name);
    //Create blank container for subsection
    CreateSubSectionDiv(parentHTMLID + '-sub', '_' + sub_html_id);
}
function CreateSubSectionDiv (parent_html_id, sub_html_id) {
    //Get location for content
    let parent = document.querySelector('#' + parent_html_id);
    
    //Create container
    let container = document.createElement('div');
    container.classList.add('sub-div-container');
    container.classList.add('hidden');
    container.id = parent_html_id + sub_html_id + '-div';
    
    //Create divs for subsection container
    let galleryDiv = document.createElement('div');
    let videoDiv = document.createElement('div');
    let articlesDiv = document.createElement('div');
    let pptxDiv = document.createElement('div');
    
    //Assign common class
    galleryDiv.classList.add('sub');
    videoDiv.classList.add('sub');
    articlesDiv.classList.add('sub');
    pptxDiv.classList.add('sub');
    
    //Assign defining classes
    galleryDiv.classList.add('gallery');
    videoDiv.classList.add('videos');
    articlesDiv.classList.add('articles');
    pptxDiv.classList.add('presentations');
    
    //Pre-create gallery
    let galleryPopUp = document.createElement('div');
    galleryPopUp.classList.add('pop-up');
    let galleryCloseSpan = document.createElement('span');
    galleryCloseSpan.innerHTML = '&times;';
    let galleryPopUpImg = document.createElement('img');
    galleryPopUpImg.src = '';
    galleryPopUpImg.alt = '';
    let galleryPopUpParagraphDescription = document.createElement('p');
    galleryPopUpParagraphDescription.classList.add('gallery-img-desc');
    
    let galleryName = document.createElement('p');
    galleryName.classList.add('sub-name');
    galleryName.innerHTML = 'Галерея';
    
    let galleryItemsContainer = document.createElement('div');
    galleryItemsContainer.classList.add('sub-items-container');
    
    //Pre-create videos
    let videosName = document.createElement('p');
    videosName.classList.add('sub-name');
    videosName.innerHTML = 'Видео';

    let videosItemsContainer = document.createElement('div');
    videosItemsContainer.classList.add('sub-items-container');
    
    //Pre-create articles
    let articlesPopUp = document.createElement('div');
    articlesPopUp.classList.add('pop-up');
    let articlesCloseSpan = document.createElement('span');
    articlesCloseSpan.innerHTML = '&times;';
    let articlesPopUpContainer = document.createElement('div');
    articlesPopUpContainer.classList.add('article-container');
    let articlesPopUpName = document.createElement('p');
    articlesPopUpName.classList.add('article-name');
    let articlesPopUpText = document.createElement('p');
    articlesPopUpText.classList.add('article-text');

    let articlesName = document.createElement('p');
    articlesName.classList.add('sub-name');
    articlesName.innerHTML = 'Статьи';

    let articlesItemsContainer = document.createElement('div');
    articlesItemsContainer.classList.add('sub-items-container');
    
    //Pre-create presentations
    let pptxName = document.createElement('p');
    pptxName.classList.add('sub-name');
    pptxName.innerHTML = 'Презентации';

    let pptxItemsContainer = document.createElement('div');
    pptxItemsContainer.classList.add('sub-items-container');
    
    //Finally place all pre-created elements on page
    parent.appendChild(container);
    
    container.append(galleryDiv, videoDiv, articlesDiv, pptxDiv);
    
    galleryDiv.append(galleryPopUp, galleryName, galleryItemsContainer);
    galleryPopUp.append(galleryCloseSpan, galleryPopUpImg, galleryPopUpParagraphDescription);
    
    videoDiv.append(videosName, videosItemsContainer);
    
    articlesDiv.append(articlesPopUp, articlesName, articlesItemsContainer);
    articlesPopUp.append(articlesCloseSpan, articlesPopUpContainer);
    articlesPopUpContainer.append(articlesPopUpName, articlesPopUpText);
    
    pptxDiv.append(pptxName, pptxItemsContainer);
}
//endregion

// region CALLING CREATE FUNCTIONS
//Finally create a forEach loop to create content if there are sections
if(sections !== "Error: No sections found."){
    for(let i = 0; i < sections.length; i++){
        CreateSection(names[i], html_ids[i], img_urls[i]);
    }
}

//Create containers for subsections according to sections
CreateSubSectionsContainers();
//Create subsections from database if there are subsections
if(subsections !== "Error: No subsections found."){
    for(let i = 0; i < subsections.length; i++){
        CreateSubSection(sub_parent_names[i], sub_names[i], sub_html_ids[i], sub_img_urls[i]);
    }
}
//endregion

