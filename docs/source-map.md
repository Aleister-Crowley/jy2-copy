# 《金庸群侠传2》jy2-copy 源码地图

## 启动链路
- `game.exe`：Windows 本地入口。
- `index.html`：脚本加载顺序。
- `script/engine/phaser.min.js`：Phaser。
- `bootState.js / loaderState.js / menuState.js / index.js / fightState.js`：启动、加载、菜单、主剧情、战斗。

## 人物与属性
- `script/data/base.js`：基础属性、属性上限、升级经验。
- `script/story/player.js`：玩家动画、武功表现、可用武学。
- `script/story/主角数据可视化UI.js`：人物/武功/物品/秘籍/存档 UI。

当前人物数据同时存在 `base.o_base[0].主角`、`playerData`、`主角数据` 三层，后续逐步收敛。

## 武功
- `script/data/kungfu.js`：等级、经验、耗内、效果、升级。
- `script/story/player.js -> 所有武学`：图标和动画资源。
- `script/story/player.js -> 可用武学`：习得状态。
- `script/fightState.js`：选择、伤害、经验、升级。
- `script/core/registry.js`：加强版统一查询入口。

## 物品/装备/秘籍
- `script/data/item.js`
- `script/story/主角数据可视化UI.js`

## 战斗
核心：`script/fightState.js`。包括集气、普攻、武功、敌方绝招、胜负、结算。

## NPC / 敌人
- `script/story/enemys.js`：战斗敌人。
- `story_剧情_*.js`：普通 NPC 仍嵌在剧情数据。

## 剧情
剧情已按地点拆文件；`script/index.js` 仍承担大量剧情条件与全局剧情线变量。

## 地图
- `script/data/mapList.js`
- `script/story/主地图.js`
- `script/story/城市.js`
- `script/story/场景.js`

## 存档
原项目只有 UI，没有实际持久化。
加强版新增 `script/core/saveSystem.js`，保存主角、武功、物品、剧情位置、剧情线变量和版本号。

## 第一阶段
1. 注册中心和真实存档基础。
2. 武功动态列表/分页。
3. 最终属性统一计算。
4. 装备扩展。
5. Buff/Debuff。
6. NPC 数据化。
7. 任务系统。
8. 新门派/地图/剧情。
