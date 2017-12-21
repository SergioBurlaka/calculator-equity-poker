
module.exports = function (ngModule) {
    ngModule.directive('pokerCardMajor', showPokerMajorCard);


    function showPokerMajorCard() {
        return {
            restrict: 'E',
            scope: {
                card: '='
            },
            link: link,
            templateUrl: 'directives/card-on-table/template-card-major.html'

        };

        function link(scope, element, attrs, ctrl) {


        }
    }
};
