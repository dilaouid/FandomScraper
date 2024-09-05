let isTransitioning = false;

document.querySelectorAll('.main-container').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const title = card.querySelector('.poster').alt.split(" ")[0];
        const overlayImage = `./assets/img/animes/${title}_overlay.png`;
        const overlayElement = document.getElementById('overlay');

        if (!isTransitioning) {
            overlayElement.style.backgroundImage = `url(${overlayImage})`;
            overlayElement.style.opacity = '0.4';
            overlayElement.style.display = 'block';
        } else {
            overlayElement.addEventListener('transitionend', function onTransitionEnd() {
                overlayElement.style.backgroundImage = `url(${overlayImage})`;
                overlayElement.style.opacity = '0.4';
                overlayElement.removeEventListener('transitionend', onTransitionEnd);
            });
        }
    });

    card.addEventListener('mouseleave', function() {
        const overlayElement = document.getElementById('overlay');
        isTransitioning = true;
        overlayElement.style.opacity = '0';
        overlayElement.addEventListener('transitionend', () => isTransitioning = false);
    });
});