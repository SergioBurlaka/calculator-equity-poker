

module.exports = function (ngModule) {

    ngModule.factory('findWinnerService', findWinnerService);

    findWinnerService.$inject = ['cardGeneratorService', 'findCombinationService'];

    function findWinnerService(cardGeneratorService, findCombinationService) {

        var timeOfIteration = 50000;


        var deckPoker52 = [
            '2 s', '3 s', '4 s', '5 s', '6 s', '7 s',
            '8 s', '9 s', '1 s', 'J s', 'Q s', 'K s', 'A s',
            '2 h', '3 h', '4 h', '5 h', '6 h', '7 h',
            '8 h', '9 h', '1 h', 'J h', 'Q h', 'K h', 'A h',
            '2 d', '3 d', '4 d', '5 d', '6 d', '7 d',
            '8 d', '9 d', '1 d', 'J d', 'Q d', 'K d', 'A d',
            '2 c', '3 c', '4 c', '5 c', '6 c', '7 c',
            '8 c', '9 c', '1 c', 'J c', 'Q c', 'K c', 'A c'
        ];



        var service = {

            findWinner: findWinner,
            timeOfIteration: timeOfIteration
        };


        return service;


        function findWinner(flop, turn, generateTurn, river, generateRiver, excludeCards, firstPlayer, secondPlayer) {


            var players = [];
            var numbersOfPlayers = 0;
            var playerHasTwoCard = 2;

            for (var l = 6; l < arguments.length; l++) {
                numbersOfPlayers++;
                players.push(arguments[l]);
            }

            var knownCardArray = flop;
            var flopLength = 3;

            if (generateTurn) {
                knownCardArray = [...knownCardArray, ...turn];
            }

            if (generateRiver) {
                knownCardArray = [...knownCardArray, ...river];
            }


            if (flop.length === 0) {
                var everyTimeInitFlop = true
            }

            if (turn.length === 0 && generateTurn) {
                var everyTimeInitTurn = true
            }

            if (river.length === 0 && generateRiver) {
                var everyTimeInitRiver = true
            }


            players = setGenerationCardForUsers(players);
            var allPlayersCard = getAllPlayersCard(players);

            var numberOfCardForGenerate = flopLength + generateTurn + generateRiver + numbersOfPlayers * playerHasTwoCard;

            knownCardArray = [...knownCardArray, ...allPlayersCard];


            for (var i = 0; i < timeOfIteration; i++) {

                var randomCards = cardGeneratorService.getRandomCard(deckPoker52, knownCardArray, numberOfCardForGenerate, excludeCards);


                flop  = creatingFlop(flop, randomCards, everyTimeInitFlop);
                turn  = creatingTurn(turn, randomCards, everyTimeInitTurn);
                river = creatingRiver(river, randomCards, everyTimeInitRiver);


                var cardOnBoard = [...flop, ...turn, ...river];


                players = creatingPlayersCard(players, cardOnBoard, randomCards);
                players = setCombinationHierarhy(players);


                var allPlayersCombinationRank = getAllPlayersCombinationRank(players);


                var playersWithSameRank = getWinners(allPlayersCombinationRank);
                var playersWin = playersWithSameRank.countSameValue;


                if (playersWin.length > 1) {

                    var playersCardWeight = getWeightCard(players, playersWin);


                    var highestCard = findHighestCard(...playersCardWeight);

                    var playerWhoWin = getWinners(highestCard).countSameValue;



                    var indexesOfWinner = getPlayerIndexWhoWin(playerWhoWin, playersWin);


                    if (indexesOfWinner.length == 1) {
                        setWin(players, indexesOfWinner);
                    }

                    if (indexesOfWinner.length > 1) {
                        setTie(players, indexesOfWinner);
                    }

                }

                if (playersWin.length == 1) {
                    setWin(players, playersWin);
                }


            }


            return players

        }


        function setGenerationCardForUsers(players) {

            for (var i = 0; i < players.length; i++) {

                if (players[i].getCard().length == 0) {
                    players[i].setGeneratePlayersCard()
                }

            }

            return players
        }


        function getPlayerIndexWhoWin(arrOfWinner, playersWithSameRank) {
            var arrOfIndexPlayers = [];
            for (var i = 0; i < arrOfWinner.length; i++) {
                var indexOfWinner = arrOfWinner[i];
                arrOfIndexPlayers.push(playersWithSameRank[indexOfWinner]);
            }
            return arrOfIndexPlayers
        }


        function setTie(players, playersWhoWin) {

            for (var i = 0; i < playersWhoWin.length; i++) {

                var playerIndex = playersWhoWin[i];
                players[playerIndex].setTie();
            }

            return players
        }


        function setWin(players, playersWhoWin) {

            for (var i = 0; i < playersWhoWin.length; i++) {

                var playerIndex = playersWhoWin[i];
                players[playerIndex].setWin();
            }

            return players
        }


        function getAllPlayersCombinationRank(players) {

            var allPlayersCombinationRank = [];

            for (var i = 0; i < players.length; i++) {
                var tempPlayerCombinationRank = players[i].getHierarchicCardCombination().rankOfCombination;
                allPlayersCombinationRank.push(tempPlayerCombinationRank);

            }

            return allPlayersCombinationRank
        }


        function getWeightCard(players, indexesOfTieRank) {

            var arrWeightOfCards = [];

            for (var i = 0; i < indexesOfTieRank.length; i++) {
                var indexOfPlayer = indexesOfTieRank[i];
                arrWeightOfCards.push(players[indexOfPlayer].getHierarchicCardCombination().weight);

            }

            return arrWeightOfCards
        }


        function getAllPlayersCard(players) {

            var allPlayersCard = [];

            for (var i = 0; i < players.length; i++) {
                var tempPlayerCard = players[i].getCard();
                allPlayersCard = [...allPlayersCard, ...tempPlayerCard];
            }

            return allPlayersCard
        }


        function creatingFlop(flop, randomCards, generateFlop) {

            if (generateFlop) {
                flop = randomCards.splice(-3, 3);
            }
            return flop
        }


        function creatingTurn(turn, randomCards, generateTurn) {

            if (generateTurn) {
                turn = randomCards.splice(-1, 3);
            }
            return turn
        }


        function creatingRiver(river, randomCards, generateRiver) {

            if (generateRiver) {
                river = randomCards.splice(-1, 3);
            }
            return river
        }


        function creatingPlayersCard(players, cardOnBoard, randomCards) {

            for (var i = 0; i < players.length; i++) {

                var generateCardForUser = players[i].getGeneratePlayersCard();

                if (generateCardForUser) {
                    players[i].setCard(randomCards.splice(-2, 2))
                }

                var getOwnPlayerCards = players[i].getCard();
                players[i].setPlayCombination([...cardOnBoard, ...getOwnPlayerCards])

            }

            return players
        }


        function setCombinationHierarhy(players) {

            for (var i = 0; i < players.length; i++) {

                var playerCombination = players[i].getPlayCombination();
                var cardRankCombination = findCombinationService.findCombination(playerCombination);
                players[i].setHierarchicCardCombination(cardRankCombination);

            }

            return players
        }


        function findHighestCard() {

            var whoWin = [];
            var skipPlayer = [];
            var tempMax;
            var tempIndexOfMax;

            for (var k = 0; k < arguments.length; k++) {
                whoWin[k] = 1;
                skipPlayer[k] = 0;
            }

            for (var i = 0; i < arguments[0].length; i++) {


                for (var n = 0; n < skipPlayer.length; n++) {
                    if (skipPlayer[n] !== 1) {
                        tempMax = arguments[n][i];
                        tempIndexOfMax = n;
                        break
                    }
                }

                for (var j = 0; j < arguments.length; j++) {

                    if (skipPlayer[j] == 1) {
                        continue
                    }


                    if (arguments[j][i] > tempMax) {

                        for (var m = 0; m < j; m++) {
                            whoWin[m] = 0;
                            skipPlayer[m] = 1;
                        }

                        tempMax = arguments[j][i];
                        tempIndexOfMax = j;
                        continue

                    }

                    if (arguments[j][i] < tempMax) {

                        whoWin[j] = 0;
                        skipPlayer[j] = 1;
                    }

                }
            }

            return whoWin

        }


        function getWinners(arr) {
            var maxValue = arr[0];
            var countSameValue = [];

            for (var i = 0; i < arr.length; i++) {

                if (maxValue < arr[i]) {
                    maxValue = arr[i];
                    countSameValue = [];
                }

                if (maxValue == arr[i]) {
                    countSameValue.push(i);
                }
            }

            return {
                maxValue: maxValue,
                countSameValue: countSameValue
            }

        }




    }
};
