(function() {
  var app = angular.module('InfamousCriminals');

  app.controller('CriminalsController', function($http, $location){

    var self = this;

    $http({
      method: 'GET',
      url: '/api/criminals'
    }).then(function successCallback(response) {
      console.log('success', response.data);

      self.criminals = response.data;
    }, function errorCallback(response) {

    });

    this.addCrim = function(){

        $http({
          method: 'POST',
          url: '/api/criminals',
          data: {
            name: self.newCriminal.name,
            location: self.newCriminal.location,
            status: self.newCriminal.status
          }
        }).then(function successCallback(response) {

          self.criminals.push({
            _id: response.data._id,
            name: self.newCriminal.name,
            location: self.newCriminal.location,
            status: self.newCriminal.status
          });

          self.newCriminal.name = '';
          self.newCriminal.location = '';
          self.newCriminal.status = '';
          $location.path('/');
        }, function errorCallback(response) {
            console.log('error', response);
        });

      };

      this.deleteCrim = function(criminal){
        var criminalId = criminal._id;

          $http({
            method: 'DELETE',
            url: '/api/criminals/'+criminalId,
            data: {
            }
          }).then(function successCallback(response) {
            console.log(response);

            // Remove criminal from the array
            var index = -1;

            for (var i=0; i<self.criminals.length; i++) {
              if (self.criminals[i]._id === criminalId) {
                index = i;
                break;
              }
            }

            if (index === -1) {
              console.log("Something gone wrong =(");
            }else{
              self.criminals.splice(index, 1);
            };

          }, function errorCallback(response) {
              console.log('error', response);
          });
        };

      this.getCrim = function(criminal){
        $http({
          method: 'GET',
          url: '/api/criminals/'+criminal._id,
        }).then(function successCallback(response) {
          console.log('success', response.data);
          self.editCriminal = response.data;
          console.log(self.editCriminal._id);
        }, function errorCallback(response) {

        });
      };

      this.editCrim = function(editCriminal){
        var criminalId = self.editCriminal._id;
        var crimName = self.editCriminal.name;
        var crimLocation = self.editCriminal.location;
        var crimStatus = self.editCriminal.status;

          $http({
            method: 'PUT',
            url: '/api/criminals/'+criminalId+('/')+crimName+('/')+crimLocation+('/')+crimStatus,
            data: {
              _id: self.editCriminal.id,
              name: self.editCriminal.name,
              location: self.editCriminal.location,
              status: self.editCriminal.status
            }
          }).then(function successCallback(response) {

          }, function errorCallback(response) {
              console.log('error', response);
          });
        };

  });
  return this;
})();
