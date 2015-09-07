var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");

var LcAction = {

    changeDay: function(chosenDay){
        Dispatcher.dispatch({
            actionType: Constants.CHANGE_DAY,
            chosenDay: chosenDay
        })
    },

    addMonth: function(){
        Dispatcher.dispatch({
            actionType: Constants.ADD_MONTH
        });
    },

    minusMonth: function(){
        Dispatcher.dispatch({
            actionType: Constants.MINUS_MONTH
        });
    },

    addYear: function(){
        Dispatcher.dispatch({
            actionType: Constants.ADD_YEAR
        });
    },

    minusYear: function(){
        Dispatcher.dispatch({
            actionType: Constants.MINUS_YEAR
        });
    },

    backToToday: function(){
        Dispatcher.dispatch({
            actionType: Constants.BACK_TO_TODAY
        });
    },

    quitApp: function(){
        ipc.send("QUIT_APP");
    }

};

module.exports = LcAction;