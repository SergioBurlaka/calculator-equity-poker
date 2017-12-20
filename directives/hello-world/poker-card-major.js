
module.exports = function (ngModule) {
    ngModule.directive('pokerCardMajor', showPokerMajorCard);

    // showPokerMajorCard.$inject = ['$timeout'];
    // $timeout
    function showPokerMajorCard() {
        return {
            restrict: 'E',
            scope: {
                card: '='
            },
            link: link,
            templateUrl: 'directives/hello-world/hello-world.html'

        };

        function link(scope, element, attrs, ctrl) {


            // scope.name = scope.card.bigCardFileName;


            // element.on('click', function (e) {


                // console.log('scope.card');
                // console.log(scope.card);


                // $timeout(function(){
                //     scope.$emit('getActiveCard', scope.thisCard);
                // });
            //     scope.$apply();

            // })
        }
    }
};
