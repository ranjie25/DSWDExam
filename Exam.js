
'use strict';
cMain.controller('ExamCtrl', ['$scope', '$rootScope', 'DataService', '$http', '$q', function (scope, rootScope, DataService, http, $q) {


    // ================================================================
    // EXAM ITEM 4

    scope.Region = [];
    scope.RegionId = 0;

    var GetReferences = function () {

        http({
            url: 'https://ncddpdb.dswd.gov.ph/api/ceac/lib_region',
            method: 'GET',
        }).success(function (data) {
            //console.log(data);
            scope.Region = data;
        }).error(function (response, status) {
            alert(response.Message);
        });

    }

    GetReferences();

    // ================================================================
    // EXAM ITEM 5
        
    // ============== DateTime Picker =================

    scope.BirthdateUpdate = {
        opened: false
    };

    scope.openDatePicker = function () {
        scope.BirthdateUpdate.opened = true;
    }

    scope.dateOptions = {
        formatYear: 'yyyy',
        showWeeks: false
    };

    // ================================================


    scope.Gender = [];
    scope.GenderId = 0;
    scope.Age = 0;
    scope.FName = '';
    scope.LName = '';
    scope.RegionId2 = 0;
    scope.BirthDate = new Date();

    var LoadReference = function () { 
        scope.Gender = 
            [
                {
                    'SexId' : 1,
                    'name': 'Male'
                }, 
                {
                    'SexId' : 2,
                    'name': 'Female'
                }
            ]


    }

    LoadReference();

    scope.Save = function () {

        var param = {};

        param = {
            CrudType: 1,
            FName: scope.FName,
            LName: scope.LName,
            Age: scope.Age,
            Gender: scope.GenderId,
            BirthDate: scope.BirthDate,
            Region: scope.RegionId2
        }
     
        DataService.CRUDInsert(param).then(function (item) {
            alert('ok');
        }).catch(function (error) {
            console.log(error);
        });

    }


}]);

cMain.factory('DataService', function ($http, $q, $rootScope) {
    var api = '/api/', cntrl = 'TestAPI/';
    var groupSvc = {};

    // FACTORY SETTING THAT GET DATA WITH PARAMETES
    groupSvc.DataServicesThruData = function (mathodName, api, cntrl, action, paramValue) {
        var deferred = $q.defer();
        var apiUrl = api + cntrl + action;

        $http({
            method: mathodName,
            url: apiUrl,
            data: paramValue
        })
        .success(function (GroupServices) {
            deferred.resolve(GroupServices);
        }).error(function (GroupServices, status) {
            deferred.reject(GroupServices.Message + ' ERROR CODE[' + status + ']');
        });

        return deferred.promise;
    };

    // FACTORY SETTING THAT GET DATA WITH-OUT PARAMTERS
    groupSvc.DataServicesThruNoParameter = function (mathodName, api, cntrl, action) {
        var deferred = $q.defer();
        var apiUrl = api + cntrl + action;

        $http({
            method: mathodName,
            url: apiUrl
        })
        .success(function (GroupServices) {
            deferred.resolve(GroupServices);
        }).error(function (GroupServices, status) {
            deferred.reject(GroupServices.Message + ' ERROR CODE[' + status + ']');
        });

        return deferred.promise;
    };

    // FACTORY SETTING THAT USES JSON FOR PARAMETERS
    groupSvc.DataServicesThruJSONData = function (mathodName, api, cntrl, action, paramValue) {
        var deferred = $q.defer();
        var apiUrl = api + cntrl + action;

        $http({
            method: mathodName,
            url: apiUrl,
            data: paramValue,
            dataType: "json",

        })
        .success(function (GroupServices) {
            deferred.resolve(GroupServices);
        }).error(function (GroupServices, status) {
            deferred.reject(GroupServices.Message + ' ERROR CODE[' + status + ']');
        });

        return deferred.promise;
    };

    // FACTORY SETTING THAT USES QUERY STRING FOR PARAMETERS
    groupSvc.DataServicesThruQueryString = function (mathodName, api, cntrl, action, paramValue) {
        var deferred = $q.defer();
        var apiUrl = api + cntrl + action + paramValue;

        $http({
            method: mathodName,
            url: apiUrl
        }).success(function (GroupServices) {
            deferred.resolve(GroupServices);
        }).error(function (GroupServices, status) {
            deferred.reject(GroupServices.Message + ' ERROR CODE[' + status + ']');
        });

        return deferred.promise;
    };

    // AHU RAEL DATA SERVICE
    groupSvc.ParamsdataServicesWithAPI = function (RequestType, action, paramValue, apiCntrllr) {
        var deferred = $q.defer();

        var apiUrl = api + apiCntrllr + "/" + action;

        $http({
            method: RequestType,
            url: apiUrl,
            params: paramValue,
            dataType: "json"
        })
        .success(function (GroupServices) {
            deferred.resolve(GroupServices);
        }).error(function (GroupServices, status) {
            deferred.reject(GroupServices.Message + ' ERROR CODE[' + status + ']');
        });

        return deferred.promise;
    };

    return {
        CRUDInsert: function (param) {
            return groupSvc.DataServicesThruJSONData('POST', api, cntrl, 'CRUDInsert', param);
        }
    }

});






    