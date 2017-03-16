// QUnit.test( "Testing", function( assert ) {
//   assert.ok( 1 == "1", "Passed!" );
// });

// (function(window) {
//     'use strict';
//     var App = window.App;
//
//     var Truck = App.Truck;
//     var DataStore = App.DataStore;
//     var myTruck = new Truck('ncc-1701', new DataStore());
//     window.myTruck = myTruck;
// })(window);
var App = window.App || {};
var ds = new App.DataStore();

QUnit.test('Add Test', function(assert) {
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    assert.equal(ds.get('m@bond.com'), 'tea', 'add m@bond.com test');
    assert.equal(ds.get('james@bond.com'), 'eshpressho', 'add james@bond.com check');
});

QUnit.test('Get All', function(assert) {
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    assert.deepEqual(ds.getAll(), {
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    }, 'Got All');
});

QUnit.test('Remove', function(assert) {
    ds.add('james@bond.com', 'eshpressho');
    ds.remove('james@bond.com');

    assert.equal(ds.get('james@bond.com'), undefined, 'Removed');
});

QUnit.test('Get Specific', function(assert) {
    ds.add('m@bond.com', 'tea');

    assert.equal(ds.get('m@bond.com'), 'tea', 'Got Specific');
});

QUnit.test('Truck Test', function(assert) {

    var App = window.App;

    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    assert.deepEqual(myTruck.printOrders(), {
        'dr@no.com': {
            'coffee': 'decaf',
            'emailAddress': 'dr@no.com'
        },
        'm@bond.com': {
            'coffee': 'earl grey',
            'emailAddress': 'm@bond.com'
        },
        'me@goldfinger.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinger.com'
        }
    }, 'myTruck - after createOrder()');

    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');

    assert.deepEqual(myTruck.printOrders(), {
        'me@goldfinger.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinger.com'
        }
    }, 'myTruck - after deliverOrder()');
});
