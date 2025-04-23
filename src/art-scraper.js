// Run this in DevTools at `https://rbnaodn.bandcamp.com/`

JSON.stringify([...document.querySelectorAll("#music-grid .music-grid-item img")].map(img => img.src), null, 2);
