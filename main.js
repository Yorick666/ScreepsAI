/**
 * @file Base file for ScreepsAI
 * @author Hans W. Uhlig
 * @version 0.0.1
 */

/**
 * One time Initialization.
 */
if (!Memory.init)
{
    for (var spawnName in Game.spawns)
    {
        var spawn = Game.spawns[spawnName];
        spawn.memory.range = 20;
        spawn.memory.roles = {
            'harvester': {
                'ai': require('harvester'),
                'body': [ MOVE, WORK, CARRY ],
                'min': 3
            }
        }
    }
    Memory.init = true;
}

/**
 * Population Control
 */
for(var spawnName in Game.spawns)
{
    var spawn = Game.spawns[spawnName];
    for(var roleName in spawn.memory.roles)
    {
        var creeps = spawn.pos.findInRange(FIND_MY_CREEPS, spawn.memory.range,
            { filter: function(creep) { return creep.memory && creep.memory.role ? creep.memory.role == roleName : false; }});
        var role = spawn.memory.roles[roleName];
        if(creeps.length < role.min)
        {
            spawn.createCreep(role.body, undefined, {
                'role': roleName,
                'ai': role.ai
            });
        }
    }
}

for(var creepName in Game.creeps)
{
    var creep = Game.creeps[creepName];
    creep.memory.ai(creep);
}

// Cleanup dead creeps
for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
}

// Cleanup dead spawns
for (var name in Memory.spawns) {
    if (!Game.spawns[name]) {
        delete Memory.spawns[name];
    }
}
