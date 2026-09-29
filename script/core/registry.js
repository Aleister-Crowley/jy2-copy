/*
 * 加强版统一注册中心
 */
(function(global){
    var JY2 = global.JY2 = global.JY2 || {};

    function clone(value){
        return JSON.parse(JSON.stringify(value));
    }

    var KungfuRegistry = {
        getTypes: function(){
            if (!global.playerData || !global.playerData.所有武学) return [];
            return Object.keys(global.playerData.所有武学);
        },
        getAll: function(type){
            if (!global.playerData || !global.playerData.所有武学) return [];
            return global.playerData.所有武学[type] || [];
        },
        getAvailable: function(type){
            var all = this.getAll(type);
            var available = global.playerData && global.playerData.可用武学 ? (global.playerData.可用武学[type] || []) : [];
            return all.filter(function(skill, index){
                return available[index] && available[index].可用 === true;
            });
        },
        getRuntimeDataByName: function(name){
            if (!global.kungfu || !global.kungfu.o_kungfu) return null;
            for (var i = 0; i < global.kungfu.o_kungfu.length; i++) {
                if (global.kungfu.o_kungfu[i].名称 === name) return global.kungfu.o_kungfu[i];
            }
            return null;
        },
        getVisualDataByName: function(name){
            var types = this.getTypes();
            for (var i = 0; i < types.length; i++) {
                var list = this.getAll(types[i]);
                for (var j = 0; j < list.length; j++) {
                    if (list[j].名称 === name) return list[j];
                }
            }
            return null;
        },
        isLearned: function(name){
            var types = this.getTypes();
            for (var i = 0; i < types.length; i++) {
                var all = this.getAll(types[i]);
                var available = global.playerData.可用武学[types[i]] || [];
                for (var j = 0; j < all.length; j++) {
                    if (all[j].名称 === name) return !!(available[j] && available[j].可用);
                }
            }
            return false;
        },
        setLearned: function(name, learned){
            var types = this.getTypes();
            for (var i = 0; i < types.length; i++) {
                var all = this.getAll(types[i]);
                var available = global.playerData.可用武学[types[i]] || [];
                for (var j = 0; j < all.length; j++) {
                    if (all[j].名称 === name) {
                        if (!available[j]) available[j] = { 名称: name, 可用: false };
                        available[j].可用 = learned !== false;
                        return true;
                    }
                }
            }
            return false;
        },
        snapshot: function(){
            return clone({
                available: global.playerData ? global.playerData.可用武学 : {},
                runtime: global.kungfu ? global.kungfu.o_kungfu : []
            });
        }
    };

    JY2.KungfuRegistry = KungfuRegistry;
    JY2.clone = clone;
})(window);
