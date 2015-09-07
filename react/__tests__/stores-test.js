/**
 * Created by sinceow on 15/6/22.
 */

var Constants = require("../constants/constants");


describe("Store test", function () {
    var Dispatcher, Store, Action, callback;
    beforeEach(function(){
        Dispatcher = require("../dispatcher/dispatcher");
        spyOn(Dispatcher, "register");
        Store = require("../stores/stores");
        callback = Dispatcher.register.calls.mostRecent().args[0];
    });

    it("should be equal today", function () {

        var today = Store.getToday();

        expect(today["day"]).toBe(new Date().getDate());
    });

    it("should be called", function(){
        var result = "abc";

        function listener(){
            result = "cba";
        }

        Store.addChangeDayListener(listener);

        callback({
            actionType: Constants.CHANGE_DAY,
            chosenDay: {}
        });

        expect(result).toEqual("cba");
    })
});
