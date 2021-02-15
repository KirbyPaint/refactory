export default class GameWorld {
  constructor() {

    this.world = this.createArray(200,200);
  }


  //internal generators

  // generateCopper() {

  // }

  // generateIron() {

  // }

  // generateGold() {

  // }

  createArray(x,y) {
    let newArray = [];
    for (let i=0; i<y; i++) {
      newArray[i] = [];
      for (let j=0; j<x; j++) {
        newArray[i][j] = `${i}.${j}`;
      }
    }
    return newArray;
  }

  generateTerrain() {
    // perlin.seed();
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