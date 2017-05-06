game.module(
	'game.elements.buttonColor'
)
.require(
	'engine.sprite'
)
.body(function() {
	
ButtonColor = game.Sprite.extend({
	init: function(_x, _y, _path) {
		this._super(_x, _y, _path);
		this.anchor.set(0.5, 0.5);
		this.interactive = true;
		this.buttonMode = true;

		this.ref = new game.Sprite(60, 0, 'frameColor');
		this.ref.anchor.set(0.5, 0.5);
		this.addChild(this.ref);

		this.text = new game.Text('#FFFFFF', {fill:'white', font:'14px Inconsolata'});
		this.text.position.set(-80, -8);
		this.addChild(this.text);
	},
	mousedown: function() {
		this.scale.set(0.95, 0.95);
	},
	mouseup: function() {
		this.scale.set(1, 1);
	},
	mouseout: function() {
		this.scale.set(1, 1);
	},
	changeColor: function(_color) {
		this.ref.tint = '0x'+_color;
		this.text.setText('0x'+_color);
	}
});

});