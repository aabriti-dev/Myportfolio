/*=========================================
        SKILL CIRCLE ANIMATION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const circles = document.querySelectorAll(".circle");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const circle = entry.target;
            const progress = circle.querySelector(".progress");
            const number = circle.querySelector(".number");

            const percent = parseInt(circle.dataset.percent);

            const radius = 60;
            const circumference = 2 * Math.PI * radius;

            progress.style.strokeDasharray = circumference;
            progress.style.strokeDashoffset = circumference;

            let current = 0;

            const timer = setInterval(() => {

                current++;

                number.textContent = current + "%";

                const offset =
                    circumference - (current / 100) * circumference;

                progress.style.strokeDashoffset = offset;

                if (current >= percent) {
                    clearInterval(timer);
                }

            }, 18);

            observer.unobserve(circle);

        });

    }, {
        threshold: 0.4
    });

    circles.forEach(circle => observer.observe(circle));

});

/*=========================================
        SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// /*=========================================
//         SKILL CIRCLE ANIMATION
// =========================================*/

// const circles=document.querySelectorAll(".circle");

// const circleObserver=new IntersectionObserver(entries=>{

// entries.forEach(entry=>{

// if(entry.isIntersecting){

// const circle=entry.target;

// const percent=+circle.dataset.percent;

// const progress=circle.querySelector(".progress");

// const number=circle.querySelector(".number");

// const radius=60;

// const circumference=2*Math.PI*radius;

// progress.style.strokeDasharray=circumference;

// let value=0;

// const timer=setInterval(()=>{

// if(value>=percent){

// clearInterval(timer);

// }else{

// value++;

// number.innerHTML=value+"%";

// progress.style.strokeDashoffset=

// circumference-(value/100)*circumference;

// }

// },18);

// circleObserver.unobserve(circle);

// }

// });

// },{threshold:.5});

// circles.forEach(circle=>{

// circleObserver.observe(circle);

// });


// /*=========================================
//         EXPERIENCE COUNTERS
// =========================================*/

// function counter(id,target,speed){

// let count=0;

// const element=document.getElementById(id);

// const timer=setInterval(()=>{

// if(count>=target){

// clearInterval(timer);

// }else{

// count++;

// element.innerHTML=count+"+";

// }

// },speed);

// }

// const experienceObserver=new IntersectionObserver(entries=>{

// entries.forEach(entry=>{

// if(entry.isIntersecting){

// counter("years",1,800);

// counter("projectsCounter",4,350);

// experienceObserver.disconnect();

// }

// });

// });

// const experience=document.querySelector(".experience");

// if(experience){

// experienceObserver.observe(experience);

// }


// /*=========================================
//         SCROLL REVEAL
// =========================================*/

// const hidden=document.querySelectorAll(

// ".skill-card,.exp-card,.project-card,.about-content,.about-image"

// );

// const reveal=new IntersectionObserver(entries=>{

// entries.forEach(entry=>{

// if(entry.isIntersecting){

// entry.target.classList.add("show");

// }

// });

// },{threshold:.2});

// hidden.forEach(el=>{

// el.classList.add("hidden");

// reveal.observe(el);

// });


// /*=========================================
//         ACTIVE NAVBAR
// =========================================*/

// const sections=document.querySelectorAll("section");

// const navLinks=document.querySelectorAll("nav ul li a");

// window.addEventListener("scroll",()=>{

// let current="";

// sections.forEach(section=>{

// const top=section.offsetTop-200;

// const height=section.clientHeight;

// if(pageYOffset>=top){

// current=section.getAttribute("id");

// }

// });

// navLinks.forEach(link=>{

// link.classList.remove("active");

// if(link.getAttribute("href")==="#"+current){

// link.classList.add("active");

// }

// });

// });



// const circles = document.querySelectorAll(".circle");

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {

//         if(entry.isIntersecting){

//             const circle = entry.target;
//             const progress = circle.querySelector(".progress");
//             const number = circle.querySelector(".number");

//             const percent = Number(circle.dataset.percent);

//             const radius = 60;
//             const circumference = 2 * Math.PI * radius;

//             progress.style.strokeDasharray = circumference;

//             let current = 0;

//             const counter = setInterval(() => {

//                 if(current >= percent){
//                     clearInterval(counter);
//                 }else{
//                     current++;
//                 }

//                 number.textContent = current + "%";

//                 const offset = circumference - (circumference * current) / 100;
//                 progress.style.strokeDashoffset = offset;

//             },20);

//             observer.unobserve(circle);
//         }

//     });
// },{
//     threshold:0.5
// });

// circles.forEach(circle=>{
//     observer.observe(circle);
// });

const player = SC.Widget(
    document.getElementById("soundcloudPlayer")
);

const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!isPlaying) {
        player.play();

        musicBtn.textContent = "⏸️";
        musicText.textContent = "Vibing... ✨";

        isPlaying = true;

    } else {
        player.pause();

        musicBtn.textContent = "🎵";
        musicText.textContent = "Play my vibe";

        isPlaying = false;
    }

});

// contact us 

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formStatus.textContent = "";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    formStatus.textContent =
      "Message sent successfully! Thank you for reaching out.";

    contactForm.reset();

  } catch (error) {
    formStatus.textContent =
      "Something went wrong. Please try again.";

  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <span>↗</span>';
  }
});
