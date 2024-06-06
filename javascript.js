/*HOT DEALS--------------------------------------------------------------------------*/
const slides = document.querySelectorAll('.slides');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dots = document.querySelectorAll('.dot');


let index = 0;

// Adding opacity to first dot on first time

dots[0].style.backgroundColor = '#F35E00'; // Set initial active color

// positioning the slides

slides.forEach((slide,index)=>{
 slide.style.left=`${index*100}%`;
});


// move slide function

const moveSlide = () =>{
 slides.forEach((slide)=>{
  slide.style.transform=`translateX(-${index*100}%)`;
 });
};

// remove dots background color from all dots

const removeDotsActiveColor = () =>{
 dots.forEach((dot)=>{
  dot.style.backgroundColor = '#D9D9D9'; // Set inactive color
 });
};

dots.forEach((dot,i)=>{
 dot.addEventListener("click",(e)=>{
 index=i;
 removeDotsActiveColor();
 e.target.style.backgroundColor = '#F35E00'; // Set active color
 moveSlide();
 });
});

// show the previous slide

slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

// auto play slide

/*CATEGORIES--------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.Cat_cards')) {
        // Slider dragging
        const slider = document.querySelector('.Cat_cards');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking();
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        // Momentum 
        var velX = 0;
        var momentumID;

        slider.addEventListener('wheel', (e) => {
            cancelMomentumTracking();
        });

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }

        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }

        function momentumLoop() {
            slider.scrollLeft += velX * 2;
            velX *= 0.95;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }

        // Scroll
        const scrollContainer = document.querySelector(".Cat_cards");

        scrollContainer.addEventListener("wheel", (evt) => {
            evt.preventDefault();

            window.requestAnimationFrame(() => {
                scrollContainer.scrollTo({ top: 0, left: scrollContainer.scrollLeft + (evt.deltaY * 2), behavior: "smooth" });
            });
        });
    }
});