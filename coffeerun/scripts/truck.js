(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }
  //property can be refered to only by instance
  Truck.prototype.createOrder = function (order) {
   debugger
    console.log('Adding order for ' + order.emailAddress);

    this.db.add(order.emailAddress, order);
  };
//only can see sth before debugger
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  App.Truck = Truck;


  window.App = App;

})(window);
