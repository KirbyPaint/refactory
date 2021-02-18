# ReFactory

#### _Teamweek project at Epicodus_

## Creators
[CrankyJones](https://github.com/CrankyJones) - [dcouch440](https://github.com/dcouch440) - [louiesch](https://github.com/louiesch) - [JJohan-work](https://github.com/JJohan-work) - [KirbyPaint](https://github.com/KirbyPaint) - [levi-kohler](https://github.com/levi-kohler)

## Description

This project is a factory game clone. The player can traverse a world rich with ores, mining materials to build machines and refine the ores into valuables.

## Controls

Move the character with the arrow keys or WASD. Click a button in the lower-left corner to switch to that tool, or choose either the Miner or Smelter buttons to togle machine placement. Use the number 0 key to cycle between the "Hand", "Pick", or "Axe" tools.  

The player can mine or place blocks up to 7 blocks away. When placing a Miner tool, place the Miner on a node (coal, iron, copper, gold, or tree) and the miner will begin mining that node. Once it is finished mining, the lightbulb will turn off, and you may remove the Miner by clicking on it with the Hand tool.  

The player may also place Smelters in the world to refine your collected ores and wood into ore ingots and coal, respectively. Place the Smelter with the Smelter button, and click on it with the Hand tool to open the Smelt window. The Smelter is permanently placed in the world, and cannot be picked up, though a player may have as many Smelters in the world as they have materials for.

## Specs

## Setup/Installation Requirements
#### This page has been tested with both the most recent versions of Mozilla Firefox and Google Chrome

* Open Git or your preferred terminal
* Navigate to your directory for Git projects (not within an existing project)
* Paste the following in your terminal _exactly as written,_ and in order: 

> git clone https://github.com/KirbyPaint/  
> npm install

* Once npm has completed installing, type the following:

> npm install perlin-simplex

* Once perlin-simplex has completed installing, type the following:

> npm run start

* The project will then open in your default web browser.

Note - the centering of the window does depend on the initial browser size. It is highly recommended that you open and set your browser to the preferred size BEFORE executing `npm run start`

## Known Bugs

* If browser is re-sized, the game window doesn't properly center on the player. This is caused during initial world rendering.
* If the browser size is too small, some text may be cut off.

## Support and contact details

_Discord: @KirbyPaint#0751_

## Technologies and Resources Used

* _HTML5/CSS3_
* _Bootstrap 4.6.0_
* _JavaScript ES6_
* _jQuery 3.5.1_
* _Node Package Manager 6.14.9_
* _webpack 4.39.3_
* _Babel 7.6.4_
* _eslint 6.3.0_
* _Jest 24.9.0_
* _perlin simplex 0.0.3_

### License Information

_GNU Public License_

Copyright (c) 2021 **_The ReFactory Dev Team_**