module.exports = {
    // a function to run the logic for this role
    harvest(creep){
        // Check if energy source selected
        if(!creep.memory.source){
            // find closest energy source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            creep.memory.source = source.id;
        }else{
            var source = Game.getObjectById(creep.memory.source);
        }

        if(creep.carry.energy < creep.carryCapacity){
            // try to harvest energy or move if the source is not at range
            if (creep.harvest(source) != 0) {
                // move towards the source
                creep.moveTo(source);
            }
        }else{
            // Check if energy structure selected
            if(!creep.memory.structure){
                // find closest energy structure
                var struct = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, (structure) => structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION);
                creep.memory.structure = struct.id;
            } else {
                var struct = Game.getObjectById(creep.memory.structure);
            }

            // try to transfer energy, if the spawn is not in range
            if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the spawn
                creep.moveTo(struct);
            }
        }
    }
};