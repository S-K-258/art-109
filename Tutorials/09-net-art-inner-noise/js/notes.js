const notes = document.querySelectorAll(".note");
const wall = document.querySelector("main");
const shuffleButton = document.querySelector("#shuffle-button");
let topLayer = 1;

const thoughts = [
    "You can do better.\nNo, I can't.",
    "I'm fine.\nJust a little tired.",
    "Stop overthinking.\nBut I can't stop.",
    "You're trying hard.\nStill not enough.",
    "Tomorrow gets better.\nYou said that yesterday.",
    "They all move on.\nI'm still here.",
    "Be a little braver.\nLet me hide a while.",
    "Mirrors don't lie.\nOr answer back.",
    "Who should I be?\nI don't know either.",
    "It's okay to go slow.\nThen I'll go slow."
];

// Random text
function changeThoughts() {
    const choices = [...thoughts];
    notes.forEach(note => {
        const index = Math.floor(Math.random() * choices.length);
        note.querySelector("span").textContent = choices.splice(index, 1)[0];
        note.classList.remove("is-flipped");
        labelNote(note);
    });
}

function labelNote(note) {
    const flipped = note.classList.contains("is-flipped");
    note.setAttribute("aria-pressed", flipped);
    note.setAttribute("aria-label", flipped ? "Your reflection. Click to return to the thought." : note.querySelector("span").textContent + " Click to see the other side.");
}

// Note limit
function moveNote(note, x, y) {
    note.style.left = Math.max(12, Math.min(x, wall.clientWidth - note.offsetWidth - 12)) + "px";
    note.style.top = Math.max(12, Math.min(y, wall.clientHeight - note.offsetHeight - 12)) + "px";
    note.style.right = "auto";
}

notes.forEach(note => {
    let drag = null;
    let moved = false;

    // Click to switch text and mirror
    note.addEventListener("click", event => {
        if (moved && event.detail !== 0) { moved = false; return; }
        note.classList.toggle("is-flipped");
        labelNote(note);
    });

    note.addEventListener("pointerdown", event => {
        if (event.button !== 0 || drag) return;
        moved = false;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: note.offsetLeft, top: note.offsetTop };
        note.style.zIndex = ++topLayer;
        note.setPointerCapture(event.pointerId);
    });

    note.addEventListener("pointermove", event => {
        if (!drag || drag.id !== event.pointerId) return;
        const x = event.clientX - drag.x;
        const y = event.clientY - drag.y;
        if (Math.hypot(x, y) > 6) moved = true;
        if (moved) moveNote(note, drag.left + x, drag.top + y);
    });

    function releaseNote(event) {
        if (!drag || drag.id !== event.pointerId) return;
        if (event.type === "pointercancel") moved = true;
        drag = null;
        if (note.hasPointerCapture(event.pointerId)) note.releasePointerCapture(event.pointerId);
    }

    note.addEventListener("pointerup", releaseNote);
    note.addEventListener("pointercancel", releaseNote);
    note.addEventListener("lostpointercapture", releaseNote);

    note.addEventListener("keydown", event => {
        const steps = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] };
        if (!steps[event.key]) return;
        event.preventDefault();
        moveNote(note, note.offsetLeft + steps[event.key][0], note.offsetTop + steps[event.key][1]);
    });
});

shuffleButton.addEventListener("click", changeThoughts);
window.addEventListener("resize", () => {
    notes.forEach(note => {
        note.style.left = "";
        note.style.right = "";
        note.style.top = "";
    });
});
changeThoughts();
