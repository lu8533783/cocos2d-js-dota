var BeginScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        this.loadmeun();
    },
    loadmeun:function(){
        var size = cc.director.getWinSize();
        var item = new cc.MenuItemFont("开始",this.begin,this);
        item.fontSize = 80;

        var menu = new cc.Menu(item);
        this.addChild(menu);
        menu.x = size.width/2;
        menu.y = size.height/2;
    },
    begin: function () {
        cc.log("---开始---");
        flax.registerScene("playscene", PlayScene, res_play);
        flax.replaceScene("playscene");
    }

});