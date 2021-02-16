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

  // Function to simulate character movement on grid
  // Listens for the arrow keys to be pressed, and when pressed
  window.addEventListener("keydown", function(event) {
    let x = character.location_x;
    let y = character.location_y;
    window.scrollTo();

    // let element = `#${x}_${y}`;
    // element.scrollTo(0,0);
    // const scrollLock = document.getElementById(`#${parseInt(x)}_${parseInt(y)}`);
    // scrollLock.scrollIntoView({
    //   behavior: "smooth",
    //   block: "center",
    //   inline: "center"
    // });
    if (event.key == "ArrowLeft") {
      $(`#${x}_${y}`).removeClass("character"); // Removes class from prev. square
      character.move(-1, 0, "left");            // Move character object
      x = character.location_x;                 // Update current character's horiz. coord.
      $(`#${x}_${y}`).addClass("character");    // Adds class to current square
      $("#x").text(character.location_x);       // Updates HUD text
      $("#output").text(event.key);             // Displays key press on HUD
    }
    else if (event.key == "ArrowUp") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(0, -1, "up");
      y = character.location_y;
      $(`#${x}_${y}`).addClass("character");
      $("#y").text(character.location_y);
      $("#output").text(event.key);
    }
    else if (event.key == "ArrowRight") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(1, 0, "right");
      x = character.location_x;
      $(`#${x}_${y}`).addClass("character");
      $("#x").text(character.location_x);
      $("#output").text(event.key);
    }
    else if (event.key == "ArrowDown") {
      $(`#${x}_${y}`).removeClass("character");
      character.move(0, 1, "down");
      y = character.location_y;
      $(`#${x}_${y}`).addClass("character");
      $("#y").text(character.location_y);
      $("#output").text(event.key);
    }
  }, true);

  window.addEventListener("click", function() { // Basic shop functionality
    // Not how the shop will function in the end, but this was just to demo onclick functionality
    if ((character.checkCredits() >= 50) && (character.toolMaterial != "Gold")) {
      // The popup right now will literally trigger any time if the credits are over 50.
      // Again this is for demo purposes, but this whole function should probably be disabled when not demo-ing.
      let purchase = confirm("Would you like to upgrade your tool for 50 credits?");
      if (purchase) {
        if (character.toolMaterial === "Wood") {
          alert(character.toolMaterial);
          character.newToolMaterial("Iron");
        }
        else if (character.toolMaterial === "Iron") {
          alert(character.toolMaterial);
          character.newToolMaterial("Gold");
        }
        character.gainCredits(-50);
        $("#tool").text(character.checkTool());
        $("#credits").text(character.credits);
      }
    }
    character.gainCredits(1);
    $("#credits").text(character.credits);
  });

  window.addEventListener("mousemove", function(event) { // Get ID of div
    // If you mouse over any div, this will display the name of the div
    // If this doesn't happen to be a div with an underscore,
    // the entire div ID will display in the "Mouse X" space in the HUD
    const clicked = event.target;
    const currentID = clicked.id || "No ID!";

    const coords = currentID.split("_");
    $("#mouse_x").text(coords[0]);
    $("#mouse_y").text(coords[1]);
    $("#select").text(gameworld.world[coords[0]][coords[1]].type);
  });
});