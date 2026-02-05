function getSafeRect(rect, pad) {
    return {
        left: rect.left - pad,
        top: rect.top - pad,
        right: rect.right + pad,
        bottom: rect.bottom + pad
    };
}

function intersects(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function moveRandomEl(elm, avoidEl) {
    elm.style.position = "fixed";
    elm.style.zIndex = "5";

    const pad = 12;
    const avoidPad = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const elRect = elm.getBoundingClientRect();
    const maxLeft = Math.max(pad, vw - elRect.width - pad);
    const maxTop = Math.max(pad, vh - elRect.height - pad);

    const avoidRect = avoidEl ? getSafeRect(avoidEl.getBoundingClientRect(), avoidPad) : null;

    let tries = 0;
    let placed = false;

    while (tries < 30 && !placed) {
        const left = Math.floor(Math.random() * maxLeft);
        const top = Math.floor(Math.random() * maxTop);
        const candidate = {
            left,
            top,
            right: left + elRect.width,
            bottom: top + elRect.height
        };

        if (!avoidRect || !intersects(candidate, avoidRect)) {
            elm.style.left = `${left}px`;
            elm.style.top = `${top}px`;
            placed = true;
        }

        tries += 1;
    }
}

const moveRandom = document.querySelector("#move-random");
const yesButton = document.querySelector(".btn a");

if (moveRandom) {
    const handler = (e) => {
        e.preventDefault();
        moveRandomEl(moveRandom, yesButton);
    };

    moveRandom.addEventListener("mouseenter", handler);
    moveRandom.addEventListener("touchstart", handler, { passive: false });
    moveRandom.addEventListener("pointerdown", handler);
    window.addEventListener("resize", () => moveRandomEl(moveRandom, yesButton));
}
