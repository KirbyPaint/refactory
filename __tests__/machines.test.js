import { MiningMachine } from '../src/js/machines.js';

describe("MiningMachine", () => {
  let miningMachine;
  let inventoryObj;
  beforeEach(() => {
    inventoryObj = {
      inventory: {
        copper: 0
      }
    }
    miningMachine = new MiningMachine(1,1);
  });
  test("It should create a mining machine that stores an x value", () => {
    expect(miningMachine.x).toEqual(1);
  });
  test("It should create a mining machine that stores an y value", () => {
    expect(miningMachine.y).toEqual(1);
  });
  test("It should start out with a fuel value of 500", () => {
    expect(miningMachine.fuel).toEqual(500);
  });
  test("It should give a name of itself in string value", () => {
    expect(miningMachine.name).toEqual('MiningMachine');
  });
  test("It should create a machine with a storage array property", () => {
    expect(miningMachine.storage).toEqual(['', 0]);
  });
  test("It should start with an on value of true", () => {
    expect(miningMachine.on).toEqual(true);
  });
  test("It should withdrawl storage from the object when the method .widthdrawl is called", () => {
    miningMachine.storage = ['copper', 5];
    miningMachine.withdrawal(inventoryObj);
    expect(inventoryObj.inventory.copper).toEqual(5);
  });
  
});