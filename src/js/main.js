import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import GameWorld from '../js/gameworld.js';
import Player from './player.js';

function renderText(character) {
  $("#x").text(character.location_x);
  $("#y").text(character.location_y);
  $("#mouse_x").text(character.location_x);
  $("#mouse_y").text(character.location_y);
  $("#tool").text(character.checkTool());
  $("#credits").text(character.credits);
  $("#playerCopper").text(character.inventory.copper);
  $("#playerIron").text(character.inventory.iron);
  $("#playerGold").text(character.inventory.gold);
  $("#playerCoal").text(character.inventory.coal);
  $("#playerTree").text(character.inventory.tree);
}

$(document).ready(function() {
  for (let i=0; i<200; i++) {
    let divinput = `<div>`;
    for (let j=0; j<200; j++) {
      divinput += `<div id="${i}_${j}"></div>`;
    }
    divinput += `</div>`;
    $("body").append(divinput);
  }
  
  let gameworld = new GameWorld();
  gameworld.generateWorld();
  let character = new Player("Wood", "Pickaxe", 100, 100);

  for (let a=0; a<200; a++) {
    for (let k=0; k<200; k++) {
      if (gameworld.world[a][k].type == "copper") {
        $(`#${a}_${k}`).css("background-color", `rgb(184, 115, 51)`);
      } else if (gameworld.world[a][k].type == "iron") {
        $(`#${a}_${k}`).css("background-color", `rgb(169, 188, 208)`);
      } else if (gameworld.world[a][k].type == "gold") {
        $(`#${a}_${k}`).css("background-color", `rgb(255, 239, 159)`);
      } else if (gameworld.world[a][k].type == "coal") {
        $(`#${a}_${k}`).css("background-color", `rgb(10, 10, 10)`);
      } else if (gameworld.world[a][k].type == "water") {
        $(`#${a}_${k}`).css("background-color", `rgb(50, 80, 200)`);
      } else if (gameworld.world[a][k].type == "tree") {
        $(`#${a}_${k}`).css("background-color", `rgb(100, 150, 50)`);
      } else {
        $(`#${a}_${k}`).css("background-color", `rgb(100, 250, 150)`);
      }
    }
  }

  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  const pageWidth = $(document).width();
  const pageHeight = $(document).height();
  const centerWidth = ((pageWidth - windowWidth) / 2);
  const centerHeight = ((pageHeight - windowHeight) / 2);

  // These need to be after the creation of the map
  $("#windowWidth").text(windowWidth);
  $("#windowHeight").text(windowHeight);
  $("#mapWidth").text(pageWidth);
  $("#mapHeight").text(pageHeight);
  window.scrollTo({
    top: centerWidth,
    left: centerHeight,
    behavior: "smooth"
  });

  let charCenterWidth = parseInt(centerWidth);
  let charCenterHeight = parseInt(centerHeight);
  $(`#100_100`).addClass("character");
  renderText(character);
  window.addEventListener("keydown", function(event) {
    let player_x = character.location_x;
    let player_y = character.location_y;

    if (event.key == "ArrowLeft") {
      $(`#${player_x}_${player_y}`).removeClass("character"); // Removes class from prev. square
      character.move(-1, 0, "left");            // Move character object
      player_x = character.location_x;                 // Update current character's horiz. coord.
      $(`#${player_x}_${player_y}`).addClass("character");    // Adds class to current square
      charCenterWidth -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#x").text(character.location_x);       // Updates HUD text
      $("#output").text(event.key);             // Displays key press on HUD
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowUp") {
      $(`#${player_x}_${player_y}`).removeClass("character");
      character.move(0, -1, "up");
      player_y = character.location_y;
      $(`#${player_x}_${player_y}`).addClass("character");
      charCenterHeight -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#y").text(character.location_y);
      $("#output").text(event.key);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowRight") {
      $(`#${player_x}_${player_y}`).removeClass("character");
      character.move(1, 0, "right");
      player_x = character.location_x;
      $(`#${player_x}_${player_y}`).addClass("character");
      charCenterWidth += 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#x").text(character.location_x);
      $("#output").text(event.key);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowDown") {
      $(`#${player_x}_${player_y}`).removeClass("character");
      character.move(0, 1, "down");
      player_y = character.location_y;
      $(`#${player_x}_${player_y}`).addClass("character");
      charCenterHeight += 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#y").text(character.location_y);
      $("#output").text(event.key);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "0") {
      let currentTool = character.toolType;
      character.cycleTool(currentTool);
      currentTool = character.checkTool();
      $("#tool").text(currentTool);
    }
  }, true);

  window.addEventListener("click", function() { 
    const clicked = event.target;
    const currentID = clicked.id || "No ID!";

    const coords = currentID.split("_");
    const player_x = parseInt(character.location_x);
    const player_y = parseInt(character.location_y);
    const mouse_x = parseInt(coords[0]);
    const mouse_y = parseInt(coords[1]);
    if (character.validClick(player_x, player_y, mouse_x, mouse_y,)) {
      let node;
      if (character.toolType === "Pickaxe") {
        node = (gameworld.mine(mouse_x,mouse_y, 3)); // Pickaxe mines well
      }
      else if (character.toolType === "Axe") {
        node = (gameworld.mine(mouse_x,mouse_y, 1)); // Axe mines badly
      }
      else if (character.toolType === "Hand") {
        node = (gameworld.mine(mouse_x,mouse_y, 0)); // Hand cannot mine
        // Node should be like "place machine" or "craft machine"
      }
      character.addInventory(node[0], node[1]); // Get renderer
      renderText(character);
    }
  });

  window.addEventListener("mousemove", function(event) { // Get ID of div
    const hover = event.target;
    const currentID = hover.id || "No ID!";
    const checkCoords = currentID.includes("_"); // Check if the mouseover div is a coordinate pair
    if (checkCoords) {                           // Only creates x/y coords if it's a pair
      const coords = currentID.split("_");
      const mouse_x = parseInt(coords[0]);
      const mouse_y = parseInt(coords[1]);
      $("#mouse_x").text(mouse_x);
      $("#mouse_y").text(mouse_y);
      $("#select").text(gameworld.world[mouse_x][mouse_y].type);
    }
  });
});