game.module(
	'game.elements.pallete'
)
.require(
	'engine.sprite'
)
.body(function() {

var pallete;

Pallete = game.Sprite.extend({
	init: function(_x, _y) {
		this._super(_x, _y, 'bgPallete');
		pallete = this;
		this.visible = false;

		this.framesColor = new Array();

		this.create();
	},
	show: function() {
		pallete.visible = true;
	},
	exit: function() {
		pallete.visible = false;
	},
	create: function() {
		var i = 0;
		var j = 0;
		var k = 0;

		var r = ['00','33', '66', '99', 'CC', 'FF'];
		var g = ['00','33', '66', '99', 'CC', 'FF'];
		var b = ['00','33', '66', '99', 'CC', 'FF'];
		var colors = [];
		var grays = [];

		for (i = 0; i < r.length; i++) {
			for (j = 0; j < g.length; j++) {
				for (k = 0; k < b.length; k++) {
					colors.push(r[i]+g[j]+b[k]);
					if (r[i] == g[j] && g[j] == b[k]) {
						grays.push(r[i]+g[j]+b[k]);
					}
				}
			}
		}
		for (i = 0; i < grays.length; i++) {
			colors.push(grays[i]);
		}

		var index = 0;
		var space = 5;
		for (i = 0; i < 19; i++) {
			for (j = 0; j < 12; j++) {
				if (i == 18 && j > 5) {} else {
					this.framesColor.push(new game.Sprite('frameTabColor'));
					this.framesColor[index].name = colors[index];
					this.framesColor[index].anchor.set(0.5, 0.5);
					this.framesColor[index].interactive = true;
					this.framesColor[index].buttonMode = true;
					this.framesColor[index].click = this.selectColor;
					this.framesColor[index].tint = '0x'+colors[index];
					this.addChild(this.framesColor[index]);
					this.framesColor[index].x = (j*(this.framesColor[index].width+space))+18;
					this.framesColor[index].y = (i*(this.framesColor[index].height+space))+16;
					index++;
				}
			}
		}
	},
	selectColor: function(evt) {
		this.parent.visible = false;
		game.scene.changeColor(evt.target.name);
	}
});

});