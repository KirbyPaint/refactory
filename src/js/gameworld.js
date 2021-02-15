export default class GameWorld {
  constructor() {

    this.world = this.createArray(200,200);
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
          items:[],
          machine:"none",
          type:""
        };
      }
    }
    return newArray;
  }

  //internal generators

  generateMaterial(material,one,two,three) {
    let materialAllowed = this.generateTerrain(200,200,300); //large land allowed
    let materialAvailable = this.generateTerrain(200,200,100); //medium land alllowed
    let materialPlaced = this.generateTerrain(200,200,10); //small land allowed


    for (let i=0; i<200; i++) {
      for (let j=0; j<200; j++) {
        
        if (materialAllowed[i][j] > one && materialAvailable[i][j] > two && materialPlaced[i][j] > three && this.world[i][j].type == "") {
          this.world[i][j].type = material;
        }
      }
    }
  }

  generateTerrain(sizex,sizey,density) {
    let noise = this.createSimplex();
    let map = [];
    for (let i=0; i<sizey; i++) {
      map[i] = [];
      for (let j=0; j<sizex; j++) {
        let nValue = noise.noise(i / density, j / density);
        map[i][j] = this.convertRange(nValue,-1,1,0,1);
      }
    }
    return map;
  }

  generateWorld() {
    this.generateMaterial("copper",0.7,0.6,0.6);
    this.generateMaterial("iron",0.7,0.5,0.6);
    this.generateMaterial("gold",0.7,0.4,0.9);
  }




  //interactions
  // getArea() {

  // }

  // addMachine() {

  // }

  // removeMachine() {

  // }

  // placeItem() {

  // }

  // removeItem() {

  // }

  // mineItem() {

  // }
}