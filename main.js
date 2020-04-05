var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var checkCreeps = require('check.creeps');
var checkMemory = require('check.memory');

module.exports.loop = function () {
    //THIS TICK
    console.log('[TICK:+'+Game.time+']');

    checkMemory.cleanMemory();

    for(let room in Game.rooms){
        //Check creeps && Generate new creeps
        checkCreeps.generateCreeps(Game.rooms[room]);
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'Harvester' || creep.memory.role == 'harvester' ) {
            roleHarvester.harvest(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'Upgrader' || creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'Builder') {
            roleBuilder.run(creep);
        }
    }
}