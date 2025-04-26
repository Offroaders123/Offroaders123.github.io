// Run this in DevTools at `https://rbnaodn.bandcamp.com/`

JSON.stringify([...document.querySelectorAll("#music-grid .music-grid-item")].map(item => [item.querySelector("a p").innerText, item.querySelector("img").src]), null, 2);
