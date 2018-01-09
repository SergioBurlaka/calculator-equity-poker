

module.exports = function (ngModule) {
    ngModule.factory('cardGeneratorService', cardGeneratorService);

    function cardGeneratorService() {


        var service = {

            getRandomCard: getRandomCard
        };


        return service;

        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }



        function generateRandomCards(generateCards, deckState) {
            var arrCards = [];
            for(var i=0; i < generateCards; i++){

                var randomCard = randomInteger(0, deckState.length-1);
                arrCards.push(deckState[randomCard]);
                deckState = deckState.filter((item) => item !== deckState[randomCard]);

            }
            return arrCards
        }



        function filterDeck(deck, cardsForFilter) {
            for(var i=0; i < cardsForFilter.length; i++){
                deck = deck.filter((item) => item !== cardsForFilter[i]);
            }
            return deck
        }


        function findCardAtPokerDeck(pokerDeck, myCard){

            for(var i=0; i < pokerDeck.length; i++){
                if(pokerDeck[i] === myCard){
                    return i
                }
            }
        }


        function getAllPositionsAtPokerDeck(pokerDeck, knownCardArray) {
            var positionArrOfCards = [];
            for(var i=0; i < knownCardArray.length; i++){
                var tempVariable = findCardAtPokerDeck(pokerDeck, knownCardArray[i]);
                positionArrOfCards.push(tempVariable);
            }
            return positionArrOfCards
        }


        function getRandomCard(pokerDeck, knownCardArray, numberOfCards, excludeCardArr) {


            var deck = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
            ];

            var positionOfAllKnownCard = getAllPositionsAtPokerDeck(pokerDeck, [...knownCardArray, ...excludeCardArr]);

            var cardForGenerate = numberOfCards - positionOfAllKnownCard.length;

            var filteredDeck = filterDeck(deck, positionOfAllKnownCard);
            var generatedCards = generateRandomCards(cardForGenerate, filteredDeck);

            var summOfCardNumbers = [...generatedCards];


            for (var i = 0; i < summOfCardNumbers.length; i++) {
                summOfCardNumbers[i] = pokerDeck[summOfCardNumbers[i]];
            }

            return summOfCardNumbers


        }




    }
};
