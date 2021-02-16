// This class is FAR from complete
export default class Player {
  constructor(material, type, x, y) {
    this.inventory;
    this.toolMaterial = material;
    this.toolType = type;
    this.credits = 0;
    this.location_x = x;
    this.location_y = y;
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