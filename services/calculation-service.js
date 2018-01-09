module.exports = function (ngModule) {

    ngModule.factory('calculationService', calculationService);

    calculationService.$inject = ['findWinnerService'];

    function calculationService(findWinnerService) {


        var service = {

            sayHelloFromService: sayHelloFromService
        };


        return service;


        function sayHelloFromService(flopArr, turnArr, riverArr, excludedArr, playersArr) {

            var timeOfIteration = findWinnerService.timeOfIteration;


            class MakePlayer {
                constructor(card) {
                    this.card = card;

                    this.playCombination = [];
                    this.win = 0;
                    this.tie = 0;
                    this.hierarchicCardCombination = 0;
                    this.generatePlayerCard = false;
                }


                setGeneratePlayersCard() {
                    this.generatePlayerCard = true;
                }

                getGeneratePlayersCard() {
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


            function createPlayers(arrFoPlayers) {
                var arrOfPlayersObject = [];

                for (var i = 0; i < arrFoPlayers.length; i++) {
                    var tempPlayer = new MakePlayer(arrFoPlayers[i]);
                    arrOfPlayersObject.push(tempPlayer);
                }

                return arrOfPlayersObject
            }


            var playersForCheck = createPlayers(playersArr);


            var resultOfCalcul = findWinnerService.findWinner(flopArr, turnArr, true, riverArr, true, excludedArr, ...playersForCheck);



            function getResultOfCalculation(resultOfCalcul) {
                var tempArr = [];

                for (var i = 0; i < resultOfCalcul.length; i++) {

                    var tempWin = resultOfCalcul[i].win * 100 / timeOfIteration;
                    tempWin = tempWin.toFixed(2);

                    var tempTie = resultOfCalcul[i].tie * 100 / timeOfIteration;
                    tempTie = tempTie.toFixed(2);


                    tempArr.push(
                        {
                            win: tempWin,
                            tie: tempTie
                        }
                    )

                }

                return tempArr


            }

            return getResultOfCalculation(resultOfCalcul)

        }


    }
};
