angular.module("postfeed") //did'nt used (..,[]) because module exist in htmlfile
  .controller("postCtrl", function ($scope,$http) {

        $scope.data = {};

          $http.get('http://localhost:3000/api/posts')
                      .then(function (data) {
                      $scope.data.posts = data.data.data;
                  })
                  .catch(function (error) {
                      $scope.data.error = error;
                    });

                                  // when submitting the add form, send the text to the node API
               $scope.addpost = function() {
                   $http.post('/addpost', {"heading":$scope.postForm.postHead,"content":$scope.postForm.postContent})
                       .then(function(data) {
                          //  $scope.postHead = {};
                          //  $scope.postContent={}; // clear the form so our user is ready to enter another
                           //console.log(data);
                           $scope.data.posts = data.data.data;

                       })
                       .catch(function(data) {
                           console.log('Error: ' + data);
                       });
               }
        $scope.deletepost = function(id) {
          $http.delete('http://localhost:3000/deletepost/'+id)
                      .then(function (data) {

                      $scope.data.posts = data.data.data;
                  })
                  .catch(function (error) {
                      $scope.data.error = error;
                    });
                    }
                  });
