/*==================================================
DIGITAL AGENCY
SCRIPT.JS
PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    ELEMENTS
    ==================================================*/

    const header = document.querySelector("header");

    const cards = document.querySelectorAll(".card");

    const stats = document.querySelector(".stats h2");

    const links = document.querySelectorAll('nav a[href^="#"]');



    /*==================================================
    INITIAL CLASSES
    ==================================================*/

    cards.forEach(card => {

        card.classList.add("fade-up");

    });



    /*==================================================
    INTERSECTION OBSERVER
    ==================================================*/

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15,

        rootMargin:"0px 0px -60px 0px"

    });



    cards.forEach(card=>{

        observer.observe(card);

    });



    /*==================================================
    HEADER SCROLL
    ==================================================*/

    function handleHeader(){

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    }

    handleHeader();

    window.addEventListener("scroll",handleHeader);



    /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    links.forEach(link=>{

        link.addEventListener("click",(e)=>{

            const id = link.getAttribute("href");

            if(id === "#") return;

            const section = document.querySelector(id);

            if(!section) return;

            e.preventDefault();

            section.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });



    /*==================================================
    COUNTER
    ==================================================*/

    function animateCounter(element,end){

        let current = 0;

        const duration = 1800;

        const step = end/(duration/16);



        function update(){

            current += step;

            if(current < end){

                element.textContent =

                Math.floor(current) + "+";

                requestAnimationFrame(update);

            }

            else{

                element.textContent =

                end + "+";

            }

        }

        update();

    }



    if(stats){

        const counterObserver = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    animateCounter(stats,250);

                    counterObserver.disconnect();

                }

            });

        },{

            threshold:.5

        });



        counterObserver.observe(stats);

    }



    /*==================================================
    HERO LOAD ANIMATION
    ==================================================*/

    const hero = document.querySelector(".hero");



    if(hero){

        hero.style.opacity="0";

        hero.style.transform="translateY(40px)";



        setTimeout(()=>{

            hero.style.transition="1s cubic-bezier(.22,1,.36,1)";

            hero.style.opacity="1";

            hero.style.transform="translateY(0)";

        },250);

    }



});
/*==================================================
CARD GLOW
==================================================*/

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--mouse-x",x+"px");
        card.style.setProperty("--mouse-y",y+"px");

    });

});


/*==================================================
3D TILT
==================================================*/

cards.forEach(card=>{

    let frame;

    card.addEventListener("mousemove",(e)=>{

        cancelAnimationFrame(frame);

        frame=requestAnimationFrame(()=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x-rect.width/2)/rect.width)*8;

            const rotateX=-((y-rect.height/2)/rect.height)*8;

            card.style.transform=
            `perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)`;

        });

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/*==================================================
HERO PARALLAX
==================================================*/

if(hero){

    window.addEventListener("mousemove",(e)=>{

        const x=(e.clientX/window.innerWidth-.5)*20;

        const y=(e.clientY/window.innerHeight-.5)*20;

        hero.style.transform=

        `translate(${x}px,${y}px)`;

    });

}


/*==================================================
BUTTON RIPPLE
==================================================*/

document.querySelectorAll(".telegram-btn,.cta a").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        const circle=document.createElement("span");

        const rect=btn.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        circle.style.width=size+"px";
        circle.style.height=size+"px";

        circle.style.position="absolute";
        circle.style.borderRadius="50%";

        circle.style.left=(e.clientX-rect.left-size/2)+"px";
        circle.style.top=(e.clientY-rect.top-size/2)+"px";

        circle.style.background="rgba(255,255,255,.35)";
        circle.style.transform="scale(0)";
        circle.style.pointerEvents="none";
        circle.style.transition=".7s";

        btn.appendChild(circle);

        requestAnimationFrame(()=>{

            circle.style.transform="scale(2.8)";
            circle.style.opacity="0";

        });

        setTimeout(()=>{

            circle.remove();

        },700);

    });

});


/*==================================================
SCROLL TO TOP
==================================================*/

const topButton=document.createElement("button");

topButton.className="scroll-top";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }

    else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
PAGE LOADER
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*==================================================
RAF OPTIMIZATION
==================================================*/

let ticking=false;

window.addEventListener("scroll",()=>{

    if(!ticking){

        requestAnimationFrame(()=>{

            handleHeader();

            ticking=false;

        });

        ticking=true;

    }

});
