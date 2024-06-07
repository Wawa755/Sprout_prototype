document.addEventListener('DOMContentLoaded', () => {

    /*HOT DEALS--------------------------------------------------------------------------*/

    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');
    let index = 0;

    dots[0].style.backgroundColor = '#F35E00'; // Set initial active color

    slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });

    const moveSlide = () => {
        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    };

    const removeDotsActiveColor = () => {
        dots.forEach((dot) => {
            dot.style.backgroundColor = '#D9D9D9'; // Set inactive color
        });
    };

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
            index = i;
            removeDotsActiveColor();
            e.target.style.backgroundColor = '#F35E00'; // Set active color
            moveSlide();
        });
    });

    /*CATEGORIES--------------------------------------------------------------------------*/
    
    const setupSlider = (sliderSelector) => {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let velX = 0;
        let momentumID;

        const cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumID);
        };

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        };

        const momentumLoop = () => {
            slider.scrollLeft += velX * 2;
            velX *= 0.95;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        };

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
            const walk = x - startX; //scroll-fast
            const prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        slider.addEventListener('wheel', () => {
            cancelMomentumTracking();
        });

        slider.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            window.requestAnimationFrame(() => {
                slider.scrollTo({ top: 0, left: slider.scrollLeft + (evt.deltaY * 2), behavior: "smooth" });
            });
        });
    };

    setupSlider('.Cat_cards');
    setupSlider('.Sea_Cards');
    setupSlider('.Res_Cards');
});
