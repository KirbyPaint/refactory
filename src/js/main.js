import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import GameWorld from '../js/gameworld.js';
import Player from './player.js';
import { MiningMachine, Smelter } from './machines.js';
// import { MiningMachine } from './machines.js';

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

// function lastKnown() {
//   return [character.last_x, character.last_y];
// }

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
  gameworld.generateWorld();
  let character = new Player("Wood", "Pickaxe", 100, 100);

  gameworld.renderChunk();

  $("#tools>button").on("click", function() {
    console.log(this);
    character.changeTool(this.getAttribute("id"));
    let currentTool = character.checkTool();
    $("#tool").text(currentTool);
  });

  $("#x").text(character.location_x);
  $("#y").text(character.location_y);
  $("#mouse_x").text(character.location_x);
  $("#mouse_y").text(character.location_y);
  $("#tool").text(character.checkTool());
  $("#credits").text(character.credits);

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
  gameworld.renderPlayer(100, 100);
  renderText(character);

  window.addEventListener("keydown", function (event) {
    let player_x = character.location_x;
    let player_y = character.location_y;

    if (event.key == "ArrowLeft") {
      gameworld.derenderPlayer(player_x, player_y);// Removes class from prev. square
      character.move(-1, 0, "left");            // Move character object
      player_x = character.location_x;                 // Update current character's horiz. coord.
      gameworld.renderPlayer(player_x, player_y);
      charCenterWidth -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#x").text(character.location_x);       // Updates HUD text
      $("#output").text(event.key);             // Displays key press on HUD
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowUp") {
      gameworld.derenderPlayer(player_x, player_y);
      character.move(0, -1, "up");
      player_y = character.location_y;
      gameworld.renderPlayer(player_x, player_y);
      charCenterHeight -= 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#y").text(character.location_y);
      $("#output").text(event.key);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowRight") {
      gameworld.derenderPlayer(player_x, player_y);
      character.move(1, 0, "right");
      player_x = character.location_x;
      gameworld.renderPlayer(player_x, player_y);
      charCenterWidth += 50;
      window.scrollTo(charCenterWidth, charCenterHeight);
      $("#x").text(character.location_x);
      $("#output").text(event.key);
      $("#spawnWidth").text(charCenterWidth);
      $("#spawnHeight").text(charCenterHeight);
    }
    else if (event.key == "ArrowDown") {
      gameworld.derenderPlayer(player_x, player_y);
      character.move(0, 1, "down");
      player_y = character.location_y;
      gameworld.renderPlayer(player_x, player_y);
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

  document.getElementById("smelter-container").addEventListener("click", (event) => {
    const {id} = event.target;
    let smelter = gameworld.world[character.last_x][character.last_y].machine;
    let inv = character;
    interactiveWindow(id, smelter, inv);
    console.log(inv);
  });

  const interactiveWindow = (id, s, invObj) => {
    s.smelt(id, invObj);
  };

  window.addEventListener("click", function () {
    const clicked = event.target;
    const currentID = clicked.id || "No ID!";

    const coords = currentID.split("_");
    const player_x = parseInt(character.location_x);
    const player_y = parseInt(character.location_y);
    const mouse_x = parseInt(coords[0]);
    const mouse_y = parseInt(coords[1]);
    if (character.validClick(player_x, player_y, mouse_x, mouse_y)) {
      let node;
      if (character.toolType === "Pickaxe") {
        node = (gameworld.mine(mouse_x, mouse_y, 3)); // Pickaxe mines well
      }
      else if (character.toolType === "Axe") {
        node = (gameworld.mine(mouse_x, mouse_y, 1)); // Axe mines badly
      } else if (character.toolType === "Hand") {

        let thisMachine = gameworld.world[mouse_x][mouse_y].machine;
        if (thisMachine != undefined && thisMachine.name !== "Smelter") {
          thisMachine.withdrawal(character);
          if (thisMachine.on == false) {
            gameworld.removeMachine(mouse_y, mouse_x); // YES THESE DO NEED TO BE y, x
            gameworld.renderChunk(mouse_x, mouse_y, "player hand");
          }
        } else if (thisMachine.name === "Smelter") {
          // Code for the smelter click event
          $("#smelter-container").show();
          console.log("display UI");
          character.last_x = mouse_x;
          character.last_y = mouse_y;
          // Code for the smelter click event
        }

      } else if (character.toolType === "Miner") {
        let placementResponse = gameworld.addMachine(mouse_x, mouse_y, 50, character.checkInventory("tree"), "MiningMachine");
        if (placementResponse === "occupied") {

          // alert("There is already a machine here:");
        } else if (placementResponse === "success") {
          const machine = new MiningMachine(mouse_x, mouse_y);
          gameworld.world[mouse_x][mouse_y].machine = machine;
          machine.mineNode(gameworld);
          character.inventory.tree -= 50;
          let currentMachineStorage = gameworld.world[mouse_x][mouse_y].machine.storage;
          $("#resource").text(currentMachineStorage[0]);
          $("#quantity").text(currentMachineStorage[1]);
        } else if (placementResponse === "not enough") {
          alert("need more trees to create mining machine");
        }
      } else if (character.toolType === "Smelter") {
        if (character.validClick(player_x, player_y, mouse_x, mouse_y)) {
          if (character.checkInventory("coal") >= 50) {
            let placementResponse = gameworld.addMachine(mouse_x, mouse_y, 50, character.checkInventory("coal"), "Smelter");
            if (placementResponse === "occupied") {
              // let thisMachine = gameworld.world[mouse_x][mouse_y].machine;
              // thisMachine.withdrawal(character);
            } else if (placementResponse === "success") {
              const machine = new Smelter(mouse_x, mouse_y);
              gameworld.world[mouse_x][mouse_y].machine = machine;
              character.inventory.coal -= 50;
            } else if (placementResponse === "not enough") {
              alert("need more coal to create smelting machine");
            }
          } else {
            alert("need more coal to create smelting machine");
          }
          gameworld.renderChunk(mouse_x, mouse_y, "player hand");
          renderText(character);
        }
      }
      if (node != false) {
        if (typeof (node) !== 'undefined') {
          character.addInventory(node[0], node[1]);
        }
      }
      gameworld.renderChunk(mouse_x, mouse_y, "player hand");
    }
    renderText(character);
  });

  // window.addEventListener("contextmenu", function (event) {
  //   // on right click place the smelter
  //   event.preventDefault();
  //   const clicked = event.target;
  //   const currentID = clicked.id || "No ID!";

  //   const coords = currentID.split("_");
  //   const player_x = parseInt(character.location_x);
  //   const player_y = parseInt(character.location_y);
  //   const mouse_x = parseInt(coords[0]);
  //   const mouse_y = parseInt(coords[1]);
  // if (character.validClick(player_x, player_y, mouse_x, mouse_y)) {
  //   if (character.toolType === "Hand") {
  //     if (character.checkInventory("coal") >= 50) {
  //       let placementResponse = gameworld.addMachine(mouse_x, mouse_y, 50, character.checkInventory("coal"), "Smelter");
  //       if (placementResponse === "occupied") {
  //         let thisMachine = gameworld.world[mouse_x][mouse_y].machine;
  //         thisMachine.withdrawal(character);
  //       } else if (placementResponse === "success") {
  //         const machine = new Smelter(mouse_x, mouse_y);
  //         gameworld.world[mouse_x][mouse_y].machine = machine;
  //         character.inventory.coal -= 50;
  //       } else if (placementResponse === "not enough") {
  //         alert("need more coal to create smelting machine");
  //       }
  //     } else {
  //       alert("need more coal to create smelting machine");
  //     }
  //   }
  //   gameworld.renderChunk(mouse_x, mouse_y, "player hand");
  //   renderText(character);
  // }
  // });

  window.addEventListener("mousemove", function (event) { // Get ID of div
    const hover = event.target;
    const currentID = hover.id || "No ID!";
    const checkCoords = currentID.includes("_"); // Check if the mouseover div is a coordinate pair
    if (checkCoords) {                           // Only creates x/y coords if it's a pair
      const coords = currentID.split("_");
      const mouse_x = parseInt(coords[0]);
      const mouse_y = parseInt(coords[1]);
      let currentMachineStorage;
      if (typeof (gameworld.world[mouse_x][mouse_y].machine) !== 'undefined') {
        currentMachineStorage = gameworld.world[mouse_x][mouse_y].machine.storage;
        if (typeof (currentMachineStorage) !== 'undefined') {
          $("#resource").text(currentMachineStorage[0]);
          $("#quantity").text(currentMachineStorage[1]);
        }
      }
      $("#mouse_x").text(mouse_x);
      $("#mouse_y").text(mouse_y);
      $("#select").text(gameworld.world[mouse_x][mouse_y].type);
    }
  });
});