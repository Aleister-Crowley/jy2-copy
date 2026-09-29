/*
 * @Author: MngYou
 * @Date: 2022-01-25 19:09:22
 * @LastEditTime: 2026-09-29
 * @FilePath: \wx\script\story\城市.js
 */

城市事件 = function(game){
    // 剧情名称、场景索引判断是否为城市类型
    if (typeof(story_[剧情名称][场景索引].剧情类型)!=='undefined'&&story_[剧情名称][场景索引].剧情类型=='城市') {
        audio = game.add.audio(`mp3000e`);
        audios[a_i] = audio;
        a_i++;
        audio.play();

        var 城市界面UI = game.add.group();
        var 背景图片 = story_[剧情名称][场景索引].背景图片;
        var 引导按钮 = story_[剧情名称][场景索引].引导按钮;
        var 使用高清衡阳 = 剧情名称 === '剧情_衡阳' && 场景索引 === 0;

        var bgKey = 使用高清衡阳
            ? 'hd_hengyang_map'
            : 'map' + 背景图片.toString(16).substring(4);
        var bg = game.add.image(0,0,bgKey);
        bg.width = game.width;
        bg.height = game.height;
        城市界面UI.add(bg);

        主角数据可视化UI(game,城市界面UI);

        var 高清衡阳按钮 = {
            '刘府':'hd_hengyang_liufu',
            '武馆':'hd_hengyang_wuguan',
            '医馆':'hd_hengyang_yiguan',
            '客栈':'hd_hengyang_kezhan',
            '离开':'hd_hengyang_likai'
        };

        var 剧情_切换 = [];
        for (let i = 0; i < 引导按钮.length; i++) {
            剧情_切换[i] = function(){
                城市界面UI.destroy();
                剧情名称 = 引导按钮[i].跳转剧情.剧情名称;
                场景索引 = 引导按钮[i].跳转剧情.场景索引;
                console.log(`剧情名称${剧情名称}，场景索引${场景索引}`);
                场景切换();
            }

            if (使用高清衡阳 && 高清衡阳按钮[引导按钮[i].名称]) {
                // 高清衡阳使用生成式 Q 版按钮。图片里已经包含图标和文字。
                var hdBtn = game.add.button(
                    18 + i * 116,
                    game.height - 65,
                    高清衡阳按钮[引导按钮[i].名称],
                    剧情_切换[i],
                    this
                );
                hdBtn.width = 108;
                hdBtn.height = 53;
                hdBtn.events.onInputOver.add(function(btn){
                    btn.alpha = 0.88;
                },this);
                hdBtn.events.onInputOut.add(function(btn){
                    btn.alpha = 1;
                },this);
                城市界面UI.add(hdBtn);
                continue;
            }

            var btn = game.add.button(0, 0, 'sys_btn3', 剧情_切换[i], this, 1, 0, 2);
            btn.scale.setTo(1.3,1.2);
            btn.x = 40+i%引导按钮.length*btn.width;
            btn.y = game.height - btn.height * 1.5;

            var icon = game.add.image(
                btn.x + btn.width * 0.1,
                btn.y,
                引导按钮[i].图标.toString(16).substring(4)
            );
            var text = game.add.text(
                icon.x+icon.width,
                btn.y + 10,
                引导按钮[i].名称,
                {fill:'black',fontSize:16}
            );

            if (引导按钮[i].图标==0) {
                // 没有图标的导航按钮（例如“离开”）文字直接在按钮内居中。
                text.anchor.setTo(0.5);
                text.x = btn.x + btn.width / 2;
                text.y = btn.y + btn.height / 2;
            }

            城市界面UI.add(btn);
            城市界面UI.add(icon);
            城市界面UI.add(text);
        }
    }
}
