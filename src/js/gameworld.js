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
            type:false,
            max:100,
            amount:0
          },
          machine:{},
          type:"grass"
        };
      }
    }
    return newArray;
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
          if (this.world[i][j].type == "grass" && material != "water") {
            this.world[i][j].type = material;
            this.world[i][j].item.type = material;
            this.world[i][j].item.max = 1000;
            this.world[i][j].item.amount = this.convertRange(materialPlaced[i][j],0,1,100,1000);
          } else if (material == "water") {
            this.world[i][j].type = material; 
          }
        }
      }
    }
  }

  generateWorld() {
    this.generateMaterial("copper",0.7,0.6,0.6);
    this.generateMaterial("iron",0.7,0.5,0.6);
    this.generateMaterial("gold",0.7,0.4,0.9);
    this.generateMaterial("coal",0.7,0.5,0.6);
    this.generateMaterial("water",0.8,0.7,0.1);
    this.generateMaterial("tree",0.4,0.6,0.3);
  }


  //interactions

  point(x,y) {
    return this.world[y][x];
  }

  addMachine(x,y,machine) {
    if (this.world[y][x].type != "water" && this.world[y][x].type != "tree" && this.world[y][x].machine == "none") {
      this.world[y][x].machine = machine;
      return [machine,1];
    } else {
      return false;
    }
  }

  removeMachine(x,y) {
    if (this.world[y][x].machine != "none") {
      let removedMachine = this.world[y][x].machine;
      this.world[y][x].machine = "none";
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
  mine(x,y,amount) {
    if (["copper","iron","gold","coal"].includes(this.world[y][x].type)) {
      let removeditem = this.world[y][x].item;

      if (this.world[y][x].item.amount - amount < 0) {
        this.world[y][x].item.type = false;
        this.world[y][x].item.amount = 0;
        this.world[y][x].type = "grass";
        return [removeditem.item.type,removeditem.item.amount];
      
      } else if (this.world[y][x].item.amount - amount > 0) {
        this.world[y][x].item.amount =- amount;
        return [removeditem.item.type,amount];
      
      } else if (this.world[y][x].item.amount - amount == 0) {
        this.world[y][x].item.type = false;
        this.world[y][x].item.amount = 0;
        this.world[y][x].type = "grass";
        return [removeditem.item.type,amount];
      }
    } else {
      return false;
    }
  }
}