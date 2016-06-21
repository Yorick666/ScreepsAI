/**
 * @file Healer AI
 * @author Hans W. Uhlig
 * @version 0.0.1
 */

module.exports = function(creep) {
    // Find wounded creeps close to the base
    var spawn = creep.pos.findClosestByPath(Game.spawns);
    var target = creep.pos.findNearest(Game.creeps, {filter: function(object) {return object.hits < object.hitsMax;}});
    var range = 5;
    if (target && spawn.pos.inRangeTo(target,range)) {
        // Wounded friend found, go tend its wounds
        if (!creep.pos.isNearTo(target)) {
            creep.moveTo(target);
        } else {
            creep.heal(target);
        }
    } else {
        // No wounded ally, move back to the spawn
        if (!creep.pos.isNearTo(spawn)) {
            creep.moveTo(spawn);
        }
    }
};
