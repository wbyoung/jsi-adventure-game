var gameLibrary = require('jsi-gamelib');
var fs = require('fs');

// npm install -g jsdoc
// jsdoc .
// open out/index.html

/**
 * A map.
 *
 * @typedef {Object} Map
 * @property {Array.<Room>} rooms - The rooms in the map.
 */

/**
 * A room.
 *
 * @typedef {Object} Room
 * @property {String} name - The name of the room.
 * @property {?String} north - .
 * @property {?String} south - .
 * @property {?String} east - .
 * @property {?String} west - .
 * @property {?String} entrance - .
 */

/**
 * entranceLocator takes a mapObject and returns the
 * room with the entrance.
 *
 * @param {Map} map - The map thing.
 * @return {Room} - The room.
 * 
 */
 /*@param {function} 'whereCanIGo' if direction is not null 
 * then push to new array which is 'directions available'
 *@returns {array} directions available/
 *@param {function} 'howManyDoorsAreAvailable' how many directions
* are available from 'directions available'.
*@returns {number} number of doors
*
*@param {function} 'whereDoesThatDirectionGo' from direction select, 
what is the 'new room' 
*@returns {string} new room/

module.exports.entranceLocator = function(map) {
  var entrance;

  map.rooms.forEach(function(room) {
    // find the one that's called entrance
    // if one of the properties of the array is entrance
    if (room.entrance) {
      entrance = room;
    };
  });
  return entrance;
};


module.exports.treasureLocator = function(map) {
  var treasure;

  map.rooms.forEach(function(room) {
    if (room.treasure) {
      treasure = room;
    };
  });
  return treasure;  
};

/**
 * @callback ReadMapCallback
 * @param {Error} err - The error, if there was an error.
 * @param {Map} map - The resulting map.
 */

/**
 * Read a map from a file.
 *
 * @param {String} file - Path to file containing map info.
 * @param {ReadMapCallback} cb - The callback to call once the map has been
 * read.
 */
module.exports.readMap = function(file, cb) {
  fs.readFile(file, { contents: 'utf-8' }, function(err, contents) {
    if (err) { cb(err); return; }
    var map = JSON.parse(contents);
    cb(null, map);
  });
};


var whereCanIGo = module.exports.whereCanIGo = function(room) {
  var newArray = [];

  if (room.north) { 
    newArray.push('north'); 
  }
  if (room.east) {
    newArray.push('east');
  }
  if (room.south) { 
    newArray.push('south');  
  }
  if (room.west) {
    newArray.push('west');
  }
  return newArray;
};

module.exports.howManyDoorsAreAvailable = function(room) {
  var directions = whereCanIGo(room);
  return directions.length;
};

module.exports.whereDoesThatDirectionGo = function(room, direction) {
  var newRoom = room[direction];

  return newRoom;
};


