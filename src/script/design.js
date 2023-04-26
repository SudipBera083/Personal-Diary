const elContainer = document.querySelector(".articles");
const elToggle = elContainer.querySelector(".toggle");
const losFlippers = elContainer.querySelectorAll("[data-flip]");

elToggle.addEventListener("click", () => {
flip(() => {
elContainer.dataset.view =
elContainer.dataset.view === "card" ? "list" : "card";
}, losFlippers);
});

function getRect(el) {
return el.getBoundingClientRect();
}

function flip(doSomething, firstEls, getLastEls = () => firstEls) {
const firstElsRects = Array.from(firstEls).map(el => [el, getRect(el)]); // tuple [Element, ClientRect { ... } ]

requestAnimationFrame(() => {
doSomething();
const lastElsRects = Array.from(getLastEls()).map(el => [
el,
getRect(el)]);


firstElsRects.forEach(([firstEl, firstRect], i) => {
let [lastEl, lastRect] = lastElsRects[i];
const dx = lastRect.x - firstRect.x;
const dy = lastRect.y - firstRect.y;
const dw = lastRect.width / firstRect.width;
const dh = lastRect.height / firstRect.height;
lastEl.dataset.flipping = true;
lastEl.style.setProperty("--dx", dx);
lastEl.style.setProperty("--dy", dy);
lastEl.style.setProperty("--dw", dw);
lastEl.style.setProperty("--dh", dh);
requestAnimationFrame(() => delete lastEl.dataset.flipping);
});
});
}