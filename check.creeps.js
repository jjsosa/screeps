module.exports = {
    //Checks alive creeps
    alive(creeps){
        let alive = _.sum(creeps, (c) => true);
        console.log('Creeps alive: '+ alive);
        return alive;
    },
    //Checks number of havesters creeps
    harvesters(creeps){
        let harv = _.sum(creeps, (c) => c.memory.role == 'Harvester' || c.memory.role == 'harvester');
        console.log('Harvesters: '+ harv);
        return harv;
    },
    //Checks number of upgraders creeps
    upgraders(creeps){
        let upg = _.sum(creeps, (c) => c.memory.role == 'Upgrader' || c.memory.role == 'upgrader');
        console.log('Upgraders: '+ upg);
        return upg;
    },
    //Checks number of builders creeps
    builders(creeps){
        let bui = _.sum(creeps, (c) => c.memory.role == 'Builder' || c.memory.role == 'builder');
        console.log('Builders: '+ bui);
        return bui;
    },
    generateCreeps(room) {
        let creeps = Game.creeps;
        const minNumOfHarvesters = 10;
        const minNumOfBuilders = 5;
        const minNumOfUpgraders = 10;
        const numOfHarvesters = this.harvesters(creeps);
        const numOfUpgraders = this.upgraders(creeps);
        const numOfBuilders = this.builders(creeps);
        const numAlive = this.alive(creeps);

            // Check if enough energy to spawn creeps
            var energyStructures = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION);
            var totalEnergy = 0;
            for(var i in energyStructures){
                totalEnergy = totalEnergy + energyStructures[i].energy;
                console.log('TOTAL ENERGY: '+totalEnergy)
            }

            // if not enough harvesters
            if(numOfHarvesters < minNumOfHarvesters && totalEnergy >= 200){
                // try to spawn a harvester
                this.spawn('Harvester');
                totalEnergy -= 200;
            }

            // if enough harvester, then try to spawn an upgrader
            if(numOfUpgraders < minNumOfUpgraders && totalEnergy >= 200){
                this.spawn('Upgrader');
                totalEnergy -= 200;
            }

            // if not enough builders
            if(numOfBuilders < minNumOfBuilders && totalEnergy >= 200){
                // try to spawn builder
                this.spawn('Builder');
                totalEnergy -= 200;
            }
    },
    spawn(role){
        if(Game.spawns.Spawn1.createCreep(
            [WORK,CARRY,MOVE],
            role + Game.time.toString(),
            {
                role: role
            }
        ) != 0) {
            console.log("Spawned new: " + role);
        }
    }
}