var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var checkCreeps = require('check.creeps');

module.exports.loop = function () {
    //THIS TICK
    console.log('[TICK:+'+Game.time+']');

    //Check creeps
    let allCreeps = Game.creeps;
    checkCreeps.alive(allCreeps);
    checkCreeps.free(allCreeps);
    checkCreeps.harvesters(allCreeps);
    checkCreeps.upgraders(allCreeps);
    checkCreeps.builders(allCreeps);
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
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

    // 10 harvesters, 5 builders and as many upgraders as possible
    const minNumOfHarvesters = 10;
    const minNumOfBuilders = 5;
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    const numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    const numOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var creep = undefined;

    // if not enough harvesters
    if (numOfHarvesters < minNumOfHarvesters) {
        // try to spawn a harvester
        creep = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    }
    // if not enough builders
    if (numOfBuilders < minNumOfBuilders) {
        // try to spawn builder
        creep = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'builder', working: false});
    }
    // if enough harvester and builders, then try to spawn an upgrader
    else {
        creep = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }

    // print name to console if spawning was a success
    if (creep) {
        console.log("Spawned new creep: " + creep);
    }
}