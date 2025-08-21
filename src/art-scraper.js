// Run this in DevTools at `https://rbnaodn.bandcamp.com/`
// be sure to scroll down and load all of the image before running
// lazy loading prevents them from populating before you can properly access them

JSON.stringify([...document.querySelectorAll("#music-grid .music-grid-item")].map(item => [item.querySelector("a").href.split("/").at(-1), item.querySelector("img").src]), null, 2);
