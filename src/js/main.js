import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import GameWorld from '../js/gameworld.js';
import Player from './player.js';

$(document).ready(function() {
  for (let i=0; i<200; i++) {
    let divinput = `<div>`;
    for (let j=0; j<200; j++) {
      divinput += `<div id="${i}_${j}"></div>`;
      // divinput += `<div id="${i}_${j}">x:${i} y:${j}</div>`;
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

  // Function to simulate character movement on grid
  // Listens for the arrow keys to be pressed, and when pressed

  let windowWidth = $(window).width();
  let windowHeight = $(window).height();
  let pageWidth = $(document).width();
  let pageHeight = $(document).height();
  let centerWidth = ((pageWidth - windowWidth) / 2);
  let centerHeight = ((pageHeight - windowHeight) / 2);

  $("#windowWidth").text(windowWidth);
  $("#windowHeight").text(windowHeight);
  $("#mapWidth").text(pageWidth);
  $("#mapHeight").text(pageHeight);

  // window.scrollTo(centerWidth, centerHeight);

  window.scrollTo({
    top: centerWidth,
    left: centerHeight,
    behavior: "smooth"
  });

  let charCenterWidth = centerWidth;
  let charCenterHeight = centerHeight;
  $(`#100_100`).addClass("character");
  window.addEventListener("keydown", function(event) {
    let x = character.location_x;
    let y = character.location_y;

    if (event.key == "ArrowLeft") {
      $(`#${x}_${y}`).removeClass("character"); // Removes class from prev. square
      character.move(-1, 0, "left");            // Move character object
      x = character.location_x;                 // Update current character's horiz. coord.
      $(`#${x}_${y}`).addClass("character");    // Adds class to current square
      $("#x").text(character.location_x);       // Updates HUD text
      $("#output").text(event.key);             // Displays key press on HUD
      charCenterWidth -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowUp") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(0, -1, "up");
      y = character.location_y;
      $(`#${x}_${y}`).addClass("character");
      $("#y").text(character.location_y);
      $("#output").text(event.key);
      charCenterHeight -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowRight") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(1, 0, "right");
      x = character.location_x;
      $(`#${x}_${y}`).addClass("character");
      $("#x").text(character.location_x);
      $("#output").text(event.key);
      charCenterWidth += 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowDown") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(0, 1, "down");
      y = character.location_y;
      $(`#${x}_${y}`).addClass("character");
      $("#y").text(character.location_y);
      $("#output").text(event.key);
      charCenterHeight += 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
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
    let player_x = parseInt(character.location_x);
    let player_y = parseInt(character.location_y);
    let mouse_x = parseInt(coords[0]);
    let mouse_y = parseInt(coords[1]);
    let blocktype = gameworld.world[mouse_x, mouse_y].type;
    if (character.validClick(player_x, player_y, mouse_x, mouse_y, blocktype)) {
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
      console.log(gameworld.world[mouse_x][mouse_y]);  // Displays the quantity in selected node
      character.addInventory(node[0], node[1]);
      console.log(`Node[0] is ${node[0]} and Node[1] is ${node[1]}`);
      $("#playerCopper").text(character.inventory.copper);
      $("#playerIron").text(character.inventory.iron);
      $("#playerGold").text(character.inventory.gold);
      $("#playerCoal").text(character.inventory.coal);
      $("#playerTree").text(character.inventory.tree);
      console.log(gameworld.mine(mouse_x,mouse_y, 1)); // This is what we actually get returned from the click
    } else {
      //alert("INVALID");
    }
  });

  window.addEventListener("mousemove", function(event) { // Get ID of div
    
    const hover = event.target;
    const currentID = hover.id || "No ID!";
    const checkCoords = currentID.includes("_"); // Check if the mouseover div is a coordinate pair
    if (checkCoords) {                           // Only creates x, y coords if it's a pair
      const coords = currentID.split("_");
      $("#mouse_x").text(coords[0]);
      $("#mouse_y").text(coords[1]);
      $("#select").text(gameworld.world[coords[0]][coords[1]].type);
    }
  });
});