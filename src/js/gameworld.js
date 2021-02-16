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
            amount:0
          },
          machine:"none",
          type:""
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
          if (this.world[i][j].type == "" || material == "water") {
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

  addMachine(x,y,machine) {
    //checks if machine space is occupied and type is not a tree / not water
    //places machine in given spot
    if (this.world[y][x].type != "water" && this.world[y][x].type != "tree" && this.world[y][x].machine == "none") {
      this.world[y][x].machine = machine;
      return [machine,1];
    } else {
      return false;
    }
  }

  removeMachine(x,y) {
    //checks if machine space is occupied
    if (this.world[y][x].machine != "none") {
      let removedMachine = this.world[y][x].machine;
      this.world[y][x].machine = "none";
      return [removedMachine,1];
    } else {
      return false;
    }
  }

  placeItem(x,y,item,amount,allowedAmount=100) {
    //checks if item spot is occupied or is occupied by less then allowedAmount of same type
    //places item
    if (this.world[y][x].item.type === false || this.world[y][x].item.type == item) {
      let Itemamount = this.world[y][x].item.amount;
      let returnAmount;
      if (Itemamount + amount > allowedAmount) {
        returnAmount = (Itemamount + amount) - allowedAmount;
        this.world[y][x].item.amount = allowedAmount;
      } else {
        returnAmount = 0;
        this.world[y][x].item.amount = Itemamount + amount;
      }
      return [item,returnAmount];
    } else {
      return false;
    }
  }

  removeItem(x,y,amount) {
    //checks if item spot is occupied and how many
    //removes item from spot
    //returns item and how many
    if (this.world[y][x].item != []) {
      let removeditem = this.world[y][x].item;
      //if item 
      if (this.world[y][x].item.amount - amount < 0) {
        this.world[y][x].item.type = false;
        this.world[y][x].item.amount =- amount;
        return [removeditem.item.type,removeditem.item.amount];
      }
    } else {
      return false;
    }
  }

  //tree, ore
  // mine(x,y) {
  //   //checks if space has minable type
  //   //removes type
  //   //returns type
  // }
}