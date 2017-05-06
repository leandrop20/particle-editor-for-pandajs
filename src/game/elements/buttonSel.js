game.module(
	'game.elements.buttonSel'
)
.require(
	'engine.sprite'
)
.body(function() {

ButtonSel = game.Sprite.extend({
	init: function(_name, _id, _min, _max) {
		this.id = _id;
		this.name = _name;
		this._super('bgBtnOff');
		this.anchor.set(0.5, 0.5);
		this.buttonMode = true;
		this.min = _min;
		this.max = _max;
		this.value = 0;

		this.title = new game.Text(_name, {fill:'white', font:'14px Inconsolata'});
		this.title.position.set((-this.width*0.5)+7, -10);
		this.addChild(this.title);

		this.text = new game.Text('0', {fill:'white', font:'14px Inconsolata'});
		this.text.position.set(40, -10);
		this.addChild(this.text);
	},
	setText: function(_value) {
		this.text.setText(_value);
	},
	mousedown: function() {
		this.scale.set(0.95, 0.95);
		this.parent.activateBtn(this.id);
	},
	mouseup: function() {
		this.scale.set(1, 1);
	},
	mouseout: function() {
		this.scale.set(1, 1);
	}
});

});