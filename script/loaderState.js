/*
 * @Author: MngYou
 * @Date: 2022-01-19 10:37:34
 * @LastEditTime: 2022-02-27 21:28:16
 * @FilePath: \wx\script\loaderState.js
 */
var loaderState=function(game){
    var progressText;
    this.init=function(){
        var sprite=game.add.image(game.world.centerX,game.world.centerY,'loading');									//创建精灵对象 参数 横坐标 纵坐标 缓存名称
        sprite.anchor={x:0.5,y:0.5};																				//设置原点
        progressText=game.add.text(game.world.centerX,game.world.centerY+30,'0%',{fill:'#fff',fontSize:'16px'});	//创建文本对象 参数 横坐标 纵坐标 字符串 样式Json
        progressText.anchor={x:0.5,y:0.5};
    };
    this.preload=function(){
        //第一步加载游戏资源
        for (let i = 0; i < mapList.length; i++) {
            game.load.image('map' + mapList[i],`./images/map/${mapList[i]}.png`);
        }
        for (let i = 0; i < headList.length; i++) {
            game.load.image('head' + headList[i],`./images/head/${headList[i]}.png`);
        }
        for (let i = 0; i < mp3List.length; i++) {
            game.load.audio('mp3' + mp3List[i],`./audio/${mp3List[i]}.mp3`);
        }
        item['o_item'].forEach(function(item){
            var num = parseInt(item.图标).toString(16).substring(4);
            game.load.image('item' + item.名称,`./images/item/${num}.png`);
        }); 
        // Q版高清衡阳城资源
        game.load.image('hd_hengyang_map','./images/hd/hengyang_map.jpg');
        game.load.image('hd_hengyang_liufu','./images/hd/hengyang_liufu.png');
        game.load.image('hd_hengyang_wuguan','./images/hd/hengyang_wuguan.png');
        game.load.image('hd_hengyang_yiguan','./images/hd/hengyang_yiguan.png');
        game.load.image('hd_hengyang_kezhan','./images/hd/hengyang_kezhan.png');
        game.load.image('hd_hengyang_likai','./images/hd/hengyang_likai.png');
        // Q版主角状态面板与系统菜单
        game.load.image('hd_player_panel','./images/hd/ui/player_panel.png');
        game.load.image('hd_menu_role','./images/hd/ui/menu_role.png');
        game.load.image('hd_menu_kungfu','./images/hd/ui/menu_kungfu.png');
        game.load.image('hd_menu_bag','./images/hd/ui/menu_bag.png');
        game.load.image('hd_menu_book','./images/hd/ui/menu_book.png');
        game.load.image('hd_menu_save','./images/hd/ui/menu_save.png');
        game.load.image('hd_menu_leave','./images/hd/ui/menu_leave.png');
        // Q版功能窗口
        game.load.image('hd_panel_character','./images/hd/ui/panel_character.png');
        game.load.image('hd_panel_kungfu','./images/hd/ui/panel_kungfu.png');
        game.load.image('hd_panel_bag','./images/hd/ui/panel_bag.png');
        game.load.image('hd_panel_book','./images/hd/ui/panel_book.png');
        game.load.image('hd_panel_save','./images/hd/ui/panel_save.png');
        // Q版战斗场景样板
        game.load.image('hd_battle_forest','./images/hd/battle/forest.jpg');

        game.load.image('bgImage','./images/UI/bg/0010.png');
        game.load.image('logo_buff','./images/UI/logos/logo_buff.png');
        game.load.atlas('logo', './images/UI/logos/logo.png', './images/UI/logos/logo.json');
        game.load.atlas('scroll', './images/UI/Scrolls/scroll.png', './images/UI/Scrolls/scroll.json');
        game.load.atlas('scroll_button', './images/UI/system/button.png', './images/UI/system/button.json');
        game.load.image('loadOrSaveBox','./images/UI/system/loadOrSaveBox.png');
        game.load.image('infoBox','./images/UI/system/infoBox.png');
        game.load.image('role_data_init_setting','./images/UI/system/data_init_setting.png');
        game.load.atlas('sys_btn', './images/UI/system/sys_btn.png', './images/UI/system/sys_btn.json');
        game.load.atlas('sys_btn2', './images/UI/system/sys_btn2.png', './images/UI/system/sys_btn2.json');
        game.load.atlas('sys_btn3', './images/UI/system/sys_btn3.png', './images/UI/system/sys_btn3.json');
        game.load.atlas('sys_btn4', './images/UI/system/sys_btn4.png', './images/UI/system/sys_btn4.json');
        game.load.atlas('sys_icon_red', './images/UI/system/sys_icon_red.png', './images/UI/system/sys_icon_red.json');
        game.load.atlas('sys_icon_yellow', './images/UI/system/sys_icon_yellow.png', './images/UI/system/sys_icon_yellow.json');
        game.load.image('dialog_UI','./images/UI/dialog/dialog_UI.png');
        game.load.atlas('dialog_eft','./images/UI/dialog/eft.png', './images/UI/dialog/eft.json');
        game.load.atlas('剧情_衡阳_田伯光_eft','./images/UI/dialog/剧情_衡阳_田伯光.png', './images/UI/dialog/剧情_衡阳_田伯光.json');
        game.load.atlas('剧情_衡阳_主角_eft','./images/UI/dialog/剧情_衡阳_主角.png', './images/UI/dialog/剧情_衡阳_主角.json');
        game.load.atlas('fight_ui','./images/UI/fight/fight.png', './images/UI/fight/fight.json');
        game.load.spritesheet('fight_gird','./images/UI/fight/gird.png',60,60,1);
        game.load.spritesheet('fight_not','./images/UI/fight/not.png');
        game.load.image('0037','./images/UI/0037.png');
        game.load.image('0043','./images/UI/0043.png');
        game.load.image('0044','./images/UI/0044.png');
        game.load.image('0045','./images/UI/0045.png');
        game.load.image('0046','./images/UI/0046.png');
        game.load.image('0061','./images/UI/0061.png');
        game.load.image('0062','./images/UI/0062.png');
        game.load.image('0063','./images/UI/0063.png');
        game.load.image('0064','./images/UI/0064.png');
        game.load.image('0065','./images/UI/0065.png');
        game.load.image('0041','./images/UI/0041.png');
        game.load.image('0082','./images/UI/0082.png');
        game.load.image('0083','./images/UI/0083.png');
        game.load.image('0084','./images/UI/0084.png');
        game.load.spritesheet('0042','./images/UI/0042.png',202/6,45,6);

        for(var item_ in enemysData){
            
            game.load.atlas(enemysData[item_].名称,enemysData[item_].url.png, enemysData[item_].url.json);
            if (typeof(enemysData[item_].绝招.名称)!=='undefined') {
                game.load.atlas(enemysData[item_].绝招.名称,enemysData[item_].绝招.url.png, enemysData[item_].绝招.url.json);
            }
           
        }
        game.load.atlas(playerData.名称,playerData.url.png, playerData.url.json);
        // 按注册表中的武学类别动态加载资源。
        JY2.KungfuRegistry.getTypes().forEach(function(type){
            JY2.KungfuRegistry.getAll(type).forEach(function(skill){
                if (skill.url && skill.url.png && skill.url.json) {
                    game.load.atlas(skill.名称, skill.url.png, skill.url.json);
                }
            });
        });

        game.load.onFileComplete.add(function(progress){															//文件加载进度
            progressText.text=progress+'%';
        });

    };
    this.create=function(){
        if (progressText.text=="100%") {																			//显示加载进度【需要加载资源，不加载的情况下为0】
            game.state.start('menu');																				//游戏资源加载完成后跳转场景
        }
    };
}