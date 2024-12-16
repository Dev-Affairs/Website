var navCollapsedStatus = false;
gsap.registerPlugin(ScrollTrigger);
let lastProgress = 0;
var currentSection = null

window.onload = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

document.addEventListener("DOMContentLoaded", () => {  
  gsap.set(".reveal-text", { willChange: "transform, opacity" });

console.log("DOM has been initialized ---")

  const timeline = gsap.timeline();
  timeline
    .to(".reveal-text", {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power4.out",
    })
    .to(".card-wraper", {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power4.out",
    }, "-=1")
    .to(
      ".nav",
      {
        width: "80vw",
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
      },
      "-=2.5"
    )


    console.log("sections", sections);
});
const sections = gsap.utils.toArray("section");

let scrollTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".landing-page",
        start: "top top",
        endTrigger: ".another-section",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.25, max: 0.75 },
          delay: 0.125,
          ease: "power1.inOut"
        },
        scrub: 1,
        onUpdate: (self) => {
            let currentProgress = Math.round(self.progress * (sections.length - 1));
            if (currentProgress !== lastProgress) {
                console.log(`Snap completed at section index: ${currentProgress}`);
                lastProgress = currentProgress;
                currentSection = sections[currentProgress]
                console.log("currentSection--", currentSection.id)
                if(currentSection && currentSection.id == 'first-section'){
                    setTimeout(() => {
                        // expandNavbar()
                        showFullNav()
                        closeSideNav(true)
                    }, 500);
                }else{
                    // onScrollSection()
                    hideFullNav()
                }
            }
        },
        onLeave: () => {
            console.log("Timeline execution ended");
        },
        onEnter:() => {
          console.log("on onEnter --");
        //   onScrollSection()
        }
      },
  });
  let navTimeline = gsap.timeline();
  let scrollHintTimeline = gsap.timeline();
  let sideNavTimeline = gsap.timeline();

function showScrollHint(){
  scrollHintTimeline.to(
    ".scroll-hint",
    {
      display: 'grid',
      ease: "power4.out",
    }
  ).to(
    ".scroll-hint",
    {
      opacity: 0.8,
      y: 0,
      duration: 3,
      ease: "power4.out",
    }
  )
  .to(
    ".scroll-icon",
    {
      opacity: 0,
      y: 5,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.4,
      repeat: -1,
    }
  );
}

function hideScrollHint(){
  scrollHintTimeline.to(
    ".scroll-hint",
    {
      opacity: 0,
      duration: 2,
      ease: "power4.out",
    },
    "+=.5"
  ).to(
    ".scroll-hint",
    {
      display: 'none',
      ease: "power4.out",
    },
    "+=.5"
  )
}

function hideFullNav(){
  navTimeline.to('.logo',{
    y:15
  })
  .to('.nav-menu',{
    y:15
  },"-=0.4")
  .to('.nav',{
   top:"15vh"
  })
  .to('.nav',{
    opacity:0,
    display:"none"
   },"-=1")
 .to('.side-nav-toggle',{
  // x:-150,
  width:"4vw",
  height:"4vw",
  fontSize:"1.5rem",
  opacity:1,
      ease: "power4.out",
rotate:-360,
y:-50,
duration:1.4,
 },"-=1")
 
}

function showFullNav() {
  navTimeline
  .to('.nav',{
    opacity:1,
    display:"flex"
   })
  .to(".nav",{
    top:"3vh"
  },"-=0.7")
  .to('.logo',{
    y:0
  },"-=0.4")
  .to('.nav-menu',{
    y:0,
  },"-=0.8")
  .to('.side-nav-toggle',{
     opacity:0,
      ease: "power4.out",
      rotate:0,
      y:0
   },"-=1")
 
}

function openSideNav(){
  console.log("inside toggle side nav")

  toggleOverLay(true)
  sideNavTimeline
  .to('.side-nav',{
    right:0,
    duration:1,
    ease: "power4.out",
  }).to(".close-btn i",{
    y:-40
  },"-=0.5")
  .to('.side-nav-menu li p',{
    y:-40,
    stagger:0.1
  },"-=0.4")
}


function closeSideNav(isLanding = false){
  console.log("inside close side nav")
  toggleOverLay(false)
if (!isLanding) {
  sideNavTimeline.to(".close-btn i",{
    y:30
  })
  .to('.side-nav-menu li p',{
    y:40,
    stagger:0.1
  },"-=0.4")
  .to('.side-nav',{
    right:"-25vw"
  },"-=0.4")
}else{
  sideNavTimeline.to(".close-btn i",{
    y:30
  })
  .to('.side-nav-menu li p',{
    y:40,
    stagger:0.1
  },"-=0.4")
  .to('.side-nav',{
    right:"-25vw"
  },"-=0.4")
  .to(".side-nav-toggle",{
    transform:"scale(1)",
    opacity:0,
},"-=0.3")
}


}
// function onScrollSection(){
//     console.log("onScrollSection>>")
//     if(!navCollapsedStatus){
//         collapseNavBar()
//     }
// }
  
// function onNavClick(){
//     console.log("navCollapsedStatus--", navCollapsedStatus)
//     if(navCollapsedStatus){
//         expandNavbar()
//     }
// }

// function collapseNavBar(){
//     navTimeline.to(
//         ".nav-menu",
//         {
//           opacity: 0,
//           ease: "power4.out"
//         }
//       ).to(
//         ".nav-menu",
//         {
//           display: 'none',
//           width: 0,
//           ease: "power4.out"
//         }
//       ).to(
//         ".logo",
//         {
//           opacity: 0,
//           width: 0,
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".logo",
//         {
//           display: 'none',
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".nav",
//         {
//           width: '9vh',
//           padding: 0,
//           left: 'inherit',
//           height: '9vh',
//           justifyContent: 'center',
//           duration: 0.8,
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".nav",
//         {
//           borderRadius: '50%',
//           duration: 0.4,
//           ease: "power4.out"
//         }
//       ).to(
//         ".nav-expand-btn",
//         {
//           display: 'block',
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".nav-expand-btn",
//         {
//           opacity: 1,
//           duration: 0.4,
//           ease: "power4.out"
//         }, "-=.5"
//       )
//       navCollapsedStatus = true
// }

// function expandNavbar(){
//     navTimeline.to(
//         ".nav-expand-btn",
//         {
//           display: 'none',
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".nav-expand-btn",
//         {
//           opacity: 0,
//           duration: 0.4,
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".nav",
//         {
//           borderRadius: '60px',
//           duration: 0.4,
//           ease: "power4.out"
//         }
//       ).to(
//         ".nav",
//         {
//           padding: '20px 50px',
//           justifyContent: 'space-between',
//           width: '80vw',
//           // left: '50%',
//           // right: 'inherit',
//           height: '9vh',
//           duration: 1.4,
//           ease: "power4.out"
//         }, "-=.5"
//       ).to(
//         ".logo",
//         {
//           display: 'inherit',
//           ease: "power4.out"
//         }, "-=1.5"
//       ).to(
//         ".logo",
//         {
//           opacity: 1,
//           width: 'auto',
//           ease: "power4.out"
//         }, "-=1.5"
//       )
//       .to(
//         ".nav-menu",
//         {
//           display: 'flex',
//           ease: "power4.out"
//         }, "-=1"
//       ).to(
//         ".nav-menu",
//         {
//           opacity: 1,
//           width: 'auto',
//           ease: "power4.out"
//         }, "-=1"
//       )
//       navCollapsedStatus = false
// }

function onAddScroll(){

}

setTimeout(() => {
  
  showScrollHint()
}, 4000);

function toggleOverLay(flag){
  console.log("toggleOverLay--", flag)
  if(flag){
    document.getElementById('overlay').style.zIndex = 99;
    setTimeout(() => {
      document.getElementById('overlay').style.opacity = .7
    }, 200);
  }
  else{
    document.getElementById('overlay').style.opacity = 0
    setTimeout(() => {
      document.getElementById('overlay').style.zIndex = -1;
    }, 200);
  }
}

function onOverlayClick(){
  closeSideNav()
}
3.020