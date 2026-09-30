/*
 * 加强版存档系统
 */
(function(global){
    var JY2 = global.JY2 = global.JY2 || {};
    var SAVE_VERSION = 1;
    var SLOT_PREFIX = 'jy2-enhanced-save-';

    var storyFlagNames = [
        '金盆洗手事件','襄阳蒙冤事件','襄阳衙门事件','剑冢救雕事件',
        '英雄大会剧情线','辟邪剑谱剧情线','无量山洞剧情线','长白山两女互斗剧情线',
        '万劫谷剧情线','破庙剧情线','破庙练毒剧情线','昆仑派剧情线',
        '天龙寺剧情线','侠客岛剧情线','黑木崖剧情线','光明顶战役剧情线',
        '武当派剧情线','华山派剧情线','少林寺剧情线','华山思过崖剧情线',
        '田伯光剧情线','华山令狐冲剧情线','左冷禅任务剧情线','金盆洗手剧情线',
        '五岳掌门剧情线','声望150剧情线','声望500剧情线','声望600剧情线','声望900剧情线'
    ];

    function clone(value){ return JSON.parse(JSON.stringify(value)); }
    function slotKey(slot){ return SLOT_PREFIX + slot; }

    function captureFlags(){
        var result = {};
        storyFlagNames.forEach(function(name){
            if (typeof global[name] !== 'undefined') result[name] = global[name];
        });
        return result;
    }

    function restoreFlags(flags){
        flags = flags || {};
        Object.keys(flags).forEach(function(name){ global[name] = flags[name]; });
    }

    function rebuildGameData(){
        global.游戏数据 = global.base['o_base'];
        if (global.playerData && global.游戏数据 && global.游戏数据[0]) {
            for (var k in global.playerData) global.游戏数据[0].主角[k] = global.playerData[k];
        }
        if (global.主角数据 && global.游戏数据 && global.游戏数据[0]) {
            for (var p in global.主角数据) global.游戏数据[0].主角[p] = global.主角数据[p];
        }
    }

    var SaveSystem = {
        version: SAVE_VERSION,
        capture: function(){
            return {
                saveVersion: SAVE_VERSION,
                savedAt: new Date().toISOString(),
                scene: {
                    剧情名称: global.剧情名称,
                    场景索引: global.场景索引,
                    所处场景: global.所处场景
                },
                player: clone(global.主角数据 || {}),
                kungfuAvailable: clone(global.playerData ? global.playerData.可用武学 : {}),
                kungfuRuntime: clone(global.kungfu ? global.kungfu.o_kungfu : []),
                itemRuntime: clone(global.item ? global.item.o_item : []),
                flags: captureFlags()
            };
        },
        save: function(slot){
            slot = Number(slot) || 1;
            var data = this.capture();
            localStorage.setItem(slotKey(slot), JSON.stringify(data));
            return data;
        },
        read: function(slot){
            var raw = localStorage.getItem(slotKey(Number(slot) || 1));
            if (!raw) return null;
            try { return JSON.parse(raw); }
            catch (e) { console.error('存档读取失败', e); return null; }
        },
        getSummary: function(slot){
            var data = this.read(slot);
            if (!data) return null;
            return {
                savedAt: data.savedAt,
                level: data.player ? data.player.等级 : 0,
                force: data.player ? data.player.门派 : '无门派',
                name: data.player ? data.player.姓名 : ''
            };
        },
        load: function(slot){
            var data = this.read(slot);
            if (!data) return false;
            if ((data.saveVersion || 1) > SAVE_VERSION) return false;

            global.主角数据 = clone(data.player || {});
            if (global.playerData) global.playerData.可用武学 = clone(data.kungfuAvailable || {});
            if (global.kungfu && data.kungfuRuntime) global.kungfu.o_kungfu = clone(data.kungfuRuntime);
            if (global.item && data.itemRuntime) global.item.o_item = clone(data.itemRuntime);
            restoreFlags(data.flags);

            if (data.scene) {
                global.剧情名称 = data.scene.剧情名称 || '剧情_主地图';
                global.场景索引 = Number(data.scene.场景索引) || 0;
                global.所处场景 = data.scene.所处场景 || '';
            }
            rebuildGameData();
            return true;
        },
        remove: function(slot){ localStorage.removeItem(slotKey(Number(slot) || 1)); },
        clearAll: function(){ for (var i = 1; i <= 3; i++) this.remove(i); }
    };

    JY2.SaveSystem = SaveSystem;
})(window);
