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
    },
    generateCreeps(creeps) {
        const minNumOfHarvesters = 10;
        const minNumOfBuilders = 5;
        const minNumOfUpgraders = 10;
        let newCreeps = [];

        const numOfHarvesters = this.harvesters(creeps);
        const numOfUpgraders = this.upgraders(creeps);
        const numOfBuilders = this.builders(creeps);

        // if not enough harvesters
        if(numOfHarvesters < minNumOfHarvesters){
            // try to spawn a harvester
            newCreeps.push(Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], 'Harvester' + Game.time.toString(),
                { role: 'harvester', working: true}));
        }
        // if enough harvester and builders, then try to spawn an upgrader
        if(numOfUpgraders < minNumOfUpgraders){
            newCreeps.push(Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], 'Upgrader' + Game.time.toString(),
                { role: 'upgrader', working: true}));
        }
        // if not enough builders
        if(numOfBuilders < minNumOfBuilders){
            // try to spawn builder
            newCreeps.push(Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], 'Builder' + Game.time.toString(),
                { role: 'builder', working: true}));
        }

        // print name to console if spawning was a success
        if(newCreeps.length > 0) {
            for(let creep in newCreeps){
                if(!(creep < 0)) {
                    console.log("Spawned new creep " + creep);
                }else{
                    console.log("No creep spawned on this tick");
                    console.log(creep);
                }
            }
        }
    }
}