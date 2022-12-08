//navbar function 

window.onload = function() {showData();};


//Navbar function
$(function () {
  $(document).scroll(function () {
      var $nav = $("#menu");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});


//Navbar scroll effect
var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 915}});
var controller1 = new ScrollMagic.Controller({globalSceneOptions: {duration: 670}});
var controller2 = new ScrollMagic.Controller({globalSceneOptions: {duration: 1150}});
var controller3 = new ScrollMagic.Controller({globalSceneOptions: {duration: 750}});
var controller4 = new ScrollMagic.Controller({globalSceneOptions: {duration: 750}});


// build scenes
new ScrollMagic.Scene({triggerElement: "#home"})
.setClassToggle("#Home", "active-nav") // add class toggle
.addTo(controller);

new ScrollMagic.Scene({triggerElement: "#whatIdo"})
.setClassToggle("#todo", "active-nav") // add class toggle
.addTo(controller1);

new ScrollMagic.Scene({triggerElement: "#about"})
.setClassToggle("#About", "active-nav") // add class toggle
.addTo(controller2);

new ScrollMagic.Scene({triggerElement: "#works"})
.setClassToggle("#Works", "active-nav") // add class toggle
.addTo(controller3);


new ScrollMagic.Scene({triggerElement: "#contact"})
.setClassToggle("#Contact", "active-nav") // add class toggle
.addTo(controller4);


//Loader
var loader = document.getElementById("load");
setTimeout(function() {
    loader.style.display="none";
}, 3000)



//Email  form
const ContactForm = document.querySelector('.contact-form');

let Name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');



ContactForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    let FormData = {
      name:Name.value, 
      email:email.value, 
      phone:phone.value,
      message:message.value
    }
 
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/');
  xhr.setRequestHeader('content-type','application/json');
  xhr.onload = function(){
      console.log(xhr.responseText);
      if(xhr.responseText == 'success'){
        Toastify({
          text: "Email Sent Successfully 😊",
          backgroundColor: '#269900',
          duration: 2100
          }).showToast();

          Name.value = '';
          email.value = '';
          phone.value = '';
          message.value = '';
      }
      else {
        Toastify({
          text: "Something Went Wrong! 🤷‍♂️",
          duration: 2100,
          backgroundColor: '#de0b0b',
          }).showToast();
      }
  }

  xhr.send(JSON.stringify(FormData));

});


// slider 
 // Initialize Swiper 
 
 var swiper = new Swiper(".mySwiper", {
   effect: "coverflow",
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: "auto",
   coverflowEffect: {
     rotate: 50,
     stretch: 0,
     depth: 100,
     modifier: 1,
     slideShadows: true,
   },
   loop: true,
   autoplay : {
     delay: 2500,
     disableOnInteraction: false,
   },
   pagination: {
     el: ".swiper-pagination",
   },
 });

//Typing effect

var typed = new Typed(".auto-type", {
  strings: ["Web Developer","Tech Enthusiast","Web Designer"],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true
})



//bottom up 

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '200');
});


// age 

var birth = new Date('1997-07-24');
var now = new Date();
var difference = now - birth;
// Dates are set from 1970, so remove that to get the year 
var age = new Date(difference).getFullYear() - 1970

var span = document.getElementById('age');
span.innerHTML = age;


//github projects:

function showData(){
  var repos = document.getElementById('repos');
  fetch('https://api.github.com/users/Dineshkumar510').then(function (response) {
	return response.json();
}).then(function (data) {
  repos.innerHTML = data.public_repos;
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});
}
