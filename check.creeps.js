module.exports = {
    //Checks alive creeps
    alive(creeps){
        let alive = _.sum(Game.creeps, (c) => true);
        console.log('Creeps alive: '+ alive);
        return alive;
    },
    //Checks free creeps
    free(creeps) {
        let free = _.sum(Game.creeps, (c) => !c.memory.role);
        console.log('Creeps not working: '+ free);
        return free;
    },
    //Checks number of havesters creeps
    harvesters(creeps){
        let harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        console.log('Harvesters: '+ harv);
        return harv;
    },
    //Checks number of havesters creeps
    upgraders(creeps){
        let harv = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        console.log('Upgraders: '+ harv);
        return harv;
    }
}