/*
 * Q版国风三槽存/读档 UI。
 */
(function(global){
    var JY2 = global.JY2 = global.JY2 || {};

    function formatSummary(slot){
        var summary = JY2.SaveSystem.getSummary(slot);
        if (!summary) return '空存档';
        var time = '';
        try { time = new Date(summary.savedAt).toLocaleString(); } catch (e) {}
        return (summary.name || '') + '  ' + (summary.level || 0) + '级\n' +
            (summary.force || '无门派') + (time ? '  ' + time : '');
    }

    JY2.SaveUI = {
        show: function(game, mode, onLoad){
            var group = game.add.group();
            var centerX = game.world.centerX;
            var centerY = game.world.centerY;

            var box = game.add.image(centerX, centerY, 'hd_panel_save');
            box.anchor.setTo(0.5);
            box.inputEnabled = true;
            group.add(box);

            var modeText = game.add.text(centerX, centerY - 105, mode === 'save' ? '保存记录' : '读取记录', {
                fontSize: 12, fill: '#6b4a2f', fontWeight:'bold'
            });
            modeText.anchor.setTo(0.5);
            group.add(modeText);

            var slotTexts = [];
            var slotCards = [];

            function refresh(){
                for(var i=1;i<=3;i++){
                    slotTexts[i-1].text = formatSummary(i);
                }
            }

            function createSlot(slot){
                var y = centerY - 55 + (slot - 1) * 62;
                var card = game.add.graphics(centerX - 108,y - 23);
                card.beginFill(0xfff4d8,0.92);
                card.lineStyle(1,0xb88a4b,0.8);
                card.drawRoundedRect(0,0,216,48,8);
                card.endFill();
                card.inputEnabled = true;
                group.add(card);
                slotCards.push(card);

                var badge = game.add.text(centerX - 91,y,'记录' + slot,{
                    fontSize:11,fill:'#8b5a2b',fontWeight:'bold'
                });
                badge.anchor.setTo(0,0.5);
                group.add(badge);

                var text = game.add.text(centerX - 48,y,'',{
                    fontSize:10,fill:'#3b2a1f',align:'left'
                });
                text.anchor.setTo(0,0.5);
                group.add(text);
                slotTexts.push(text);

                card.events.onInputOver.add(function(){ card.alpha = 0.82; },this);
                card.events.onInputOut.add(function(){ card.alpha = 1; },this);
                card.events.onInputDown.add(function(){
                    if(mode === 'save'){
                        JY2.SaveSystem.save(slot);
                        refresh();
                        return;
                    }
                    if(JY2.SaveSystem.load(slot)){
                        group.destroy();
                        if(typeof onLoad === 'function') onLoad(slot);
                    }
                },this);
            }

            for(var slot=1;slot<=3;slot++) createSlot(slot);

            var close = game.add.text(centerX,centerY + 124,'关闭',{
                fontSize:12,fill:'#8b2f23',fontWeight:'bold'
            });
            close.anchor.setTo(0.5);
            close.inputEnabled = true;
            close.events.onInputDown.add(function(){ group.destroy(); },this);
            group.add(close);

            refresh();
            return group;
        }
    };
})(window);
