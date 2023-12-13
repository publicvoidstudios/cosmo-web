// region {LET, CONST} Variables for fields
//ID
let sub_id;
//Parent name
let sub_parent_name = document.querySelector('#ss-parent-name');
//Subsection name
let sub_name = document.querySelector('#ss-name');
//HTML ID
let sub_html_id = document.querySelector('#ss-html-id');
//IMAGE URL
let sub_img_url = document.querySelector('#ss-img-url');
//FIND DATA BUTTON
const ss_sendBtn = document.querySelector('.ss-send');

let id;
//Get name field
const ms_name = document.querySelector('#ms-name');
//Get html_id field
const ms_html_id = document.querySelector('#ms-html_id');
//Get img_url field
const ms_img_url = document.querySelector('#ms-img_url');
//Get send button
const ms_sendBtn = document.querySelector('.ms-send');

let content_id;
let content_parent_name = document.querySelector('#content-parent-name');
let content_type = document.querySelector('#content-type');
let content_param_1 = document.querySelector('#content-param-1');
let content_param_2 = document.querySelector('#content-param-2');
let content_send_button = document.querySelector('.content-send');

// endregion

// region {OnClick EVENT} Event listeners for send data to database buttons

ms_sendBtn.addEventListener('click', () => {
    fetch('/create-section', {        
        method: 'post',        
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            ms_name: ms_name.value,
            ms_html_id: ms_html_id.value,
            ms_img_url: ms_img_url.value
        })
    })
        .then(res => res.json())
    .then(data =>{
        if(data.ms_name){
            alert('content added');
        } else {         
            alert(data);            
        }
    });
})

content_send_button.addEventListener('click', () => {

    fetch('/create-content', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            content_parent_name: content_parent_name.value,
            content_type: content_type.value,
            content_param_1: content_param_1.value,
            content_param_2: content_param_2.value
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json(); // Parse the response as JSON
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (data.ms_name) {
                alert('content added');
            } else {
                alert(data);
            }
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred');
        });
});

//FORM SUBMISSION ONCLICK
ss_sendBtn.addEventListener('click', () => {
    fetch('/create-subsection', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            sub_parent_name: sub_parent_name.value,
            sub_name: sub_name.value,
            sub_html_id: sub_html_id.value,
            sub_img_url: sub_img_url.value
        })
    })
        .then(res => res.json())
        .then(data =>{
            if(data.ms_name){
                alert('content added');
            } else {
                alert(data);
            }
        });
});
//endregion

//region {FUNCTION} Remove a row from a database table function
function removeRow(id, remove_url) {
    // Create the fetch request
    fetch(remove_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to remove row from the database.');
                
            }
            alert(`Раздел с ID: ${id} успешно удален. Обновите страницу.`);
            console.log(`Row with ID: ${id} successfully removed!`);
        })
        .catch((error) => {
            console.error(error);
        });
}

//endregion 

//region {FUNCTION} Loading data from database functions
function loadSections(){
    fetch('/load-sections', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            id: id,
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
function loadSubSections(){
    fetch('/load-subsections', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            id: sub_id,
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
function loadContent(){
    fetch('/load-content', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            id: content_id,
            content_parent_name: content_parent_name,
            content_type: content_type,
            content_param_1: content_param_1,
            content_param_2: content_param_2
        })
    })
        .then(res => res.json())
        .then(data => {
            storeContent(data);
        });
    const storeContent = (data) => {
        localStorage.setItem('content', JSON.stringify(data));
    }
}

function loadAll(){
    loadSections();
    loadSubSections();
    loadContent();
}

loadAll();

//endregion

// region {LET} Variables for arrays containing extracted data from databases
let ids;
let names;
let html_ids;
let img_urls;

let ss_ids;
let ss_parent_names;
let ss_names;
let ss_html_ids;
let ss_img_urls;

let content_ids;
let content_parent_names;
let content_types;
let content_param_1s;
let content_param_2s;
// endregion

//region {JSON.parse => Array} Retrieving data from localStorage and parsing it to arrays

//Get data as a string and parse it to array
const sections = JSON.parse(localStorage.getItem('sections'));
//Now make separated arrays containing necessary data
if (Array.isArray(sections)) {
    ids = sections.map(item => item.id);
    names = sections.map(item => item.name);
    html_ids = sections.map(item => item.html_id);
    img_urls = sections.map(item => item.img_url);
} else {
    console.log(`Invalid data format. Expected an array. Result: ${sections}`);
}

//Get data as a string and parse it to array
const subsections = JSON.parse(localStorage.getItem('subsections'));
//Now make separated arrays containing necessary data
if (Array.isArray(subsections)) {
    ss_ids = subsections.map(item => item.id);
    ss_parent_names = subsections.map(item => item.parent_section_name);
    ss_names = subsections.map(item => item.subsection_name);
    ss_html_ids = subsections.map(item => item.html_id);
    ss_img_urls = subsections.map(item => item.img_url)
} else {
    console.log(`Invalid data format. Expected an array. Result: ${subsections}`);
}

//Get data as a string and parse it to array
const content = JSON.parse(localStorage.getItem('content'))
//Now make separated arrays containing necessary data
if (Array.isArray(content)) {
    content_ids = content.map(item => item.id);
    content_parent_names = content.map(item => item.subsection_id);
    content_types = content.map(item => item.content_type);
    content_param_1s = content.map(item => item.param1);
    content_param_2s = content.map(item => item.param2)
} else {
    console.log(`Invalid data format. Expected an array.Result: ${content}`);
}

//endregion

//region {FUNCTION} Update sections, subsections, contents and dropdown menus functions
function UpdateSections(ids, names, html_ids, img_urls){
    let parentContainer = document.querySelector('.section-table');
    
    let parent = parentContainer.querySelector('tbody');
        
    for(let i = 0; i < sections.length; i++){
        let container = document.createElement('tr');

        container.classList.add('section-container');

        parent.appendChild(container);
        let rowIDTd = document.createElement('td');
        let sectionNameTd = document.createElement('td');
        let sectionIDTd = document.createElement('td');
        let sectionImageURLTd = document.createElement('td');
        let removeTd = document.createElement('td');
        let rowID = document.createElement('p');
        let sectionName = document.createElement('p');
        let sectionID = document.createElement('p');
        let sectionImageURL = document.createElement('img');

        rowID.classList.add('section-id');
        rowID.innerHTML = ids[i];
        sectionName.classList.add('section-name');
        sectionName.innerHTML = names[i];
        sectionID.classList.add('section-html-id');
        sectionID.innerHTML = html_ids[i];
        sectionImageURL.classList.add('section-img-url');
        sectionImageURL.src = img_urls[i];
        sectionImageURL.alt = img_urls[i];


        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-section-button')
        
        container.appendChild(rowIDTd);
        container.appendChild(sectionNameTd);
        container.appendChild(sectionIDTd);
        container.appendChild(sectionImageURLTd);
        container.appendChild(removeTd);
        
        rowIDTd.appendChild(rowID);
        sectionNameTd.appendChild(sectionName);
        sectionIDTd.appendChild(sectionID);
        sectionImageURLTd.appendChild(sectionImageURL);
        removeTd.appendChild(deleteBtn);
        
        
        sectionImageURL.onclick = () => {
            window.open(img_urls[i], '_blank').focus();
        }
    }
}

if(sections !== "Error: No sections found."){
    UpdateSections(ids, names, html_ids, img_urls);
} else {
    console.log(`No sections found. Skipping sections update...`)
}

//Update parent sections list for a dropdown menu when adding subsections
function UpdateSectionsInDropdown(){
    let dropdownElement = document.querySelector('.subsections-form-container').querySelector('.form').querySelector('#ss-parent-name');
    console.log(sections);
    console.log(names);
    for(let i = 0; i < sections.length; i++){
        let option = document.createElement('option');
        option.value = names[i];
        option.innerHTML = names[i];
        dropdownElement.appendChild(option);
    }
}
if(sections !== "Error: No sections found."){
    UpdateSectionsInDropdown();
} else {
    console.log(`No sections found. Skipping sections update...`)
}

function UpdateSubSections(ss_ids, ss_parent_names, ss_names, ss_html_ids, ss_img_urls){
    if(ss_ids === undefined){
        console.log('Subsections seems to be empty!')
        return;
    }

    let parentContainer = document.querySelector('.subsection-table');

    let parent = parentContainer.querySelector('tbody');

    for(let i = 0; i < subsections.length; i++){
        let container = document.createElement('tr');

        container.classList.add('section-container');

        parent.appendChild(container);

        let rowIDTd = document.createElement('td');
        let parentSectionNameTd = document.createElement('td');
        let subsectionNameTd = document.createElement('td');
        let subsectionIDTd = document.createElement('td');
        let subsectionImageURLTd = document.createElement('td');
        let removeTd  = document.createElement('td');

        let rowID = document.createElement('p');
        let parentSectionName = document.createElement('p');
        let subsectionName = document.createElement('p');
        let subsectionID = document.createElement('p');
        let subsectionImageURL = document.createElement('img');

        rowID.classList.add('subsection-id');
        rowID.innerHTML = ss_ids[i];
        parentSectionName.classList.add('subsection-parent-name');
        parentSectionName.innerHTML = ss_parent_names[i];
        subsectionName.classList.add('subsection-name');
        subsectionName.innerHTML = ss_names[i];
        subsectionID.classList.add('subsection-html-id');
        subsectionID.innerHTML = ss_html_ids[i];
        subsectionImageURL.classList.add('subsection-img-url');
        subsectionImageURL.src = ss_img_urls[i];
        subsectionImageURL.alt = ss_img_urls[i];

        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-subsection-button');

        container.appendChild(rowIDTd);
        container.appendChild(parentSectionNameTd);
        container.appendChild(subsectionNameTd);
        container.appendChild(subsectionIDTd);
        container.appendChild(subsectionImageURLTd);
        container.appendChild(removeTd);

        rowIDTd.appendChild(rowID);
        parentSectionNameTd.appendChild(parentSectionName);
        subsectionNameTd.appendChild(subsectionName);
        subsectionIDTd.appendChild(subsectionID);
        subsectionImageURLTd.appendChild(subsectionImageURL);
        removeTd.appendChild(deleteBtn);
    }
}

if(subsections !== "Error: No subsections found."){
    UpdateSubSections(ss_ids, ss_parent_names, ss_names, ss_html_ids, ss_img_urls);
} else {
    console.log(`No subsections found. Skipping subsections update...`)
}

//Update parent sections list for a dropdown menu
function UpdateSubSectionsInDropdown(){
    let dropdownElement = document.querySelector('.content-form-container').querySelector('.form').querySelector('#content-parent-name');
    console.log(subsections);
    console.log(ss_names);
    console.log(ss_html_ids);
    for(let i = 0; i < subsections.length; i++){
        let option = document.createElement('option');
        option.value = ss_html_ids[i];
        option.innerHTML = ss_names[i];
        dropdownElement.appendChild(option);
    }
}

if(subsections !== "Error: No subsections found."){
    UpdateSubSectionsInDropdown();
} else {
    console.log(`No subsections found. Skipping subsections update...`)
}

function UpdateContent(ids, content_parent_names, content_types, content_param_1s, content_param_2s){
    let parentContainer = document.querySelector('.content-table');

    let parent = parentContainer.querySelector('tbody');

    for(let i = 0; i < content.length; i++){
        let container = document.createElement('tr');

        container.classList.add('section-container');

        parent.appendChild(container);
        let rowIDTd = document.createElement('td');
        let contentParentNameTd = document.createElement('td');
        let contentTypeTd = document.createElement('td');
        let contentParam1Td = document.createElement('td');
        let contentParam2Td = document.createElement('td');
        let removeTd = document.createElement('td');
        let rowID = document.createElement('p');
        let contentParentName = document.createElement('p');
        let contentType = document.createElement('p');
        let contentParam1 = document.createElement('p');
        let contentParam2 = document.createElement('p');

        rowID.classList.add('content-id');
        rowID.innerHTML = ids[i];
        contentParentName.classList.add('content-subsection-id');
        contentParentName.innerHTML = content_parent_names[i];
        contentType.classList.add('content-type');
        contentType.innerHTML = content_types[i];
        contentParam1.classList.add('content-param-1');
        contentParam1.innerHTML = content_param_1s[i];
        contentParam2.classList.add('content-param-2');
        contentParam2.innerHTML = content_param_2s[i];


        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-content-button')

        container.appendChild(rowIDTd);
        container.appendChild(contentParentNameTd);
        container.appendChild(contentTypeTd);
        container.appendChild(contentParam1Td);
        container.appendChild(contentParam2Td);
        container.appendChild(removeTd);

        rowIDTd.appendChild(rowID);
        contentParentNameTd.appendChild(contentParentName);
        contentTypeTd.appendChild(contentType);
        contentParam1Td.appendChild(contentParam1);
        contentParam2Td.appendChild(contentParam2);
        removeTd.appendChild(deleteBtn);
    }
}

if(content !== "Error: No content found."){
    UpdateContent(content_ids, content_parent_names, content_types, content_param_1s, content_param_2s);
} else {
    console.log(`No content found. Skipping content update...`)
}

//endregion

//region {OnClick EVENT} Events for buttons deleting data from database

let deleteSectionButtons = document.querySelectorAll('.delete-section-button');

deleteSectionButtons.forEach(button => {
    button.onclick = () => {
        let parentNode = button.parentNode.parentNode;
        let idElement = parentNode.querySelector('.section-id');
        removeRow(idElement.innerHTML, '/remove-section');
    }
})

let deleteSubSectionButtons = document.querySelectorAll('.delete-subsection-button');

deleteSubSectionButtons.forEach(button => {
    button.onclick = () => {
        let parentNode = button.parentNode.parentNode;
        let idElement = parentNode.querySelector('.subsection-id');
        removeRow(idElement.innerHTML, '/remove-subsection');
    }
})

let deleteContentButtons = document.querySelectorAll('.delete-content-button');

deleteContentButtons.forEach(button => {
    button.onclick = () => {

        let parentNode = button.parentNode.parentNode;
        let idElement = parentNode.querySelector('.content-id');
        removeRow(idElement.innerHTML, '/remove-content');
        console.log(`Trying to remove content with ID ${idElement.innerHTML}`);
    }
})

//endregion

//region {OnClick EVENT} Creation of events for buttons closing forms adding new content to database
function closeFormListener(form_selector){
    let formContainer = document.querySelector(form_selector);
    let button = formContainer.querySelector('span')
        button.onclick = () => {
        formContainer.classList.add('hidden');
    }
}

closeFormListener('.sections-form');
closeFormListener('.subsections-form-container');
closeFormListener('.content-form-container');

//endregion

//region {OnClick EVENT} Events for buttons, opening forms

document.querySelector('.add-section-button').onclick = () => {
    document.querySelector('.sections-form').classList.remove('hidden');
}

document.querySelector('.add-subsection-button').onclick = () => {
    document.querySelector('.subsections-form-container').classList.remove('hidden');
}

document.querySelector('.add-content-button').onclick = () => {
    document.querySelector('.content-form-container').classList.remove('hidden');
}

//endregion

// region {OnClick EVENT} Nav menu buttons logic

let sectionsButton = document.querySelector('#sections');
let subSectionsButton = document.querySelector('#subsections');
let contentButton = document.querySelector('#content');
let sectionsDiv = document.querySelector('.sections');
let subSectionsDiv = document.querySelector('.subsections');
let contentDiv = document.querySelector('.content')

//region Initial display styling
//Show sections div
sectionsDiv.style.display = 'flex';
//Hide subsections div
subSectionsDiv.style.display = 'none';
//Hide content div
contentDiv.style.display = 'none';
//endregion

sectionsButton.onclick = () => {
    //Show sections div
    sectionsDiv.style.display = 'flex';
    //Hide subsections div
    subSectionsDiv.style.display = 'none';
    //Hide content div
    contentDiv.style.display = 'none';
}

subSectionsButton.onclick = () => {
    //Show sections div
    subSectionsDiv.style.display = 'flex';
    //Hide subsections div
    sectionsDiv.style.display = 'none';
    //Hide content div
    contentDiv.style.display = 'none';
}

contentButton.onclick = () => {
    //Show content div
    contentDiv.style.display = 'flex';
    //Hide sections div
    sectionsDiv.style.display = 'none';
    //Hide subsections div
    subSectionsDiv.style.display = 'none';
}

//endregion

