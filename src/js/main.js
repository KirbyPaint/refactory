import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import GameWorld from '../js/gameworld.js';


$(document).ready(function () {
  for (let i = 0; i < 200; i++) {
    let divinput = `<div>`;
    for (let j = 0; j < 200; j++) {
      divinput += `<div id="${i}_${j}"></div>`;
    }
    divinput += `</div>`;
    $("#gameworld").append(divinput);
  }

  let gameworld = new GameWorld();




  $("#controls>button").on("click", function() {
    let action = this.getAttribute("id");

    if (action == "displayAll") {
      gameworld.renderChunk();
    } else if (action == "seeAll") {
      gameworld.renderNoise(4);
    } else if (action == "seeOne") {
      gameworld.renderNoise(1);
    } else if (action == "seeTwo") {
      gameworld.renderNoise(2);
    } else if (action == "seeThree") {
      gameworld.renderNoise(3);
    } else if (action == "GenerateCopper") {
      gameworld.generateMaterial("copper");
    } else if (action == "GenerateLakes") {
      gameworld.generateMaterial("water");
    } else if (action == "GenerateTree") {
      gameworld.generateMaterial("tree");
    } else if (action == "GenerateRiver") {
      gameworld.generateRiver();
    }
  })


});



// <button id="regenerateNoise">Regenerate Noise</button>

// <button id="displayAll">Display Textures</button>
// <button id="seeAll">See combined Noise</button>
// <button id="seeOne">See Noise1</button>
// <button id="seeTwo">See Noise2</button>
// <button id="seeThree">See Noise3</button>
// <button id="GenerateCopper">Generate Copper</button>
// <button id="GenerateLakes">General Lakes</button>
// <button id="GenerateTree">Generate Tree</button>
// <button id="GenerateRiver">Generate River</button>