// @ts-check

// const releases = [];

const duration = releases.reduce((previous, release) => release.tracksInfo.reduce((previous, tracksInfo) => tracksInfo.duration + previous, 0) + previous, 0) / 3600;
console.log(duration);
