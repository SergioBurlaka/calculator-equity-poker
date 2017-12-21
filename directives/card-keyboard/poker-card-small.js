


module.exports = function (ngModule) {
    ngModule.directive('pokerCardSmall', pokerCardSmall);

    function pokerCardSmall() {
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


        }
    }
}

