///////////////////////////////////////////////// Vendor Information //////////////////////////////
/*
Vendor should be called from the new keyword
arguments are used as such
let invObj = {
	wood: 5,
  currency: 15
}

const newVendor = new Vendor()
newVendor.sell('wood', invObj);
console.log(newVendor)
{
  copperBuy: 10,
  copperQuantity: 5,
  copperSell: 5,
  fuel: 0,
  goldBuy: 20,
  goldQuantity: 0,
  goldSell: 10,
  ironBuy: 15,
  ironQuantity: 5,
  ironSell: 8,
  woodBuy: 5,
  woodQuantity: 6,
  woodSell: 2
}

console.log(invObj);
{
  currency: 17,
  wood: 4
}
*/
///////////////////////////////////////////////////////////// Vendor Info End //////////////////////
export class Vendor {
  constructor() {
    this.fuel = 0;
    this.woodSell = 2;
    this.copperSell = 5;
    this.ironSell = 8;
    this.goldSell = 10;
    this.woodBuy = 5;
    this.woodQuantity = 5;
    this.copperQuantity = 5;
    this.ironQuantity = 5;
    this.goldQuantity = 0;
    this.copperBuy = 10;
    this.ironBuy = 15;
    this.goldBuy = 20;
  }
  sell(item, inventoryObj) {
		if (inventoryObj[item] > 0) {
    	inventoryObj.currency += this[`${item}Sell`];
      inventoryObj[item] -= 1;
      this[`${item}Quantity`] += 1;
    } else {
    	alert(`Not Enough ${item}`);
    }
  }
  buy(item, inventoryObj) {
    if (InventoryObj.currency >= this[`${item}Buy`]) {
      this[`${item}Quantity`] -= 1;
      inventoryObj.currency -= this[`${item}Buy`];
      inventoryObj[item] += 1;
    } else {
    	alert('Not Enough Money');
    }
  }
};

////////////////////////////////////////Mining Machine Notes///////////////////////
/*
  MiningMachine runs on an interval and stores values on each interval tick. 
  The this.storage value is what the player pulls from during interaction.
  The interval ticks are self reliant and will stop when the value hits zero.

  to withdrawl the player just passes their object through the argument .withdrawal(inventoryObj)
  withdrawal adds to the inventory with the argument that was fed on mineNode.
  to mine, the argument should be called with plain english argument mineNode('iron', 20)
*/

export class MiningMachine {
  constructor() {
    this.fuel = 500;
    this.storage = 0;
    this.type = null;
    this.currentMine = null;
  }
  withdrawal(inventoryObj) {
    inventoryObj[this.type] += this.storage;
    this.storage = 0;
  }
  mineNode(nodeType, nodeQuantity){
    this.currentMine = nodeQuantity;
    this.type = nodeType;
    const interval = setInterval(() => {
      this.fuel -= 1;
      this.storage += 1;
      this.currentMine -= 1;
      if (this.currentMine === 0) {
        clearInterval(interval);
      }
    }, 10000)
  }
}

export class Smelter {
  constructor() {
    this.fuel = 0;
    this.queue = [];
    this.woodToCoal = 3;
    this.copperToIngot = 3;
    this.ironToIngot = 3;
    this.goldToIngot = 3;
  }


  WoodRefuel(machine) {
    machine.fuel++;
  }

  CoalRefuel(machine) {
    machine.fuel = machine.fuel + 5;
  }

  SmeltWood(playerInventory) {
    if (this.fuel > 0) {
      if (playerInventory.wood >= this.woodtoCoal) {
        playerInventory.wood = playerInventory.wood - this.woodtoCoal;
        playerInventory.coal++;
        this.fuel--;
      } else {
        alert('Not enough wood.');
      }
      return (playerInventory);
    } else {
      alert('Not enough fuel.');
    }
  }

  SmeltCopper(playerInventory) {
    if (this.fuel > 0) {
      if (playerInventory.copper >= this.copperToIngot) {
        playerInventory.copper = playerInventory.copper - this.copperToIngot;
        playerInventory.copperIngot++;
        this.fuel--;
      } else {
        alert('Not enough copper.');
      }
      return (playerInventory);
    } else {
      alert('Not enough fuel.');
    }
  }

  SmeltIron(playerInventory) {
    if (this.fuel > 0) {
      if (playerInventory.iron >= this.ironToIngot) {
        playerInventory.iron = playerInventory.iron - this.ironToIngot;
        playerInventory.ironIngot++;
        this.fuel--;
      } else {
        alert('Not enough iron.');
      }
      return (playerInventory);
    } else {
      alert('Not enough fuel.');
    }
  }

  SmeltGold(playerInventory) {
    if (this.fuel > 0) {
      if (playerInventory.gold >= this.goldToIngot) {
        playerInventory.gold = playerInventory.gold - this.goldToIngot;
        playerInventory.goldIngot++;
        this.fuel--;
      } else {
        alert('Not enough gold.');
      }
      return playerInventory;
    } else {
      alert('Not enough fuel.')
    }
  }
};