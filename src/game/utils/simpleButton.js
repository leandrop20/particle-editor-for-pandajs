game.module(
	'game.utils.simpleButton'
)
.require(
	'engine.sprite'
)
.body(function() {
	
SimpleButton = game.Sprite.extend({
	init: function(_x, _y, _texture, _text, _style) {
		if(typeof(_x) !== 'number') _texture = _x;
		_texture = _texture || _x;
		this._super(_x, _y, _texture);
		this.anchor.set(0.5, 0.5);
		this.buttonMode = true;
		this.interactive = true;

		_style = _style || {};
		_text = _text || '';

		this.text = new game.Text(_text, _style);
		this.text.x = -Math.floor(105*0.5);
		this.text.y = -Math.floor(15*0.5);
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
	setText: function(_text) {
		this.text.setText(_text);
	}
});

});