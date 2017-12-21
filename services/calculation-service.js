

module.exports = function (ngModule) {
    ngModule.factory('calculationService', calculationService);

    function calculationService( ) {


        var service = {

            sayHelloFromService: sayHelloFromService
        };


        return service;


        function sayHelloFromService(flopArr, turnArr, riverArr, excludedArr, playersArr) {

            var timeOfIteration = 10000;

            var  deckPoker52 = [
            '2 s', '3 s', '4 s', '5 s', '6 s', '7 s',
            '8 s', '9 s', '1 s', 'J s', 'Q s', 'K s', 'A s',
            '2 h', '3 h', '4 h', '5 h', '6 h', '7 h',
            '8 h', '9 h', '1 h', 'J h', 'Q h', 'K h', 'A h',
            '2 d', '3 d', '4 d', '5 d', '6 d', '7 d',
            '8 d', '9 d', '1 d', 'J d', 'Q d', 'K d', 'A d',
            '2 c', '3 c', '4 c', '5 c', '6 c', '7 c',
            '8 c', '9 c', '1 c', 'J c', 'Q c', 'K c', 'A c'
        ];

        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }





        function isSameSuit(arr) {
            var firstCart = arr[0].slice(-1);
            for(var i=0; i < arr.length; i++){
                var tempCart = arr[i].slice(-1);
                if(firstCart !== tempCart){
                    return false
                }
            }
            return true
        }



        function isRoyalFlush(arrOfCards) {

            if(!isSameSuit(arrOfCards)){
                return false
            }

            if(!findCard(arrOfCards, '1')){
                return false
            }

            if(!findCard(arrOfCards, 'J')){
                return false
            }

            if(!findCard(arrOfCards, 'Q')){
                return false
            }

            if(!findCard(arrOfCards, 'K')){
                return false
            }

            if(!findCard(arrOfCards, 'A')){
                return false
            }



            return true
        }

        function findCard(arrOfCards, lastSign) {

            for(var i=0; i< arrOfCards.length; i++){
                var tempCard = arrOfCards[i].slice(0, 1);
                if(tempCard == lastSign ){
                    return true
                }
            }
            return false
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



        function filterDeck(deck, cardsForFilter) {
            for(var i=0; i < cardsForFilter.length; i++){
                deck = deck.filter((item) => item !== cardsForFilter[i]);
            }
            return deck
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





        function sortNumber(a,b) {
            return a-b;
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

            var filteredArrBySuit = arrOfCards.filter((item)=> item.slice(-1) === suitCard);
            return findStraightSequence(filteredArrBySuit, false);

        }




        function isQuads(arrOfCards) {
            var templateStraightFlush = '234567891JQKA';

            for(var i=0; i < templateStraightFlush.length; i++){

                var tempArr = arrOfCards.filter((item) => item.slice(0,1) === templateStraightFlush[i]);

                if(tempArr.length >= 4){

                    var cardWitoutQuads = arrOfCards.filter((item) => item.slice(0,1) !== tempArr[0].slice(0,1));

                    var quadKicker = getBestCardSequence(cardWitoutQuads, 1);
                    var rankOfCards =  convertCardToRank([...tempArr,...quadKicker]);

                    return {
                        isQuads: true,
                        rankOfQuads: rankOfCards
                    }
                }
            }
            return {
                isQuads: false,
                rankOfQuads: []
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
                arrOfSameRankCard = arrOfCards.filter((item) => item.slice(0,1) === templateStraightFlush[i]);
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

            var arrWithoutTripleCard = arrOfCards.filter((item) => item.slice(0,1) !== tripleCard[0].slice(0,1));
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
                var flushCard = getBestCardSequence(arrCardSameSuit, 5);
                var cardRankArr = convertCardToRank(flushCard);

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





        function isStraight (arrOfCards) {
            var arrCardWithoutSameRank = getArrWithoutSameRankCard(arrOfCards);

            return findStraightSequence(arrCardWithoutSameRank, true);
        }


        function findStraightSequence(arrOfCards, useInStraight ) {

            var arrOfIndexes =[];
            var templateStraightFlush = '234567891JQKA';

            for(var i=0; i< arrOfCards.length; i++){
                var signOfCard = arrOfCards[i].slice(0,1);
                var indexOfSign = templateStraightFlush.indexOf(signOfCard);
                arrOfIndexes.push(indexOfSign);
            }

            arrOfIndexes = arrOfIndexes.sort(sortNumber);
            var makeString = arrOfIndexes.join(',');



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
                var cardRankArr = convertCardToRank([...tripleCard,...kickers]);

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





        function  isTwoPairs(arrOfCards) {


            var firstPair = getArrOfSameRankCard(arrOfCards,2);

            if(firstPair.length !== 2){
                return {
                    isTwoPairs: false,
                    cardRank: []
                };
            }


            var arrWithoutFirstPair = arrOfCards.filter((item) => item.slice(0,1) !== firstPair[0].slice(0,1));
            var secondPair = getArrOfSameRankCard(arrWithoutFirstPair,2);


            if(secondPair.length !== 2){
                return {
                    isTwoPairs: false,
                    cardRank: []
                };
            }


            var arrWithoutSecondPair = arrWithoutFirstPair.filter((item) => item.slice(0,1) !== secondPair[0].slice(0,1));
            var kicker = getBestCardSequence(arrWithoutSecondPair, 1);
            var convertedFirstPair =  convertCardToRank(firstPair);
            var convertedSecondPair =  convertCardToRank(secondPair);
            var convertedKicker =  convertCardToRank(kicker);

            var rankOfCards = [...convertedFirstPair,...convertedSecondPair,...convertedKicker];

            if(convertedSecondPair[0] > convertedFirstPair[0]){
                rankOfCards = [...convertedSecondPair,...convertedFirstPair,...convertedKicker];
            }


            return {
                isTwoPairs: true,
                cardRank: rankOfCards
            };
        }







        function  isOnePair(arrOfCards) {


            var firstPair = getArrOfSameRankCard(arrOfCards,2);

            if(firstPair.length !== 2){
                return {
                    isOnePair: false,
                    cardRank: []
                };
            }

            var arrWithoutFirstPair = arrOfCards.filter((item) => item.slice(0,1) !== firstPair[0].slice(0,1));

            var kicker = getBestCardSequence(arrWithoutFirstPair, 3);
            var rankOfCards = convertCardToRank([...firstPair,...kicker]);


            return {
                isOnePair: true,
                cardRank: rankOfCards
            };
        }






        function findWinner(flop, turn, generateTurn, river, generateRiver, excludeCards, firstPlayer, secondPlayer) {

            var players = [];
            var numbersOfPlayers = 0;
            var playerHasTwoCard = 2;

            for(var l=6; l < arguments.length; l++){
                numbersOfPlayers++;
                players.push(arguments[l]);
            }

            var knownCardArray = flop;
            var flopLength = 3;

            if(generateTurn){
                knownCardArray =[...knownCardArray,...turn];
            }

            if(generateRiver){
                knownCardArray =[...knownCardArray,...river];
            }


            if(flop.length === 0){
                var everyTimeInitFlop = true
            }

            if(turn.length === 0 && generateTurn){
                var everyTimeInitTurn = true
            }

            if(river.length === 0 && generateRiver){
                var everyTimeInitRiver = true
            }


            players = setGenerationCardForUsers(players);
            var allPlayersCard = getAllPlayersCard(players);

            var numberOfCardForGenerate = flopLength + generateTurn + generateRiver + numbersOfPlayers * playerHasTwoCard;

            knownCardArray = [...knownCardArray,...allPlayersCard];



            for(var i=0; i < timeOfIteration; i++){


                var randomCards = getRandomCards(deckPoker52, knownCardArray, numberOfCardForGenerate, excludeCards);


                flop  = creatingFlop(flop,randomCards,everyTimeInitFlop);
                turn  = creatingTurn(turn,randomCards,everyTimeInitTurn);
                river = creatingRiver(river,randomCards,everyTimeInitRiver);


                var cardOnBoard = [...flop,...turn,...river];




                players = creatingPlayersCard(players, cardOnBoard, randomCards);
                players = setCombinationHierarhy(players);



                var allPlayersCombinationRank = getAllPlayersCombinationRank(players);



                var playersWithSameRank = getWinners(allPlayersCombinationRank);
                var playersWin = playersWithSameRank.countSameValue;




                if(playersWin.length > 1 ){

                    var playersCardWeight =  getWeightCard(players, playersWin);



                    var highestCard  = findHighestCard(...playersCardWeight);
                    var playerWhoWin = getWinners(highestCard).countSameValue;


                    var indexesOfWinner = getPlayerIndexWhoWin(playerWhoWin, playersWin );




                    if(indexesOfWinner.length == 1){
                        setWin(players, indexesOfWinner);
                    }

                    if(indexesOfWinner.length > 1){
                        setTie(players, indexesOfWinner);
                    }

                }

                if(playersWin.length == 1){
                    setWin(players, playersWin);
                }


            }


            return players

        }



        function setGenerationCardForUsers(players) {

            for(var i=0; i < players.length; i++){

                if(players[i].getCard().length == 0 ){
                    players[i].setGeneratePlayersCard()
                }

            }

            return players
        }


        function getPlayerIndexWhoWin(arrOfWinner, playersWithSameRank ) {
            var arrOfIndexPlayers = [];
            for(var i=0; i <arrOfWinner.length; i++ ){
                var indexOfWinner = arrOfWinner[i];
                arrOfIndexPlayers.push(playersWithSameRank[indexOfWinner]);
            }
            return arrOfIndexPlayers
        }


        function setTie(players, playersWhoWin) {

            for(var i=0; i < playersWhoWin.length; i++){

                var playerIndex = playersWhoWin[i];
                players[playerIndex].setTie();
            }

            return players
        }

        function setWin(players, playersWhoWin) {

            for(var i=0; i < playersWhoWin.length; i++){

                var playerIndex = playersWhoWin[i];
                players[playerIndex].setWin();
            }

            return players
        }



        function getAllPlayersCombinationRank(players) {

            var allPlayersCombinationRank = [];

            for(var i=0; i < players.length; i++){
                var tempPlayerCombinationRank = players[i].getHierarchicCardCombination().rankOfCombination;
                allPlayersCombinationRank.push(tempPlayerCombinationRank);

            }

            return allPlayersCombinationRank
        }



        function getWeightCard(players, indexesOfTieRank) {

            var arrWeightOfCards = [];

            for(var i=0; i < indexesOfTieRank.length; i++){
                var indexOfPlayer = indexesOfTieRank[i];
                arrWeightOfCards.push(players[indexOfPlayer].getHierarchicCardCombination().weight) ;

            }

            return arrWeightOfCards
        }

        function getAllPlayersCard(players) {

            var allPlayersCard = [];

            for(var i=0; i < players.length; i++){
                var tempPlayerCard = players[i].getCard();
                allPlayersCard = [...allPlayersCard,...tempPlayerCard];
            }

            return allPlayersCard
        }


        function creatingFlop(flop,randomCards, generateFlop) {

            if(generateFlop){
                flop = randomCards.splice(-3,3);
            }
            return flop
        }


        function creatingTurn(turn,randomCards,generateTurn) {

            if(generateTurn){
                turn = randomCards.splice(-1,3);
            }
            return turn
        }


        function creatingRiver(river,randomCards,generateRiver) {

            if(generateRiver){
                river = randomCards.splice(-1,3);
            }
            return river
        }



        function creatingPlayersCard(players, cardOnBoard, randomCards) {

            for(var i=0; i < players.length; i++){

                var generateCardForUser = players[i].getGeneratePlayersCard();

                if(generateCardForUser){
                    players[i].setCard(randomCards.splice(-2,2))
                }

                var getOwnPlayerCards = players[i].getCard();
                players[i].setPlayCombination([...cardOnBoard,...getOwnPlayerCards])

            }

            return players
        }



        function setCombinationHierarhy(players) {

            for(var i=0; i < players.length; i++){

                var playerCombination  = players[i].getPlayCombination();
                var cardRankCombination  = findCombination(playerCombination);
                players[i].setHierarchicCardCombination(cardRankCombination);

            }

            return players
        }



        class MakePlayer{
            constructor(card){
                this.card = card;

                this.playCombination = [];
                this.win = 0;
                this.tie = 0;
                this.hierarchicCardCombination = 0;
                this.generatePlayerCard = false;
            }


            setGeneratePlayersCard (){
                this.generatePlayerCard = true;
            }

            getGeneratePlayersCard (){
                return this.generatePlayerCard
            }


            setWin() {
                this.win++
            }

            setTie() {
                this.tie++
            }

            getCard() {
                return this.card
            }

            setCard(card) {
                this.card = card;
            }

            getPlayCombination() {
                return this.playCombination
            }

            setPlayCombination(playCombination) {
                this.playCombination = playCombination;
            }

            setHierarchicCardCombination(cardCombination) {
                this.hierarchicCardCombination = cardCombination;
            }

            getHierarchicCardCombination() {
                return this.hierarchicCardCombination
            }


        }



        function getRandomCards(pokerDeck, knownCardArray, numberOfCards, excludeCardArr) {
            var deck = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,
                13,14,15,16,17,18,19,20,21,22,23,24,25,
                26,27,28,29,30,31,32,33,34,35,36,37,38,
                39,40,41,42,43,44,45,46,47,48,49,50,51
            ];

            var positionOfAllKnownCard = getAllPositionsAtPokerDeck(pokerDeck, [...knownCardArray, ...excludeCardArr]);

            var cardForGenerate = numberOfCards - positionOfAllKnownCard.length;

            var filteredDeck = filterDeck(deck, positionOfAllKnownCard);
            var generatedCards = generateRandomCards(cardForGenerate, filteredDeck);

            var summOfCardNumbers = [...generatedCards];


            for(var i =0; i < summOfCardNumbers.length; i++){
                summOfCardNumbers[i] = pokerDeck[summOfCardNumbers[i]];
            }

            return summOfCardNumbers
        }



        function findHighestCard() {

            var whoWin = [];
            var skipPlayer = [];
            var tempMax ;
            var tempIndexOfMax;

            for(var k= 0; k < arguments.length; k++){
                whoWin[k] = 1;
                skipPlayer[k] = 0;
            }

            for(var i = 0; i< arguments[0].length; i++){


                for(var n = 0; n < skipPlayer.length; n++){
                    if(skipPlayer[n] !== 1){
                        tempMax = arguments[n][i];
                        tempIndexOfMax = n;
                        break
                    }
                }

                for(var j= 0; j < arguments.length; j++){

                    if(skipPlayer[j] == 1){
                        continue
                    }


                    if(arguments[j][i] > tempMax){

                        for(var m =0; m < j; m++ ){
                            whoWin[m] = 0;
                            skipPlayer[m] = 1;
                        }

                        tempMax = arguments[j][i];
                        tempIndexOfMax = j;
                        continue

                    }

                    if(arguments[j][i] < tempMax){

                        whoWin[j] = 0;
                        skipPlayer[j] = 1;
                    }

                }
            }

            return whoWin

        }



        function getBestCardSequence(tempCards, numberOfGetCards) {

            var bestCard = [];
            var hierarchicalCardSequence = 'AKQJ198765432';

            for (var i = 0; i < hierarchicalCardSequence.length; i++) {

                for (var j = 0; j < tempCards.length; j++) {
                    if (hierarchicalCardSequence[i] == tempCards[j].slice(0, 1)) {
                        bestCard.push(tempCards[j]);

                    }
                }

            }

            return bestCard.slice(0, numberOfGetCards)
        }



        function getWinners(arr) {
            var maxValue = arr[0];
            var countSameValue = [];

            for(var i=0; i < arr.length; i++){

                if(maxValue < arr[i]){
                    maxValue = arr[i];
                    countSameValue = [];
                }

                if(maxValue == arr[i]){
                    countSameValue.push(i);
                }
            }

            return {
                maxValue: maxValue,
                countSameValue: countSameValue
            }

        }




        function findCombination(tempCards) {

            if (isRoyalFlush(tempCards)) {
                return {
                    rankOfCombination: 10,
                    weight: [10,10,10,10,10]
                }
            }

            var isStraightFlushCombination = isStraightFlush(tempCards);
            if (isStraightFlushCombination.isStraight) {
                return {
                    rankOfCombination: 9,
                    weight: isStraightFlushCombination.straightCombination
                }
            }


            var isQuadsCombination = isQuads(tempCards);
            if (isQuadsCombination.isQuads) {
                return {
                    rankOfCombination: 8,
                    weight: isQuadsCombination.rankOfQuads
                }
            }


            var isFullHouseCombination = isFullHouse(tempCards);
            if (isFullHouseCombination.isFullHouse) {
                return {
                    rankOfCombination: 7,
                    weight: isFullHouseCombination.cardRunk
                }
            }


            var isFlushCombination = isFlush(tempCards);
            if (isFlushCombination.isFlush) {
                return {
                    rankOfCombination: 6,
                    weight: isFlushCombination.cardRank
                }
            }


            var isStraightCombination = isStraight(tempCards);
            if (isStraightCombination.isStraight) {
                return {
                    rankOfCombination: 5,
                    weight: isStraightCombination.straightCombination
                }
            }


            var isThreeOfAKindCombination = threeOfAKind(tempCards);
            if (isThreeOfAKindCombination.isThreeOfAKind) {
                return {
                    rankOfCombination: 4,
                    weight: isThreeOfAKindCombination.cardRankArr
                }
            }


            var isTwoPairsCombination = isTwoPairs(tempCards);
            if (isTwoPairsCombination.isTwoPairs) {
                return {
                    rankOfCombination: 3,
                    weight: isTwoPairsCombination.cardRank
                }
            }


            var isOnePairCombination = isOnePair(tempCards);
            if (isOnePairCombination.isOnePair) {
                return {
                    rankOfCombination: 2,
                    weight: isOnePairCombination.cardRank
                }
            }

            var cardPlayer  = getBestCardSequence(tempCards, 5);
            var rankOfCards = convertCardToRank(cardPlayer);

            return {
                rankOfCombination: 1,
                weight: rankOfCards
            }

        }


            function createPlayers(arrFoPlayers) {
                var arrOfPlayersObject = [];

                for(var i=0; i < arrFoPlayers.length; i++){
                    var tempPlayer = new MakePlayer(arrFoPlayers[i]);
                    arrOfPlayersObject.push(tempPlayer);
                }

                return arrOfPlayersObject
            }


            var playersForCheck = createPlayers(playersArr);

            var resultOfCalcul =  findWinner(flopArr, turnArr, true, riverArr, true, excludedArr,...playersForCheck) ;




            function getResultOfCalculation(resultOfCalcul) {
                var tempArr = [];

                for (var i = 0; i < resultOfCalcul.length; i++) {

                    var tempWin = resultOfCalcul[i].win*100/timeOfIteration;
                    var tempTie = resultOfCalcul[i].tie*100/timeOfIteration;

                    tempArr.push(
                        {
                            win: tempWin,
                            tie: tempTie
                        }
                    )

                }

                return  tempArr


            }

            return getResultOfCalculation(resultOfCalcul)

        }






    }
};
