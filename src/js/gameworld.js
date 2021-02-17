import $ from 'jquery';
import grass1 from '../assets/gametextures/GroundTile1.png';
import grass2 from '../assets/gametextures/GroundTile2.png';
import grass3 from '../assets/gametextures/GroundTile3.png';
import grass4 from '../assets/gametextures/GroundTile4.png';
import grass5 from '../assets/gametextures/GroundTile5.png';
import grass6 from '../assets/gametextures/GroundTile6.png';

import water1 from '../assets/gametextures/WaterTile1.png';
import water2 from '../assets/gametextures/WaterTile2.png';
import water3 from '../assets/gametextures/WaterTile3.png';
import water4 from '../assets/gametextures/WaterTile4.png';

import mineOn from '../assets/gametextures/MiningMachineLight.png';
import mineOff from '../assets/gametextures/MiningMachine.png';

import copper from '../assets/gametextures/CopperNode.png';
import iron from '../assets/gametextures/IronNode.png';
import coal from '../assets/gametextures/CoalNode.png';
import gold from '../assets/gametextures/GoldNode.png';
import tree from '../assets/gametextures/Tree.png';

import player from '../assets/gametextures/Player.png';

//interacting with this class:

//Spawning a new world map:
//   Gameworld.generateWorld() -- no return - populates GameWorld.world with materials

//   GameWorld.point(x,y) -- returns [object]
//   Give x and y coordinates. returns the memory object for those coordinates.

//Interacting with world:
//   Adding and removing Items

//   To add Machine to gameWorld
//   GameWorld.placeItem(x,y,item,amount) -- returns [item,returnAmount] or false
//   x and y are integers of range (0,200). Amount is an integer of requested amount to place on grid block. Returns an array [item,returnAmount] of the item placed and how many were unable to be placed (0 is success). Returns false if unable.

//   To remove item from gameworld to inventory
//   GameWorld.removeItem(x,y,amount) -- returns [item,returnAmount] or false
//   x and y are integers of range (0,200). Amount is an integer of requested amount to remove from grid block. Returns an array [item,returnAmount] of the item removed and how many were succesfully able to be removed. Returns false if unable.

//Placing and removing machines

//   To Add Machine to GameWorld
//   GameWorld.addMachine(x,y,machine) -- returns [removedMachine,1] or false
//   x and y are integers of range (0,200). Amount is an integer of requested amount to mine from grid block. Returns an array [machine,1] of the machine added and how many added (should be one). Returns false if unable.

//   To remove Machine from GameWorld to inventory
//   GameWorld.removeMachine(x,y) -- returns [removedMachine,1] or false
//   x and y are integers of range (0,200). Amount is an integer of requested amount to mine from grid block. Returns an array [machine,1] of the machine removed. Returns false if unable

//Mining
//   GameWorld.mine(x,y,amount) -- returns [material,amount] or false
//   x and y are integers of range (0,200). Amount is an integer of requested amount to mine from grid block. Returns an array [material,amount] of material returned and amount able to be succesfully returned. Returns false if unable


export default class GameWorld {
  constructor(width=200,height=200) {

    this.width = width;
    this.height = height;
    this.world = this.createArray(width,height);
    this.symplex = this.createSimplex();
  }

  //methods for calculations

  convertRange(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  createSimplex() {
    var Simplex = require('perlin-simplex');
    return new Simplex();
  }

  createArray(x,y) {
    let newArray = [];
    for (let i=0; i<y; i++) {
      newArray[i] = [];
      for (let j=0; j<x; j++) {
        newArray[i][j] = {
          item:{
            max:100,
            amount:0
          },
          machine:{},
          type:"grass",
          amount:0,
          tile: Math.round(Math.random()*5)
        };
      }
    }
    return newArray;
  }

  renderPlayer(x,y) {
    let style = $(`#${x}_${y}`).css("background-image");
    let newstyle = `url(${player}),` + style;
    $(`#${x}_${y}`).css("background-image",newstyle);
  }

  derenderPlayer(x,y) {
    let style = $(`#${x}_${y}`).css("background-image");
    let newstyle = style.replace(`url("http://localhost:8080/assets/gametextures/Player.png"),`,"");
    $(`#${x}_${y}`).css("background-image",newstyle);
  }


  renderChunk(x="none",y="none",incoming="none") {
    if (incoming != "none") {
      // console.log(`${incoming}`, performance.now());
    }
    let startx;
    let starty;
    let endx;
    let endy; 
    if (x == "none" || y == "none") {
      startx = 0;
      starty = 0;
      endx = 199;
      endy = 199;
    } else {
      startx = x;
      starty = y;
      endx =   x;
      endy =   y;
    }
  
    for (let a=startx; a<=endx || a>200; a++) {
      for (let k=starty; k<=endy || k>200; k++) {

        let machineTexture = "";
        
        
        if (this.world[a][k].machine.name === "MiningMachine") {
          if (this.world[a][k].machine.on) {
            machineTexture = `url(${mineOn}),`;
          } else {
            machineTexture = `url(${mineOff}),`;
          }
        }

        let groundtexture;

        if (this.world[a][k].type == "copper") {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${copper}),url(${groundURL})`;

        } else if (this.world[a][k].type == "iron") {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${iron}),url(${groundURL})`;

        } else if (this.world[a][k].type == "gold") {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${gold}),url(${groundURL})`;

        } else if (this.world[a][k].type == "coal") {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${coal}),url(${groundURL})`;

        } else if (this.world[a][k].type == "water") {
          let waterUrl = [water1,water2,water3,water4][3];
          groundtexture = `url(${waterUrl})`;
        } else if (this.world[a][k].type == "tree") {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${tree}),url(${groundURL})`;
        } else {
          let groundURL = [grass1,grass2,grass3,grass4,grass5,grass6][this.world[a][k].tile];
          groundtexture = `url(${groundURL})`;
        }

        $(`#${a}_${k}`).css("background-image", `${machineTexture}${groundtexture}`);


      }
    }
  }

  //terrain generators

  generateTerrain(sizex,sizey,density) {
    let noise = this.createSimplex();
    let map = [];
    for (let i=0; i<sizex; i++) {
      map[i] = [];
      for (let j=0; j<sizey; j++) {
        let nValue = noise.noise(i / density, j / density);
        map[i][j] = this.convertRange(nValue,-1,1,0,1);
      }
    }
    return map;
  }

  generateMaterial(material,one,two,three) {
    let materialAllowed = this.generateTerrain(this.width,this.height,200); //large land allowed
    let materialAvailable = this.generateTerrain(this.width,this.height,100); //medium land alllowed
    let materialPlaced = this.generateTerrain(this.width,this.height,10); //small land allowed

    for (let i=0; i<this.width; i++) {
      for (let j=0; j<this.height; j++) {
        
        if (materialAllowed[i][j] > one && materialAvailable[i][j] > two && materialPlaced[i][j] > three) {
          if (this.world[i][j].type == "grass") {
            this.world[i][j].type = material;
            this.world[i][j].amount = Math.floor(this.convertRange(materialPlaced[i][j],0,1,100,200));
          } else if (material == "water") {
            this.world[i][j].type = material; 
          }
        }
      }
    }
  }

  generateRiver() {

    //generate random direction up down left right
    let randomDirection = Math.floor(Math.random() * 4);
    let direction;
    switch(randomDirection) {
    case 0:
      direction = "up";
      break;
    case 1:
      direction = "right";
      break;
    case 2:
      direction = "left";
      break;
    case 3:
      direction = "down";
      break;
    }

    let startx = 0;
    let starty = 100;

    for (let i=0; i<this.width; i++) {
      for (let j=0; j<this.height; j++) {
        if (this.world[j][i].type == "water") {
          startx = j;
          starty = i;
        }
      }
    }
  
    let width = 2; //Math.floor(this.convertRange(Math.random(),0,1,1,3));
    const bias = this.convertRange(Math.round(Math.random() * Math.round(width)),0,width,-width/2,width/2);

    let generate = true;
    let x = startx;
    let y = starty;
    let counter = 0;
    while (generate) {

      counter += 1;
      if (counter == 10) {
        counter = 0;
        let change = Math.floor(this.convertRange(Math.random(),0,1,-3,3));

        if (width+change < 5 && width+change > 1) {
          width = width+change;
        }
      }

      for (let i = y-width; i<y+width && i != 200; i++) {
        for (let j = x-width; j<x+width && j != 200; j++) {
          if (i < 200 && i >= 0 && j  < 200 && j >= 0) {

            //if right newi = i and newj = j
            //if left newi /= i and newj /=j
            //if down newi = j  and newj = i
            //if up  newi /= j  and newj /= i
            let newi;
            let newj;

            if (direction == "right") {
              newi = i;
              newj = j;
            } else if (direction == "left") {
              newi = this.convertRange(i,0,this.width-1,this.width-1,0);
              newj = this.convertRange(j,0,this.width-1,this.width-1,0);
            } else if (direction == "down") {
              newi = j;
              newj = i;
            } else if (direction == "up") {
              newi = this.convertRange(j,0,this.width-1,this.width-1,0);
              newj = this.convertRange(i,0,this.width-1,this.width-1,0);
            }
            this.world[newj][newi].type = "water";
          }
        }
      }

      x = x + 1;
      let ychange = this.convertRange(Math.round(Math.random() * Math.round(width*2)),0,width*2,-width,width);
      y = Math.round(y + ychange + bias);
      if (x >= 200) {
        generate = false;
      }
    }
  }

  generateWorld() {
    this.generateMaterial("water",0.8,0.7,0.1);
    this.generateRiver();
    this.generateMaterial("copper",0.7,0.6,0.6);
    this.generateMaterial("iron",0.7,0.5,0.6);
    this.generateMaterial("gold",0.7,0.4,0.9);
    this.generateMaterial("coal",0.7,0.5,0.6);
    this.generateMaterial("tree",0.4,0.6,0.3);
  }


  //interactions

  point(x,y) {
    return this.world[y][x];
  }

  addMachine(x,y,machine) {
    if (this.world[y][x].type != "water" && this.world[y][x].type != "grass") {
      this.world[y][x].machine = machine;
      
      console.log(this.world[x][y].machine);

      return [machine,1];
    } else {
      return false;
    }
  }

  removeMachine(x,y) {
    if (this.world[y][x].machine != "none") {
      let removedMachine = this.world[y][x].machine;
      this.world[y][x].machine = {};
      return [removedMachine,1];
    } else {
      return false;
    }
  }

  placeItem(x,y,item,amount) {
    if (this.world[y][x].item.type === false || this.world[y][x].item.type == item) {
      let itemAmount = this.world[y][x].item.amount;
      let returnAmount;
      if (itemAmount + amount > this.world[y][x].item.max) {
        returnAmount = (itemAmount + amount) - this.world[y][x].item.max;
        this.world[y][x].item.amount = this.world[y][x].item.max;
      } else {
        returnAmount = 0;
        this.world[y][x].item.amount = itemAmount + amount;
      }
      return [item,returnAmount];
    } else {
      return false;
    }
  }

  removeItem(x,y,amount=100) {
    if (this.world[y][x].item != []) {
      let removeditem = this.world[y][x].item;

      if (this.world[y][x].item.amount - amount < 0) {
        this.world[y][x].item.type = false;
        this.world[y][x].item.amount = 0;
        return [removeditem.item.type,removeditem.item.amount];
      
      } else if (this.world[y][x].item.amount - amount > 0) {
        this.world[y][x].item.amount =- amount;
        return [removeditem.item.type,amount];
      
      } else if (this.world[y][x].item.amount - amount == 0) {
        this.world[y][x].item.type = false;
        this.world[y][x].item.amount = 0;
        return [removeditem.item.type,amount];
      }
    } else {
      return false;
    }
  }

  //tree, ore
  mine(y,x,amount) {
    if (this.world[y][x].type != "grass" && this.world[y][x].type != "water") {
      let removeditem = JSON.parse(JSON.stringify(this.world[y][x]));
      if (this.world[y][x].amount - amount < 0) {
        this.world[y][x].item.amount = 0;
        this.world[y][x].type = "grass";
        return [removeditem.type,removeditem.amount];
      
      } else if (this.world[y][x].amount - amount > 0) {
        this.world[y][x].amount = this.world[y][x].amount - amount;
        return [removeditem.type,amount];
      
      } else if (this.world[y][x].amount - amount == 0) {
        this.world[y][x].amount = 0;
        this.world[y][x].type = "grass";
        return [removeditem.type,amount];
      }
    } else {
      return false;
    }
  }
}