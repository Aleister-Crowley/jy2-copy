/*
 * Q版高清美术资源注册表。
 * 新资源按名称匹配，找不到时由调用方继续使用原版资源。
 */
(function(global){
    var JY2 = global.JY2 = global.JY2 || {};

    var portraitIdFrames = {
        '0001':0,  // 主角：青年侠客
        '0002':9,  // 商贾/掌柜
        '0005':5,  // 老者/高人
        '0006':6,  // 僧人
        '0007':13, // 粗犷武人
        '0008':11, // 江湖浪人
        '0009':4,  // 中年掌门/武师
        '000a':7,  // 道门/儒雅长者
        '000b':2,  // 青年弟子
        '000c':12, // 官兵/护卫
        '000d':11, // 江湖客
        '000e':15, // 女侠/贵女
        '000f':0,  // 青年侠客
        '0010':5   // 老前辈
    };

    var exactPortraits = {
        '云行深':0,
        '主角':0,
        '岳灵珊':1,
        '仪琳':1,
        '店小二':2,
        '衡阳客栈店小二':2,
        '医馆大夫':3,
        '大夫':3,
        '岳不群':4,
        '武馆馆主':4,
        '左冷禅':4,
        '任我行':4,
        '张三丰':5,
        '神仙':5,
        '少林方丈':6,
        '方证':6,
        '令狐冲':10,
        '林平之':10,
        '田伯光':11,
        '乔峰':12,
        '余沧海':13,
        '东方不败':14,
        '阿紫':15,
        '王语嫣':15
    };

    var portraitRules = [
        [/主角|云行深/,0],
        [/岳灵珊|仪琳|姑娘|少女/,1],
        [/店小二|小二|伙计/,2],
        [/大夫|医师|药师|医馆/,3],
        [/掌门|馆主|岳不群|左冷禅|任我行/,4],
        [/张三丰|老者|前辈|岛主|神仙/,5],
        [/和尚|僧|方丈|少林/,6],
        [/道长|道士|武当/,7],
        [/师太|女侠/,8],
        [/掌柜|商人|货郎|老板/,9],
        [/令狐冲|林平之|公子|书生|弟子/,10],
        [/田伯光|乞丐|浪人|游侠/,11],
        [/将军|官兵|捕快|护卫/,12],
        [/山贼|强盗|恶霸|乔峰/,13],
        [/刺客|杀手|黑衣|东方不败/,14],
        [/小姐|夫人|仙子|阿紫|王语嫣/,15]
    ];

    var skillFrames = {
        '形意拳':0,
        '罗汉拳':6,
        '空明拳':10,
        '太极拳':4,
        '七伤拳':5,
        '绝学':15,
        '铁掌':1,
        '绵掌':11,
        '混元掌':6,
        '黯然销魂掌':10,
        '天山六阳掌':16,
        '降龙十八掌':19,
        '弹指神通':2,
        '一阳指':7,
        '拈花指':2,
        '参合指':12,
        '六脉神剑':12,
        '九阴神爪':7,
        '五岳剑法':13,
        '金蛇剑法':3,
        '太极剑':18,
        '玄铁剑':8,
        '独孤九剑':13,
        '辟邪剑法':18,
        '吐纳心法':9,
        '寒冰真气':14,
        '北冥神功':9,
        '九阳神功':16,
        '龙象般若功':19,
        '太玄神功':4
    };

    var itemFrames = {
        '金创药':1,
        '小还丹':2,
        '玉真散':0,
        '大还丹':2,
        '九转熊蛇丸':1,
        '九花玉露丸':0,
        '黑玉断续膏':1,
        '腊八粥':15,
        '豹胎易筋丸':1,
        '莽牯朱蛤':3,
        '天山雪莲':3,
        '大蟠桃':15,
        '玄冰烈火酒':16,

        '铁剑':10,
        '金蛇剑':10,
        '真武剑':10,
        '倚天剑':10,
        '玄铁剑':10,
        '飞镖':12,
        '生死符':14,

        '金盆洗手贴':5,
        '笑傲江湖谱':5,
        '赏善罚恶令':14,
        '五岳令牌':13,
        '关外白酒':16,
        '葡萄酒':16,
        '犀角杯':19,
        '夜光杯':19,
        '黑木令':18,
        '聚贤庄请帖':5,
        '擂鼓山请帖':5,
        '华山论剑贴':5,

        '吐纳心法':6,
        '华山心法':6,
        '紫霞秘籍':7,
        '武当心法':6,
        '含沙射影':7,
        '凌波微步':6,
        '药王神篇':7,
        '梯云纵':6,
        '九阳真经':7,
        '葵花宝典':7,
        '九阴真经':7,
        '辟邪剑谱':7,
        '北冥神功':7,
        '乾坤大挪移':7,
        '六脉剑谱':6,
        '易筋经':7
    };

    function normalizeHeadId(headId){
        if(headId===null || typeof(headId)==='undefined') return '';
        if(typeof(headId)==='number'){
            return (headId & 0xffff).toString(16).padStart(4,'0');
        }
        var value = String(headId).toLowerCase().replace(/^0x/,'');
        if(value.length>4) value=value.slice(-4);
        return value.padStart(4,'0');
    }

    function portraitFrame(name,headId){
        name = name || '';
        if (Object.prototype.hasOwnProperty.call(exactPortraits,name)) {
            return exactPortraits[name];
        }
        for(var i=0;i<portraitRules.length;i++){
            if(portraitRules[i][0].test(name)){
                return portraitRules[i][1];
            }
        }
        var id = normalizeHeadId(headId);
        if(id && Object.prototype.hasOwnProperty.call(portraitIdFrames,id)){
            return portraitIdFrames[id];
        }
        return null;
    }

    function skillFrame(name){
        return Object.prototype.hasOwnProperty.call(skillFrames,name) ? skillFrames[name] : null;
    }

    function itemFrame(item){
        if(!item || item.名称==='空') return null;
        if(Object.prototype.hasOwnProperty.call(itemFrames,item.名称)){
            return itemFrames[item.名称];
        }
        switch(item.类型){
            case '武器': return 10;
            case '防具': return 9;
            case '暗器': return 12;
            case '丹药': return 0;
            case '秘籍': return 6;
            case '事件': return 5;
            default: return null;
        }
    }

    function applyPortrait(sprite,name,size,headId){
        var frame=portraitFrame(name,headId);
        if(frame===null || !sprite) return false;
        sprite.loadTexture('hd_portraits',frame);
        sprite.frame=frame;
        if(size){
            sprite.width=size;
            sprite.height=size;
        }
        return true;
    }

    function applySkill(sprite,name,size){
        var frame=skillFrame(name);
        if(frame===null || !sprite) return false;
        sprite.loadTexture('hd_skill_icons',frame);
        sprite.frame=frame;
        if(size){
            sprite.width=size;
            sprite.height=size;
        }
        return true;
    }

    function applyItem(sprite,item,size){
        var frame=itemFrame(item);
        if(frame===null || !sprite) return false;
        sprite.loadTexture('hd_item_icons',frame);
        sprite.frame=frame;
        if(size){
            sprite.width=size;
            sprite.height=size;
        }
        return true;
    }

    JY2.ArtRegistry={
        portraitFrame:portraitFrame,
        normalizeHeadId:normalizeHeadId,
        skillFrame:skillFrame,
        itemFrame:itemFrame,
        applyPortrait:applyPortrait,
        applySkill:applySkill,
        applyItem:applyItem
    };
})(window);
