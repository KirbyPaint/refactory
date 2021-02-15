import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import GameWorld from '../js/gameworld.js';



$(document).ready(function() {
  for (let i=0; i<200; i++) {
    let divinput = `<div>`;
    for (let j=0; j<200; j++) {
      divinput += `<div id="${i}${j}"></div>`;
    }
    divinput += `</div>`;
    $("body").append(divinput);
  }

  let gameworld = new GameWorld;

  console.log(gameworld.world);

  console.log(gameworld.world[14][14])
});