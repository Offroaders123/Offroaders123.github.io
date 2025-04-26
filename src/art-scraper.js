// Run this in DevTools at `https://rbnaodn.bandcamp.com/`

JSON.stringify([...document.querySelectorAll("#music-grid .music-grid-item")].map(item => [item.querySelector("a").href.split("/").at(-1), item.querySelector("img").src]), null, 2);
