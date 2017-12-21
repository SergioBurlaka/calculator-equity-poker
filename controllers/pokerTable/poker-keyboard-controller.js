

module.exports = function (ngModule) {
    ngModule.controller('showCards', showCards);

    showCards.$inject = [ 'calculationService'];

    function showCards( calculationService) {

        var  deckPoker52 = [
            '2 s', '3 s', '4 s', '5 s', '6 s', '7 s',
            '8 s', '9 s', '1 s', 'J s', 'Q s', 'K s', 'A s',
            '2 h', '3 h', '4 h', '5 h', '6 h', '7 h',
            '8 h', '9 h', '1 h', 'J h', 'Q h', 'K h', 'A h',
            '2 d', '3 d', '4 d', '5 d', '6 d', '7 d',
            '8 d', '9 d', '1 d', 'J d', 'Q d', 'K d', 'A d',
            '2 c', '3 c', '4 c', '5 c', '6 c', '7 c',
            '8 c', '9 c', '1 c', 'J c', 'Q c', 'K c', 'A c',
            'l b'
        ];

        class MakePokerCard{
            constructor(card){
                this.suit = card.slice(-1);
                this.rank = card.slice(0,1);

                this.smallCardFileName = card+'.gif';
                this.bigCardFileName = card+'.png';
                this.cardValue = card;

            }

            getBigCardFileName() {
                return this.bigCardFileName
            }

            getSmallCardFileName() {
                return this.smallCardFileName
            }

            getCardRank() {
                return this.rank;
            }

            getCardSuit() {
                return this.suit;
            }

        }


        class CreatePlayer {
            constructor() {
                this.card = [vm.pokerCardBack, vm.pokerCardBack];
                this.win = 0;
                this.tie = 0;

            }

        }




        function createPokerDeck(cardNameArr) {
            var appOfPokerCard = [];
            for(var i=0; i< cardNameArr.length; i++){
                var tempCardName = new MakePokerCard(cardNameArr[i]);
                appOfPokerCard.push(tempCardName);
            }

            return appOfPokerCard;
        }

        var vm = this;

        vm.pokerDeck  = createPokerDeck(deckPoker52);
        vm.pokerCardBack  = vm.pokerDeck[52];



        vm.coordinate = {
            card: 1,
            player: 1,
            place: 1
        };


        vm.players = [
            {
                card: [vm.pokerCardBack,vm.pokerCardBack],
                win: 0,
                tie: 0
            },
            {
                card: [vm.pokerCardBack,vm.pokerCardBack],
                win: 0,
                tie: 0
            }
        ];


        vm.excludedCards = [
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack
        ];


        vm.flop = [
            vm.pokerCardBack,
            vm.pokerCardBack,
            vm.pokerCardBack
        ];

        vm.turn  = [vm.pokerCardBack];
        vm.river = [vm.pokerCardBack];



        vm.checkCardOnPokerKeyboard = checkCardOnPokerKeyboard;
        vm.checkCardOnTable = checkCardOnTable;
        vm.onBlur = onBlur;
        vm.addPlayer = addPlayer;
        vm.resetPlayers = resetPlayers;
        vm.getHelloFromService = getHelloFromService;


        function getHelloFromService() {


            var flop    = getArrOfCards(vm.flop);
            var turn    = getArrOfCards(vm.turn);
            var river   = getArrOfCards(vm.river);
            var players = getArrOfPlayersCards(vm.players);
            var excluded = getArrOfExcludedCards(vm.excludedCards);




            var resultOfCalculation = calculationService.sayHelloFromService(flop, turn, river, excluded, players);
            setResultOfCalculation(resultOfCalculation);


        };




        function setResultOfCalculation(resultOfCalculation) {


            for (var i = 0; i < resultOfCalculation.length; i++) {

                vm.players[i].win = resultOfCalculation[i].win;
                vm.players[i].tie = resultOfCalculation[i].tie;
            }

        }



         function getArrOfCards(placeOnTable) {
            var arrOfCards = [];

            for (var i = 0; i < placeOnTable.length; i++) {

                if(placeOnTable[i].cardValue === "l b"  ){
                     return arrOfCards = [];
                }

                arrOfCards.push(placeOnTable[i].cardValue)
            }

            return arrOfCards
        }






        function getArrOfExcludedCards(placeOnTable) {
            var arrOfCards = [];


            for (var i = 0; i < placeOnTable.length; i++) {

                var tempCard = placeOnTable[i].cardValue;

                if (tempCard === "l b") {
                    continue
                }

                arrOfCards.push(tempCard);
            }

            return arrOfCards
        }






        function getArrOfPlayersCards(placeOnTable) {
            var arrOfCards = [];

            for (var i = 0; i < placeOnTable.length; i++) {
                var firstCard = placeOnTable[i].card[0].cardValue;
                var secondCard = placeOnTable[i].card[1].cardValue;
                var tempPlayerCard = [firstCard,secondCard];

                if(firstCard === "l b" || secondCard === "l b" ){
                    tempPlayerCard = [];
                }
                arrOfCards.push(tempPlayerCard);
            }

            return arrOfCards
        }




        function resetPlayers() {
            vm.players = [];

            for (var i = 0; i < 2; i++) {
                addPlayer();
            }

        }


        function addPlayer() {

           var tempPlayer = new CreatePlayer();
            vm.players.push(tempPlayer);
        }




        function onBlur() {

            vm.coordinate = {
                card: 1,
                player: '',
                place: ''
            }
        }


        function checkCardOnPokerKeyboard(cardIndex) {
            setCard(cardIndex);
        }

         function checkCardOnTable(cardIndex, player) {

             vm.coordinate = {
                 card: 1,
                 player: player,
                 place: cardIndex
             };
             setDefaultCard();

        }


        function setDefaultCard() {
            setCard(52);
        }

        function setCard(sourceCardIndex) {

            var placeIndex = +vm.coordinate.place;

            if(vm.coordinate.player === 'flop'){
                 vm.flop[placeIndex] = vm.pokerDeck[sourceCardIndex];
                return
            }

           if(vm.coordinate.player === 'turn'){
               return vm.turn[placeIndex] = vm.pokerDeck[sourceCardIndex];
            }


            if(vm.coordinate.player === 'river'){
               vm.river[placeIndex] = vm.pokerDeck[sourceCardIndex];
               return
            }

             if(vm.coordinate.player === 'excluded'){
               vm.excludedCards[placeIndex] = vm.pokerDeck[sourceCardIndex];
               return
            }


            if (+vm.coordinate.player == +vm.coordinate.player) {
                vm.players[+vm.coordinate.player].card[placeIndex] =  vm.pokerDeck[sourceCardIndex];

                return
            }


        }





    }
};
