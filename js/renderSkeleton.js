export const renderSkeleton = () => {
    const catalogContent = document.querySelector(".catalog__content");
    for (let i = 0; i < 8; i++) {
        catalogContent.innerHTML += `
        <div class="scelet">
            <div class="scelet__icon"></div>
            <div class="scelet__title"></div>
            <div class="scelet__title2"></div>
            <div class="scelet__bottom">
                <div class="scelet__price"></div>
                <div class="scelet__addeds"></div>
            </div>
        </div>
        `
    }
}