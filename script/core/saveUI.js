/*
 * 三槽存/读档 UI。
 */
(function(global){
    var JY2 = global.JY2 = global.JY2 || {};

    function formatSummary(slot){
        var summary = JY2.SaveSystem.getSummary(slot);
        if (!summary) {
            return '记录' + slot + '  未使用';
        }
        var time = '';
        try {
            time = new Date(summary.savedAt).toLocaleString();
        } catch (e) {}
        return '记录' + slot + '  ' + (summary.name || '') + '  ' +
            (summary.level || 0) + '级  ' + (summary.force || '无门派') +
            (time ? '\n' + time : '');
    }

    JY2.SaveUI = {
        show: function(game, mode, onLoad){
            var group = game.add.group();
            var centerX = game.world.centerX;
            var centerY = game.world.centerY;

            var box = game.add.image(centerX, centerY, 'loadOrSaveBox');
            box.anchor.setTo(0.5);
            box.scale.setTo(0.82, 1.05);
            box.inputEnabled = true;
            group.add(box);

            var title = game.add.text(centerX, centerY - 120, mode === 'save' ? '保存记录' : '读取记录', {
                fontSize: 20,
                fill: '#333'
            });
            title.anchor.setTo(0.5);
            group.add(title);

            var slotTexts = [];

            function refresh(){
                for (var i = 1; i <= 3; i++) {
                    slotTexts[i - 1].text = formatSummary(i);
                }
            }

            function createSlot(slot){
                var y = centerY - 62 + (slot - 1) * 64;
                var text = game.add.text(centerX, y, '', {
                    fontSize: 13,
                    fill: '#222',
                    align: 'center'
                });
                text.anchor.setTo(0.5);
                text.inputEnabled = true;
                text.events.onInputOver.add(function(){ text.fill = '#8b4513'; }, this);
                text.events.onInputOut.add(function(){ text.fill = '#222'; }, this);
                text.events.onInputDown.add(function(){
                    if (mode === 'save') {
                        JY2.SaveSystem.save(slot);
                        refresh();
                        return;
                    }

                    if (JY2.SaveSystem.load(slot)) {
                        group.destroy();
                        if (typeof onLoad === 'function') {
                            onLoad(slot);
                        }
                    }
                }, this);
                slotTexts.push(text);
                group.add(text);
            }

            for (var slot = 1; slot <= 3; slot++) {
                createSlot(slot);
            }

            var close = game.add.text(centerX, centerY + 126, '关闭', {
                fontSize: 14,
                fill: '#8b0000'
            });
            close.anchor.setTo(0.5);
            close.inputEnabled = true;
            close.events.onInputDown.add(function(){
                group.destroy();
            }, this);
            group.add(close);

            refresh();
            return group;
        }
    };
})(window);
