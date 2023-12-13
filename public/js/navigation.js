let lvl1 = document.querySelector('.container');
let lvl2;
let lvl3;

let lvl2_heading;
let lvl3_heading;

let backButton =  document.querySelector('.back-button');
let headingName = document.querySelector('.heading-name');

//Add onclick event for all navigation buttons on level 1 navigation
document.querySelectorAll('.main-section-navigator').forEach(button => {
    button.onclick = () => {
        //Change back button visibility
        backButton.classList.remove('hidden');

        //Hide container
        lvl1.classList.add('hidden');

        //Change name of heading accordingly and record name
        lvl2_heading = button.textContent;        
        headingName.innerHTML = lvl2_heading;

        //Record lvl 2
        lvl2 = document
            .querySelector('#' + button.getAttribute('id') + '-sub')
            .querySelector('.subsections-buttons');
        
        //Get necessary container, then remove hidden class from it 
        lvl2.classList.remove('hidden');
        
        //Change back button onclick function
        backButton.onclick = () => {
            //Hide current container
            lvl2.classList.add('hidden');
            
            //Change name
            headingName.innerHTML = 'Разделы';
            
            //Show parent
            lvl1.classList.remove('hidden');
            
            //Hide back button
            backButton.classList.add('hidden');
        };
    };
});

//Same for lvl2
document.querySelectorAll('.sub-section-navigator').forEach(button => {
   button.onclick = () => {
       //Hide lvl 2 container
       lvl2.classList.add('hidden');
       
       //Record lvl 3
       lvl3 = document.querySelector('#' + button.getAttribute('id') + '-div');
       
       // Show relative container
       lvl3.classList.remove('hidden');
       
       // Change name accordingly
       lvl3_heading = button.textContent;
       
       headingName.innerHTML = lvl3_heading;
       
       //Change back button onclick function
       backButton.onclick = () => {
           
           //Hide current container
           lvl3.classList.add('hidden');
           
           //Change name
           headingName.innerHTML = lvl2_heading;
           
           //Show previous section // anatomy-sub subsection-buttons remove hidden
           lvl2.classList.remove('hidden');

           //Change back button onclick function again
           backButton.onclick = () => {
               //Hide current container
               lvl2.classList.add('hidden');
               
               //Change name
               headingName.innerHTML = 'Разделы';
               
               //Show parent
               lvl1.classList.remove('hidden');
               
               //Hide back button
               backButton.classList.add('hidden');
           };
       };
   };
});

