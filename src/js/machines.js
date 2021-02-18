///////////////////////////////////////////////////////////// Vendor Information /////////////////////////////////////////
/*
{

  Vendor object expects x,y value on creation
  Vendor object has a fuel value and properties with a buy, sell, and quantity object.
  Entering an item and a player inventory object into the sell or buy funtion as an argument will check the players
  credits and vendor stock if purchasing or the player inventory object if selling. Items will be sold one at time.

}
*/

export class Vendor {
  constructor(x, y) {
    this.name = "Vendor";
    this.fuel = 0;
    this.tree = { sell: 2, buy: 5, quantity: 5 };
    this.copperIngot = { sell: 5, buy: 10, quantity: 5 };
    this.ironIngot = { sell: 8, buy: 15, quantity: 5 };
    this.goldIngot = { sell: 10, buy: 20, quantity: 0 };
    this.x = x;
    this.y = y;
  }
  sell(item, inventoryObj) {
    if (inventoryObj.inventory[item] > 0) {
      inventoryObj.credits += this[item].sell;
      inventoryObj.inventory[item] -= 1;
      this[item].quantity += 1;
    } else {
      alert(`Not enough in inventory.`);
    }
  }
  buy(item, inventoryObj) {
    if (this[item].quantity > 0) {
      if (inventoryObj.credits >= this[item].buy) {
        this[item].quantity -= 1;
        inventoryObj.credits -= this[item].buy;
        inventoryObj.inventory[item] += 1;
      } else {
        alert('Not enough credits.');
      }
    } else {
      alert('Vendor is sold out.');
    }
  }
}

////////////////////////////////////////////////////Mining Machine Notes//////////////////////////////////////////////////////
/*
{

  MiningMachine object expects x,y value on creation
  miningMachine.mineNode((GAME WORLD OBJECT HERE))
  if gameworld object returns false the intervall is stopped and no more code is executed
  the value of the machine is returned via player interaction with withdrawl (not final);

}
*/

export class MiningMachine {
  constructor(x, y) {
    this.name = 'MiningMachine';
    this.on = true;
    this.fuel = 500;
    this.storage = ['', 0];
    this.miningPower = 10;
    this.x = x;
    this.y = y;
  }
  withdrawal(inventoryObj) {
    const [type, value] = this.storage;
    inventoryObj.inventory[type] += value;
    this.storage = [type, 0];
  }
  mineNode(gameworld) {
    const interval = setInterval(() => {
      const returnValue = gameworld.mine(this.x, this.y, this.miningPower);
      if (returnValue === false) {
        clearInterval(interval);
        this.on = false;
        gameworld.renderChunk(this.x, this.y,"Mining Machine");
        // alert('no value');
      } else {
        const [type, value] = returnValue;
        this.storage[0] = type;
        this.storage[1] += value;
        this.fuel -= 1;
      }
    }, 2000);
  }
}
/////////////////////////////////////////////////////// Smelter Info //////////////////////////////////////////////////////////////
/*
{

  Smelter object expects x,y value on creation
  When interacting with the smelter object it checks the inventory object value of the given argument.
  if enough items are found the semlter will remove the inventory items from the inventory object and return the "upgraded" item
  The inventory object should have a value of 0 by default for all items before using this class

}
*/
export class Smelter {
  constructor(x, y) {
    this.name = "Smelter";
    this.x = x;
    this.y = y;
    this.fuel = 100;
    this.conversion = 3;
  }
  smelt(type, inventoryObj) {
    const objectReturn = {
      tree: () => 'coal',
      copper: () => 'copperIngot',
      iron: () => 'ironIngot',
      gold: () => 'goldIngot',
      default: () => false
    };
    if (this.fuel > 0 && inventoryObj.inventory[type] >= this.conversion) {
      const isValid = (objectReturn[type] || objectReturn['default'])();
      if (isValid) {
        inventoryObj.inventory[type] -= this.conversion;
        inventoryObj.inventory[isValid]++;
        this.fuel--;
      }
    }
  }
}

//////////////////////////////////////////////////////////Refuel Info ///////////////////////////////////////////////////////////
/*
{

  Refuel is a simple object made to refuel given objects through  arguments with static classes
  Do not Create a Refuel object as an instance "new Refuel()"
  instead use Refuel object as such : Refuel.treeRefuel("current object to refuel here", "inventory object here");

}
*/

export class Refuel {
  static treeRefuel(fuelObject, inventoryObj) {
    if (inventoryObj.inventory.tree > 0) {
      inventoryObj.inventory.tree -= 1;
      fuelObject.fuel++;
    }
  }
  static coalRefuel(fuelObject, inventoryObj) {
    if (inventoryObj.inventory.coal > 0) {
      inventoryObj.inventory.coal -= 1;
      fuelObject.fuel + 5;
    }
  }
}
 
// SMELTER EVENT // PLEASE USE VENDOR OBJ AS ARGUMENT / INVENTORY OBJ ASWELL // everything else works on its own

export const vendorEvents = (vendorObj, inventoryObj) => {
  const isValid = (event) => ['tree', 'copperIngot', 'ironIngot', 'goldIngot'].includes(event.target.id);
  const vendorId = document.getElementById('vendor-container');
  document.getElementById('vendor-close').addEventListener('click', () => {
    vendorId.style.display = 'none';
  });
  document.getElementById("buy").addEventListener("click", (event) => {
    if (isValid(event)) vendorObj.buy(event.target.id, inventoryObj);
  });
  document.getElementById("sell").addEventListener("click", (event) => {
    if (isValid(event)) vendorObj.sell(event.target.id, inventoryObj);
  });
};


// const vendorEvents = (vendorObj, inventoryObj) => {
//   const isValid = (event) => ['tree', 'copperIngot', 'ironIngot', 'goldIngot'].includes(event.target.id);
//   document.getElementById("buy").addEventListener("click", (event) => {
//     if (isValid(event)) vendorObj.buy(event.target.id, inventoryObj);
//   });
//   document.getElementById("sell").addEventListener("click", (event) => {
//     if (isValid(event)) vendorObj.sell(event.target.id, inventoryObj);
//   });
// };


// SMELTER EVENT // PLEASE USE WITH ID SMELTER OBJECT INV

const interactiveWindow = (id, s, invObj) => {
  s.smelt(id, invObj);
};

/// ADD FOR SMELTER CLOSE BUTTON


document.getElementById('smelter-close').addEventListener('click', () => {
  document.getElementById('smelter-container').style.display = 'none';
});


document.getElementById("smelter-container").addEventListener("click", (event) => {
  const {id} = event.target;
  interactiveWindow(id, smelter, inv);
});