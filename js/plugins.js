//*Save colors to local storage */
let mainColors = localStorage.getItem('color_option');
if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color', mainColors);
            //remove active class from all li
            document.querySelectorAll('.colors-list li').forEach(element=>{
                element.classList.remove("active");

                //add active class on element with data-color === local storage item
                if(element.dataset.color === mainColors){
                    //add active class
                    element.classList.add('active');
                }
            });
            
}

/*Start Background Images*/
// Select landing Page element
let landingPage = document.getElementById('landing');
// Get Array of images
let imgArray = ['first.jpg','second.jpg','third.png','fourth.jpg','fifth.jpg']


/*End Background Images*/

/*Start gear fucntion*/
var openGear = function(){
    var setting = document.getElementById('setting');
    var gear = document.getElementById('gear');
    gear.classList.toggle('fa-spin')
    setting.classList.toggle('open');
};
/*End Gear Function*/

/*Start Change Colors*/
const colorsLi = document.querySelectorAll('.options li');

colorsLi.forEach( li => {
    li.addEventListener('click', (e) => {
        
        //set color to root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //set color to local storage
        localStorage.setItem('color_option', e.target.dataset.color);
        //remove active class from all li
        handleActive(e);
    });
});
/*End Change Colors*/
/*Start Change Random Background */
//Check if there's local storage backbround-item

let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem('background_option');
//If backgroundLocalItem not empty
if(backgroundLocalItem !== null ){
    if(backgroundLocalItem === 'true'){
         backgroundOption = true;

    }else{
        backgroundOption = false;
    }
    //Remove all active class on random background
    document.querySelectorAll('.random-background span').forEach(element =>{
        element.classList.remove('active');
    });
    if(backgroundLocalItem === 'true'){
        document.querySelector('.yes').classList.add('active');
    }else{
        document.querySelector('.no').classList.add('active');
    }
}
const BackgroundChange = document.querySelectorAll('.random-background span');

//remove active from all li
BackgroundChange.forEach( span => {
    span.addEventListener('click', (e) => {
        
        handleActive(e);
        //if the button is yes it will continue to do the setInterval if not it will clear the interval
        if(e.target.dataset.image === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background_option', true);
        }else{
 
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);

        }

    });
});

function randomizeImgs(){

    if(backgroundOption === true){
        backgroundInterval = setInterval(function(){
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            //Set Background Image
            landingPage.style.backgroundImage = 'url("images/' + imgArray[randomNumber] + '")';
        },3000);
    }
}
randomizeImgs();
/*End Change Random Background */

/*Start Skills Selector */
//Select Skills Selector
let ourSkills = document.querySelector('.our-skills');
 window.onscroll = function (){
     // Skills Offset Top
     let skillsOffsetTop = ourSkills.offsetTop;
     
     //Skills Outer Height
     let skillsOuterHeight = ourSkills.offsetHeight;

     //Window Height
     let windowHeight = this.innerHeight;

     //Window ScrollTop
     let windowScrollTop = this.pageYOffset;
     
     if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll('.skill-box .skill-progress span ');
        
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
            skill.style.backgroundColor = skill.dataset.color;
        });
    }
 };
/*End Sills Selecetor */
/*Create popup with The image*/
let ourGallery = document.querySelectorAll('.our-gallery img');

ourGallery.forEach(img =>{
    
    img.addEventListener('click', (e) =>{

        //Create Overlay Element
        let overlay = document.createElement('div');
        
        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement('div');

        //add alt name to the img
        if(img.alt !==null){
            
            //create Header
            let imgHeading = document.createElement('h3');

            //create text for Header
            let imgText = document.createTextNode(img.alt);

            //append the text to the header
            imgHeading.appendChild(imgText);

            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //Add class to the popupBox
        popupBox.className = 'popup-box';

        //Create The Image
        let popupImage = document.createElement('img');

        //Set img source
        popupImage.src = img.src;

        //add image to popupBox
        popupBox.appendChild(popupImage);

        //add the popup box to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement('span');

        //create the closeButton text
        let closeButtonText = document.createTextNode('X');

        //append text to closeButton
        closeButton.appendChild(closeButtonText);

        //add class to closeButton
        closeButton.className = 'close-button';

        //add close button to the popup Box
        popupBox.appendChild(closeButton);
     
    });

});

//close popup
document.addEventListener('click', function(e){
    if(e.target.className == 'close-button'){
        
        //remove the current popup
        e.target.parentNode.remove();

        //remove Overlay
        document.querySelector('.popup-overlay').remove();
    }
});

//close img if i click on the overlay
document.addEventListener('click', function(e){
    if(e.target.className == 'popup-overlay'){
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }

});

/*Start Nav Bullets */
//select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');
/*End Nav Bullets */

function scrollToSomeWhere(elements){

    elements.forEach(ele =>{

        ele.addEventListener('click', (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });
        });
    });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

/*Start Handle Active*/
function handleActive(ev){
    
    //remove active class from all childrens
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {

        element.classList.remove('active');
    });

    //add active class on Self
    ev.target.classList.add('active');
}
/*End Handle Active*/
/*Hide or show bullets*/
let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null){
    
    bulletsSpan.forEach(span => {

        span.classList.remove('active');
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');

    }
}

bulletsSpan.forEach(span => {
    span.addEventListener('click',(e) =>{
        
        if(span.dataset.display === 'yes'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option', 'block');
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option', 'none');

        }
        handleActive(e);
    });
});

/*Start Reset Button*/
document.querySelector('.reset-options').onclick = function(){
    // localStorage.clear();
    localStorage.removeItem('background_option');
    localStorage.removeItem('color_option');
    localStorage.removeItem('bullets_option');
    window.location.reload();
};
/*End Reset Button */
/*Start Toggle Button */
var tButton = document.querySelector('.toggle-button'),
    ourLinks = document.querySelector('.links'),
    ourSpan = document.querySelectorAll('.toggle-button span');
    tButton.onclick = function(e){

        e.stopPropagation()

        ourLinks.classList.toggle('open');
        this.classList.toggle('menu-active');
    }


    document.addEventListener('click', (e) =>{
        if(e.target !== tButton && e.target !== ourLinks){
            ourLinks.classList.remove('open');
            tButton.classList.remove('menu-active');
        }
    });

    ourLinks.onclick = function(e){
        e.stopPropagation();
    }
/*End Toggle Button */
