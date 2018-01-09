

module.exports = function (ngModule) {

    ngModule.factory('findCombinationService', findCombinationService);

    findCombinationService.$inject = ['allCombinationsService'];

    function findCombinationService(allCombinationsService) {



        var service = {

            findCombination: findCombination
        };


        return service;



        function findCombination(tempCards) {


            if (allCombinationsService.isRoyalFlush(tempCards)) {
                return {
                    rankOfCombination: 10,
                    weight: [10,10,10,10,10]
                }
            }

            var isStraightFlushCombination = allCombinationsService.isStraightFlush(tempCards);
            if (isStraightFlushCombination.isStraight) {
                return {
                    rankOfCombination: 9,
                    weight: isStraightFlushCombination.straightCombination
                }
            }


            var isQuadsCombination = allCombinationsService.isQuads(tempCards);
            if (isQuadsCombination.isQuads) {
                return {
                    rankOfCombination: 8,
                    weight: isQuadsCombination.rankOfQuads
                }
            }


            var isFullHouseCombination = allCombinationsService.isFullHouse(tempCards);
            if (isFullHouseCombination.isFullHouse) {
                return {
                    rankOfCombination: 7,
                    weight: isFullHouseCombination.cardRunk
                }
            }


            var isFlushCombination = allCombinationsService.isFlush(tempCards);
            if (isFlushCombination.isFlush) {
                return {
                    rankOfCombination: 6,
                    weight: isFlushCombination.cardRank
                }
            }


            var isStraightCombination = allCombinationsService.isStraight(tempCards);
            if (isStraightCombination.isStraight) {
                return {
                    rankOfCombination: 5,
                    weight: isStraightCombination.straightCombination
                }
            }


            var isThreeOfAKindCombination = allCombinationsService.threeOfAKind(tempCards);
            if (isThreeOfAKindCombination.isThreeOfAKind) {
                return {
                    rankOfCombination: 4,
                    weight: isThreeOfAKindCombination.cardRankArr
                }
            }


            var isTwoPairsCombination = allCombinationsService.isTwoPairs(tempCards);
            if (isTwoPairsCombination.isTwoPairs) {
                return {
                    rankOfCombination: 3,
                    weight: isTwoPairsCombination.cardRank
                }
            }


            var isOnePairCombination = allCombinationsService.isOnePair(tempCards);
            if (isOnePairCombination.isOnePair) {
                return {
                    rankOfCombination: 2,
                    weight: isOnePairCombination.cardRank
                }
            }


            var rankOfCards = allCombinationsService.getRankOfHighCard(tempCards);

            return {
                rankOfCombination: 1,
                weight: rankOfCards
            }

        }



    }
};
