// This class is FAR from complete
export default class Player {
  constructor(material, type, x, y) {
    this.inventory = {
      "copper_ingot": 0,
      "copper": 0,
      "iron_ingot": 0,
      "iron": 0,
      "gold_ingot": 0,
      "gold": 0,
      "coal": 0,
      "tree": 0
    };
    this.toolMaterial = material;
    this.toolType = type;
    this.credits = 0;
    this.location_x = x;
    this.location_y = y;
  }

  addInventory(key, amount) {
    console.log(this.inventory[`${key}`]);
    console.log(`Key is ${key}, amount to add is ${amount}`);
    this.inventory[`${key}`] += amount;
    console.log(this.inventory);
    // this.inventory[key].value += amount;
  }

  // Displays the location as a string "x, y"
  // Only use for displays, not functionality. Call the character's individual coords instead for now.
  location() {
    const location = this.location_x + ", " + this.location_y;
    return location;
  }

  // This function checks that the character's next move is on the map.
  // Hardcoded from 0-199 for a 200x200 grid.
  validLocation(direction) {
    let valid = false;
    switch (direction) {
    case "left":
      if ((this.location_x - 1) < 0) {
        valid = false;
      } else {
        valid = true;
      }
      break;
    case "up":
      if ((this.location_y - 1) < 0) {
        valid = false;
      } else {
        valid = true;
      }
      break;
    case "right":
      if ((this.location_x + 1) > 199) {
        valid = false;
      } else {
        valid = true;
      }
      break;
    case "down":
      if ((this.location_y + 1) > 199) {
        valid = false;
      } else {
        valid = true;
      }
      break;
    }
    return valid;
  }

  // Checks that the character is allowed to move, then moves them.
  move(newX, newY, direction) {
    if (this.validLocation(direction)) {
      this.location_x += newX;
      this.location_y += newY;
    }
  }

  validClick(player_x, player_y, mouse_x, mouse_y, blocktype) {
    let dist_x = Math.abs(player_x - mouse_x);
    let dist_y = Math.abs(player_y - mouse_y);
    if (blocktype != "water") {
      if ((dist_x < 8) && (dist_y < 8)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // Displays tool material and type as string
  // Only use for displays, not functionality.
  checkTool() {
    return this.toolMaterial + " " + this.toolType;
  }

  // What functions might a character have/need?
  newTool(material, type) {
    this.toolMaterial = material;
    this.toolType = type;
  }

  newToolMaterial(material) {
    this.toolMaterial = material;
  }

  newToolType(type) {
    this.toolType = type;
  }

  checkInventory() {
    return this.inventory;
  }

  checkCredits() {
    return this.credits;
  }

  gainCredits(gain) {
    return this.credits += gain;
  }
}