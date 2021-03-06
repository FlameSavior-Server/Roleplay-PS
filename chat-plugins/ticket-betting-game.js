'use strict';

let color = require('../config/color');

let diceOne = function (dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
};

let diceTwo = function (dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
};

let rng = function (n) {
	n = Math.floor(Math.random() * 100);
	return n;
};

function isEven(n) {
	return n % 2 === 0;
}

function isOdd(n) {
	return Math.abs(n % 2) === 1;
}

exports.commands = {
	ticketsbet: 'ticketbet',
        ticketbet: function (target, room, user) {
		let firstDice = diceOne();
		let secondDice = diceTwo();
		let totalDice = firstDice + secondDice;
		let house = rng();
		let choice = target.toUpperCase();
		let amount = Db('ticket').get(user.userid, 0);

		if (amount < 20) return this.errorReply("You don't have enough tickets for the bet.");

		if (!target) return this.parse('/help bucksbet');
                if (!this.canBroadcast()) return false;
		if (room.id !== 'casino') return this.sendReply('|html|You can only start a game of tickets bet in the <button name = "send" value = "/join casino">Casino</button>');

		switch (choice) {
		case 'ODD':
			Db('money').set(user.userid, amount - 20).get(user.userid);
			if (isOdd(totalDice) && house < 87) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 20).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		case 'EVEN':
			Db('money').set(user.userid, amount - 20).get(user.userid);
			if (isEven(totalDice) && house < 87) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 20).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		case '7': case 'SEVEN':
			Db('money').set(user.userid, amount - 20).get(user.userid);
			if (totalDice === 7 && house < 70) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 140).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		default:
			this.errorReply("Not a valid bet.");
		}
	},
        ticksbethelp: ["/ticketbet [type] - rolls two dices and adds the two to make a final number. Choose between odd, even or seven. If you guess correctly you win bucks (betting for seven and winning awards more bucks)."],
};
