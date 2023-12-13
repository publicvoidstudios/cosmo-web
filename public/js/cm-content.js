let content_parent_name;
let content_type;
let content_param_1;
let content_param_2;
function loadContent () {
    fetch('/load-content', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            subsection_id: content_parent_name,
            content_type: content_type,
            param1: content_param_1,
            param2: content_param_2
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
//Load content
loadContent();

let content_parent_names;
let content_types;
let content_param_1s;
let content_param_2s;

//Store loaded content in arrays
const content = JSON.parse(localStorage.getItem('content'));

if (Array.isArray(content)) {
    content_parent_names = content.map(item => item.subsection_id);
    content_types = content.map(item => item.content_type);
    content_param_1s = content.map(item => item.param1);
    content_param_2s = content.map(item => item.param2);
} else {
    console.log("Invalid data format. Expected an array. Perhaps there is no content. Try creating some.");
}

//Create content html elements
function CreateContent(content_parent_name, content_type, content_param_1, content_param_2){
    //Common logic of content creation:
    //Get list of subsections and get their names and parent's names
    let subsections = JSON.parse(localStorage.getItem('subsections'));
    let subsectionsHTMLIDs = subsections.map(item => item.html_id);
    let subsectionsParents = subsections.map(item => item.parent_section_name);
    
    //Get name of parent section of subsection by index of inserted parent subsection
    let sectionName = subsectionsParents[subsectionsHTMLIDs.indexOf(content_parent_name)]
    
    //Get list of sections names and IDs:
    let sections = JSON.parse(localStorage.getItem('sections'));
    let sectionsNames = sections.map(item => item.name);
    let sectionsIDs = sections.map(item => item.html_id);
    
    //Finally get section html ID by it's name:
    let sectionHTMLID = sectionsIDs[sectionsNames.indexOf(sectionName)];
    
    //Get target ID of parent for content "anatomy-sub_anatomy_heart-div"
    
    let targetID = '#' + sectionHTMLID + '-sub_' + content_parent_name + '-div';
    //Select targetNode using target ID
    let targetNode = document.querySelector(targetID);
    
    //Separated logic according to content type:
    switch (content_type){
        case 'image':
            console.log(`Creating ${content_type} content in ${targetID}`)
            //Select gallery's items container as parent
            let targetContainer = 
                targetNode
                .querySelector('.gallery') //This selector makes difference for cases
                .querySelector('.sub-items-container');
            
            //Create sub-item container
            let subItem = document.createElement('div');
            
            //Assign classes:
            subItem.classList.add('sub-item');
            subItem.classList.add('image'); //Makes difference
            
            //Create image container
            let imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            
            //Create description
            let imageDescription = document.createElement('p');
            imageDescription.classList.add('sub-item-desc');
            
            //Put encoded description to innerHtml of paragraph
            imageDescription.innerHTML = decodeURI(content_param_2);
            
            //Create image element
            let image = document.createElement('img');
            
            //Put decoded URL from DB to img src
            image.src = content_param_1;
            image.alt = '';
            
            //Put sub item to target container
            targetContainer.append(subItem);
            
            //Put image container and description into sub item
            subItem.append(imageContainer, imageDescription);
            
            //Put image into image container
            imageContainer.append(image);     
            
            return;
        case 'video':
            console.log(`Creating ${content_type} content in ${targetID}`)
            //Select gallery's items container as parent
            let targetContainerForVideo =
                targetNode
                    .querySelector('.videos') //This selector makes difference for cases
                    .querySelector('.sub-items-container');

            //Create sub-item container
            let subItemVideo = document.createElement('div');

            //Assign classes:
            subItemVideo.classList.add('sub-item-video'); //Makes difference

            subItemVideo.innerHTML = content_param_2;

            //Put sub item to target container
            targetContainerForVideo.append(subItemVideo);

            return;
        case 'article':
            console.log(`Creating ${content_type} content in ${targetID}`)
            //Select gallery's items container as parent
            let targetContainerForArticle =
                targetNode
                    .querySelector('.articles') //This selector makes difference for cases
                    .querySelector('.sub-items-container');

            //Create sub-item container
            let subItemArticle = document.createElement('div');

            //Assign classes:
            subItemArticle.classList.add('sub-item');
            subItemArticle.classList.add('article'); //Makes difference

            //Create article name
            let subItemName = document.createElement('p');
            subItemName.classList.add('sub-item-name');
            
            //Put name to innerHtml of paragraph
            subItemName.innerHTML = content_param_1;

            //Create article description
            let subItemDesc = document.createElement('p');
            subItemDesc.classList.add('sub-item-desc');

            //Put description to innerHtml of paragraph
            subItemDesc.innerHTML = content_param_2;

            //Put sub item to target container
            targetContainerForArticle.append(subItemArticle);

            //Put image container and description into sub item
            subItemArticle.append(subItemName, subItemDesc);

            return;
        case 'pptx':
            console.log(`Creating ${content_type} content in ${targetID}`)
            //Select gallery's items container as parent
            let targetContainerForPPTX =
                targetNode
                    .querySelector('.presentations') //This selector makes difference for cases
                    .querySelector('.sub-items-container');

            //Create sub-item container
            let subItemPPTX = document.createElement('div');

            //Assign classes:
            subItemPPTX.classList.add('sub-item'); //Makes difference
            
            let pptxContainer = document.createElement('div');
            
            pptxContainer.classList.add('pptx');

            subItemPPTX.innerHTML = content_param_2;
            
            let pptxName = document.createElement('p');
            
            pptxName.classList.add('sub-item-name');
            
            pptxName.innerHTML = content_param_1;

            //Put sub item to target container
            targetContainerForPPTX.append(subItemPPTX);
            
            subItemPPTX.append(pptxContainer, pptxName);

            return;
        default:
            console.log(`Can't identify content type: ${content_type}. Parameter 1: ${content_param_1}`);
    }
}

if(content !== "Error: No content found."){
    for(let i = 0; i < content.length; i++){
        CreateContent(content_parent_names[i], content_types[i], content_param_1s[i], content_param_2s[i]);
    }
}
