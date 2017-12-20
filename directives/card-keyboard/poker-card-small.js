


module.exports = function (ngModule) {
    ngModule.directive('pokerCardSmall', pokerCardSmall);

    pokerCardSmall.$inject = ['$timeout'];

    function pokerCardSmall($timeout) {
        return {
            restrict: 'E',
            scope:{
                card: '='
            },
            link:link,
            templateUrl: './directives/card-keyboard/template-small-card.html',
            controllerAs: 'vm',
            controller: 'showCards'
        };

        function link(scope, element, attrs, ctrl) {


            // scope.name = scope.card.smallCardFileName;


            // element.on('click', function (e) {
            //     // console.log(scope.activeCard);
            //     // console.log(scope.vm.activeCard);
            //     // console.log(scope.name);
            //     // console.log(scope.vm.activeCard);
            //     // console.log('smallCardFileName');
            //     // console.log(scope.card);
            //     // scope.$apply();
            //
            //
            //     // $timeout(function(){
            //     //     scope.$emit('notification', scope.card);
            //     // });
            //
            //
            // })


        }
    }
}

