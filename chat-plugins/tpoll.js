'use strict';

const permission = 'announce';


exports.commands = {

        tourpoll: function(target, room, user) {
	             var tiers = ['Monotype', 'OU', 'Doubles OU', 'UU', 'Challenge Cup 1v1', 'Anything Goes', 'Ubers', 'Battle Factory' ];
		          this.parse('/poll create Tier of the next tournament?, ' + tiers);
	     },
};