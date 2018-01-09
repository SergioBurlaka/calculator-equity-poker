

module.exports = function (ngModule) {

    ngModule.factory('allCombinationsService', allCombinationsService);

    function allCombinationsService() {

        var service = {

            isRoyalFlush:      isRoyalFlush,
            isStraightFlush:   isStraightFlush,
            isQuads:           isQuads,
            isFullHouse:       isFullHouse,
            isFlush:           isFlush,
            isStraight:        isStraight,
            threeOfAKind:      threeOfAKind,
            isTwoPairs:        isTwoPairs,
            isOnePair:         isOnePair,
            getRankOfHighCard: getRankOfHighCard
        };


        return service;



       function isRoyalFlush(arrOfCards) {


            var isSuitBiggerThenFive = getSuitBiggerThenFive(arrOfCards);
            var suitCard = isSuitBiggerThenFive.suit;

            if(!(isSuitBiggerThenFive.count >= 5)){
                return false

            }

            var filteredArrBySuit = arrOfCards.filter((item) => item.slice(-1) === suitCard);

            var arrOfIndexes = convertCardToRank(filteredArrBySuit);
            var arrOfIndexesSorted = arrOfIndexes.sort(sortNumber);
            var makeString = arrOfIndexesSorted.join(',');



            return makeString.indexOf('8,9,10,11,12') >= 0
        }



       function getSuitBiggerThenFive(arrOfCards) {

            var countDiamonds = 0;
            var countHearts   = 0;
            var countSpades   = 0;
            var countClubs    = 0;

            for (var i = 0; i < arrOfCards.length; i++) {

                if (arrOfCards[i].slice(-1) == 'd') {
                    countDiamonds++;
                    continue
                }
                if (arrOfCards[i].slice(-1) == 'h') {
                    countHearts++;
                    continue
                }
                if (arrOfCards[i].slice(-1) == 's') {
                    countSpades++;
                    continue
                }
                if (arrOfCards[i].slice(-1) == 'c') {
                    countClubs++;
                }
            }

            var arrOfSuits = {
                'd': countDiamonds,
                'h': countHearts,
                's': countSpades,
                'c': countClubs
            };

            var maxCountSuit = 0;
            var suit = '';

            for(var key in arrOfSuits){
                if(arrOfSuits[key] > maxCountSuit){
                    maxCountSuit = arrOfSuits[key];
                    suit = key;
                }
            }

            var suitBiggerThenFive = {
                suit: '',
                count: 0
            };

            if(maxCountSuit >= 5){
                suitBiggerThenFive.suit = suit;
                suitBiggerThenFive.count = maxCountSuit;

            }

            return suitBiggerThenFive

        }



       function isStraightFlush(arrOfCards) {

            var isSuitBiggerThenFive = getSuitBiggerThenFive(arrOfCards);
            var suitCard = isSuitBiggerThenFive.suit;

            if(!(isSuitBiggerThenFive.count >= 5)){
                return {
                    isStraight: false,
                    straightCombination: []
                }
            }

            var filteredArrBySuit = arrOfCards.filter((item) => item.slice(-1) === suitCard);
            return findStraightSequence(filteredArrBySuit, false);

        }



       function isQuads(arrOfCards) {

            var quadsCard = getArrOfSameRankCard(arrOfCards,4);

            if(quadsCard.length !== 4){
                return {
                    isQuads: false,
                    rankOfQuads: []
                };
            }

            var filteredCards = filterPlayersCard(arrOfCards, quadsCard);
            var kickers =  getBestCardSequence(filteredCards, 1);
            var convertedTripleCardToRank =  convertCardToRank(quadsCard);
            var cardRankArr = [...convertedTripleCardToRank,...kickers];


            return {
                isQuads: true,
                rankOfQuads: cardRankArr
            }

        }



       function convertCardToRank(arrOfCards) {

            var templateStraightFlush = '234567891JQKA';
            var cardRunkArr = [];

            for(var i=0; i< arrOfCards.length; i++){
                var getCardRank =  arrOfCards[i].slice(0,1);
                var cardIndex = templateStraightFlush.indexOf(getCardRank);

                cardRunkArr.push(cardIndex)
            }

            return cardRunkArr
        }



       function getArrOfSameRankCard(arrOfCards,numberOfSameRank) {

            var templateStraightFlush = '234567891JQKA';
            var arrOfSameRankCard;
            for(var i=0; i < templateStraightFlush.length; i++){
                arrOfSameRankCard = arrOfCards.filter(
                    (item) => item.slice(0,1) === templateStraightFlush[i]
                );
                if(arrOfSameRankCard.length == numberOfSameRank){
                    return arrOfSameRankCard
                }
            }
            return []
        }



       function isFullHouse(arrOfCards) {

            var tripleCard = getArrOfSameRankCard(arrOfCards,3);

            if(tripleCard.length !== 3){
                return {
                    isFullHouse: false,
                    cardRunk: []
                };
            }

            var arrWithoutTripleCard = arrOfCards.filter(
                (item) => item.slice(0,1) !== tripleCard[0].slice(0,1)
            );

            var doubleCard = getArrOfSameRankCard(arrWithoutTripleCard,2);

            if(doubleCard.length !== 2){
                return {
                    isFullHouse: false,
                    cardRunk: []
                };
            }

            var fullHouse = [...tripleCard, ...doubleCard];
            var cardRunk  = convertCardToRank(fullHouse);


            return {
                isFullHouse: true,
                cardRunk: cardRunk
            };
        }



       function isFlush(arrOfCards) {
            var isSuitBiggerThenFive = getSuitBiggerThenFive(arrOfCards);
            var suit = isSuitBiggerThenFive.suit;


            if(isSuitBiggerThenFive.count >= 5){

                var arrCardSameSuit = arrOfCards.filter((item) => item.slice(-1) == suit);
                var cardRankArr = getBestCardSequence(arrCardSameSuit, 5);

                return {
                    isFlush: true,
                    cardRank: cardRankArr
                }
            }

            return {
                isFlush: false,
                cardRank: []
            };

        }



       function getArrWithoutSameRankCard(arrOfCards) {
            var tempArr = arrOfCards.slice();

            var arrOfDubbleCard = getArrOfSameRankCard(tempArr,2);

            while (arrOfDubbleCard.length > 0){
                var indexOfSameCard = tempArr.indexOf(arrOfDubbleCard[0]);
                tempArr.splice(indexOfSameCard,1);
                arrOfDubbleCard = getArrOfSameRankCard(tempArr,2);
            }
            return tempArr
        }



       function isStraight(arrOfCards) {

            var arrCardWithoutSameRank = getArrWithoutSameRankCard(arrOfCards);
            return findStraightSequence(arrCardWithoutSameRank, true);
        }



       function sortNumber(a,b) {
            return a-b;
        }



       function findStraightSequence(arrOfCards, useInStraight ) {

            var arrOfIndexes = convertCardToRank(arrOfCards);
            var arrOfIndexesSorted = arrOfIndexes.sort(sortNumber);
            var makeString = arrOfIndexesSorted.join(',');


            if ((makeString.indexOf('0,1,2,3') >= 0) &&
                (makeString.indexOf('12') >= 0) )  {
                return {
                    isStraight: true,
                    straightCombination: [1,1,1,1,1]
                }
            }

            if (makeString.indexOf('0,1,2,3,4') >= 0) {
                return  {
                    isStraight: true,
                    straightCombination: [2,2,2,2,2]
                }
            }

            if (makeString.indexOf('1,2,3,4,5') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [3,3,3,3,3]
                }
            }

            if (makeString.indexOf('2,3,4,5,6') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [4,4,4,4,4]
                }
            }

            if (makeString.indexOf('3,4,5,6,7') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [5,5,5,5,5]
                }
            }

            if (makeString.indexOf('4,5,6,7,8') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [6,6,6,6,6]
                }
            }

            if (makeString.indexOf('5,6,7,8,9') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [7,7,7,7,7]
                }
            }

            if (makeString.indexOf('6,7,8,9,10') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [8,8,8,8,8]
                }
            }

            if (makeString.indexOf('7,8,9,10,11') >= 0) {
                return {
                    isStraight: true,
                    straightCombination: [9,9,9,9,9]
                }
            }

            if ((makeString.indexOf('8,9,10,11,12') >= 0) && useInStraight) {
                return {
                    isStraight: true,
                    straightCombination: [10,10,10,10,10]
                }
            }


            return {
                isStraight: false,
                straightCombination: []
            }
        }



       function threeOfAKind(arrOfCards) {

            var tripleCard = getArrOfSameRankCard(arrOfCards, 3);
            if(tripleCard.length == 3){

                var filteredCards = filterPlayersCard(arrOfCards, tripleCard);
                var kickers =  getBestCardSequence(filteredCards, 2);
                var convertedTripleCardToRank =  convertCardToRank(tripleCard);
                var cardRankArr = [...convertedTripleCardToRank,...kickers];

                return {
                    isThreeOfAKind: true,
                    cardRankArr: cardRankArr
                }
            }

            return {
                isThreeOfAKind: false,
                cardRankArr: []
            }
        }



       function filterPlayersCard(arrOfCards, cardsForFilter) {
            var filteredCards = arrOfCards.slice();
            for(var i=0; i < cardsForFilter.length; i++){
                filteredCards = filteredCards.filter((item) => item !== cardsForFilter[i]);
            }
            return filteredCards
        }



       function isTwoPairs(arrOfCards) {

            var separatedArr = separateByPairs(arrOfCards);


            if(separatedArr.pairs.length <= 1){
                return {
                            isTwoPairs: false,
                            cardRank: []
                        };
            }


            var arrOfPair = separatedArr.pairs;
            var arrOfPairRanked = convertPairsToRank(arrOfPair);
            var sortedArrOfPairs =  arrOfPairRanked.sort(sortPairByDecrease);


            var arrWithoutPair = separatedArr.residue;


            var convertedFirstPair  =  sortedArrOfPairs[0];
            var convertedSecondPair =  sortedArrOfPairs[1];
            var convertedKicker     =  getBestCardSequence(arrWithoutPair, 1);

            var rankOfCards = [...convertedFirstPair,...convertedSecondPair,...convertedKicker];



            return {
                isTwoPairs: true,
                cardRank: rankOfCards
            };
        }



       function convertPairsToRank(arrOfPairs) {

            var arrOfPairsThatRanked = [];

            for(var i =0; i < arrOfPairs.length; i++ ){
                var tempArr = convertCardToRank(arrOfPairs[i]);
                arrOfPairsThatRanked.push(tempArr);
            }
            return arrOfPairsThatRanked
        }



       function sortPairByDecrease(a,b) {
            return b[0]-a[0];
        }



       function separateByPairs(arrOfCards) {
            var arrOfPair = [];
            var twoCardInPair = 2;
            var iterations = arrOfCards.length/twoCardInPair;
            iterations = Math.floor(iterations);
            var arrWithoutPair = arrOfCards.slice();


            for(var i =0; i <= iterations; i++ ){
                var tempPair = getArrOfSameRankCard(arrWithoutPair, twoCardInPair);

                if(tempPair.length == 0){
                    break
                }

                arrWithoutPair = arrWithoutPair.filter(
                    (item) => item.slice(0,1) !== tempPair[0].slice(0,1)
                );
                arrOfPair.push(tempPair);

            }

            return {
                pairs: arrOfPair,
                residue: arrWithoutPair
            }
        }



       function isOnePair(arrOfCards) {


            var firstPair = getArrOfSameRankCard(arrOfCards,2);

            if(firstPair.length !== 2){
                return {
                    isOnePair: false,
                    cardRank: []
                };
            }

            var arrWithoutFirstPair = arrOfCards.filter(
                (item) => item.slice(0,1) !== firstPair[0].slice(0,1)
            );

            var kicker = getBestCardSequence(arrWithoutFirstPair, 3);
            var convertedFirstPair = convertCardToRank(firstPair);
            var rankOfCards = [...convertedFirstPair,...kicker];


            return {
                isOnePair: true,
                cardRank: rankOfCards
            };
        }



       function sortNumberByIncrease(a,b) {
            return b-a;
        }



       function getBestCardSequence(tempCards, numberOfGetCards) {

            var convertedArr = convertCardToRank(tempCards);
            convertedArr.sort(sortNumberByIncrease);

            return convertedArr.slice(0, numberOfGetCards)
        }



       function getRankOfHighCard(tempCards) {
            var rankOfHighcard  = getBestCardSequence(tempCards, 5);
            return rankOfHighcard
        }



    }
};
