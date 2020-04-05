var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var checkCreeps = require('check.creeps');
var checkMemory = require('check.memory');

module.exports.loop = function () {
    //THIS TICK
    console.log('[TICK:+'+Game.time+']');

    checkMemory.cleanMemory();

    //Check creeps
    var allCreeps = Game.creeps;
    checkCreeps.alive(allCreeps);
    checkCreeps.free(allCreeps);

    // Generate new creeps
    checkCreeps.generateCreeps(allCreeps);

    // for every creep name in Game.creeps
    for (let name in allCreeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}