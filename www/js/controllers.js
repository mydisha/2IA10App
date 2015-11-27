angular.module('ia10.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('detailtugas', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,tampiltugas,$window){
    $scope.showDataId = function() {
      tampiltugas.getId($stateParams.idtugas).success(function(datatugas) {
            $scope.datatugass = datatugas;
        });

    };
    $scope.showDataId();

    $scope.hapus = function(datatugas) {
      tampiltugas.delete(datatugas.id);
      $scope.datatugass.splice($scope.datatugass.indexOf(datatugas),1);
      window.plugins.toast.showShortBottom('Tugas berhasil dihapus');
      $state.go('app.tugas');
    }
})

.controller('pengaturan', function ($scope, $location, $window) {

        $scope.themes = [
            'light',
            'stable',
            'positive',
            'calm',
            'balanced',
            'energized',
            'assertive',
            'royal',
            'dark'
        ];

        var selectedTheme = $window.localStorage.appTheme;
        if (selectedTheme) {
            $scope.appTheme = selectedTheme;
        } else {
            $scope.appTheme = 'assertive';
        }
        $scope.themeChange = function (theme) {
            $window.localStorage.appTheme = theme;
            $window.location = '';
        }

    })

.controller('daftartugas', function($scope,$state, tampiltugas, $ionicPopup){
    $scope.showData = function() {
      tampiltugas.getAll().success(function(data) {
            $scope.datatugass = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();

})

.controller('dashboard', function($scope, $stateParams, $ionicPopup,$window, backcallFactory) {
backcallFactory.backcallfun();

$scope.cekuser = function(){
  $scope.data = {};
  if(!$window.localStorage.username){
    var userPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.username" autofocus>',
      title: 'Masukkan username',
      scope: $scope,
      buttons: [{
        text: 'Simpan',
        type: $window.localStorage.appTheme,
        onTap: function(e){
          if(!$scope.data.username){
            e.preventDefault();
          }else{
            return $scope.data.username;
          }
        }
      }]
    });
    userPopup.then(function(res){
      $window.localStorage.username = res;
    })
  }
  $scope.username = $window.localStorage.username;
}
})


.controller('tambahtugas', function($scope,$ionicPopup,$state,tampiltugas,$window){
    $scope.datatugas={};
    $scope.username = $window.localStorage.username;
    $scope.simpan = function (){
        if (!$scope.datatugas.matkul){
            //window.plugins.toast.showShortBottom('Mata kuliah mohon diisi');
            console.log('Mata Kuliah');
        }else if (!$scope.datatugas.keterangan){
            //window.plugins.toast.showShortBottom('Keterangan mohon diisi');
            console.log('Keterangan');
        }else if (!$scope.datatugas.deadline){
            //window.plugins.toast.showShortBottom('Format tanggal [YYYY-MM-DD');
            console.log('Tanggal');
        }
            //window.plugins.toast.showShortBottom('Nama mohon diisi');
        else{
            tampiltugas.create({
                matkul: $scope.datatugas.matkul,
                keterangan: $scope.datatugas.keterangan,
                deadline: $scope.datatugas.deadline,
                posting: $scope.username
            }).success(function(data){
            //window.plugins.toast.showShortBottom('Tugas berhasil diposting');
          });
            $state.go('app.tugas');
        }

    };
})

.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){

var obj={}
    obj.backcallfun=function(){
      var backbutton=0;
       $ionicPlatform.registerBackButtonAction(function () {
          if ($state.current.name == "app.dashboard") {

       if(backbutton==0){
                  backbutton++;
                    window.plugins.toast.showShortCenter('Tekan lagi untuk keluar');
                  $timeout(function(){backbutton=0;},5000);
              }else{
                  navigator.app.exitApp();
              }

      }else{
            $ionicHistory.nextViewOptions({
                 disableBack: true
                });
        $state.go('app.dashboard');
        //go to home page
     }
        }, 100);//registerBackButton
}//backcallfun
return obj;
}]);
