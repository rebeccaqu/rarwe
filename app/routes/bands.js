import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';

// BANDS COLLECTION OBJECT
var BandsCollection = Ember.Object.extend({
  content: [],
  sortProperties: ['name:desc'],
  sortedContent: Ember.computed.sort('content', 'sortProperties')
});

// Seeds
var blackDog = Song.create({
  title: 'Black Dog',
  band: 'Led Zeppelin',
  rating: 3
});

var yellowLedbetter = Song.create({
  title: 'Yellow Ledbetter',
  band: 'Pearl Jam',
  rating: 4
});

var daughter = Song.create({
  title: 'Daughter',
  band: 'Pearl Jam',
  rating: 5
});

var pretender = Song.create({
  title: 'The Pretender',
  band: 'Foo Fighters',
  rating: 2
});

var ledZeppelin = Band.create({ name: 'Led Zeppelin', songs: [blackDog] });
var pearlJam = Band.create({
  name: 'Pearl Jam',
  songs: [yellowLedbetter, daughter],
  description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990'
});
var fooFighters = Band.create({ name: 'Foo Fighters', songs: [pretender] });

var bands = BandsCollection.create();
bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);

// ROUTE for BANDS
export default Ember.Route.extend({
  model: function(params) {
    return bands;
  },

  actions: {
    createBand: function() {
      var name = this.get('controller').get('name');
      var band = Band.create({ name: name });
      bands.get('content').pushObject(band);
      this.get('controller').set('name', '');
      this.transitionTo('bands.band.songs', band);
      }
    }
});
