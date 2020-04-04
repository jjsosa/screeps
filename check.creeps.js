module.exports = {
    //Checks alive creeps
    alive(creeps){
        let alive = _.sum(creeps, (c) => true);
        console.log('Creeps alive: '+ alive);
        return alive;
    },
    //Checks free creeps
    free(creeps) {
        let free = _.sum(creeps, (c) => !c.memory.role);
        console.log('Creeps not working: '+ free);
        return free;
    },
    //Checks number of havesters creeps
    harvesters(creeps){
        let harv = _.sum(creeps, (c) => c.memory.role == 'harvester');
        console.log('Harvesters: '+ harv);
        return harv;
    },
    //Checks number of havesters creeps
    upgraders(creeps){
        let upg = _.sum(creeps, (c) => c.memory.role == 'upgrader');
        console.log('Upgraders: '+ upg);
        return upg;
    },
    //Checks number of havesters creeps
    builders(creeps){
        let bui = _.sum(creeps, (c) => c.memory.role == 'builder');
        console.log('Builders: '+ bui);
        return bui;
    }
}