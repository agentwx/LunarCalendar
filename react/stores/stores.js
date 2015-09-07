var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");
var LC = require("lunar-calendar");
var EventEmitter = require("events").EventEmitter;
var Assign = require("object-assign");
var HL = require("./hl/huangli");



var LcStores = Assign({}, EventEmitter.prototype, {

    chosenDay: false,

    getChosenDay: function () {
        return this.chosenDay || this.getToday();
    },

    getToday: function () {
        var date = new Date();
        var currentMonthDates = LC.calendar(date.getFullYear(), date.getMonth() + 1, false);
        var monthData = currentMonthDates["monthData"];
        for (var i = 0; i < currentMonthDates["monthDays"]; i++) {
            if (monthData[i]["day"] == date.getDate()) {
                return monthData[i];
            }
        }
    },

    getHL: function (date) {
        var month = (date["month"] < 10 ? "0" : "") + date["month"];
        var day = (date["day"] < 10 ? "0" : "") + date["day"];

        return HL["hl" + date["year"]]["d" + month + day];
    },

    getCurrentMonthDates: function () {
        return LC.calendar(this.getChosenDay()["year"], this.getChosenDay()["month"], true)["monthData"];
    },

    emitChangeDay: function () {
        this.emit(Constants.CHANGE_DAY);
    },

    addChangeDayListener: function (callback) {
        this.on(Constants.CHANGE_DAY, callback);
    },

    removeChangeDayListener: function (callback) {
        this.removeListener(Constants.CHANGE_DAY, callback);
    }
});

Dispatcher.register(function (action) {
    var chosenDay = LcStores.getChosenDay();

    var year, month, day;

    switch (action.actionType) {
        case Constants.CHANGE_DAY:
            LcStores.chosenDay = action.chosenDay;
            LcStores.emitChangeDay();
            break;

        case Constants.ADD_MONTH:
            year = chosenDay["year"] + (chosenDay["month"] === 12 ? 1 : 0);
            if (year > 2020) {
                break;
            }
            month = chosenDay["month"] === 12 ? 1 : chosenDay["month"] + 1;
            day = chosenDay["day"];
            if (day === 31) {
                day = LC.getSolarMonthDays(year, month - 1);
            }
            if (month === 2) {
                day = 28;
            }

            LcStores.chosenDay = Assign({}, LC.solarToLunar(year, month, day), {
                day: day,
                month: month,
                year: year
            });

            LcStores.emitChangeDay();
            break;
        case Constants.MINUS_MONTH:
            year = chosenDay["year"] - (chosenDay["month"] === 1 ? 1 : 0);
            if (year < 2008) {
                break;
            }
            month = chosenDay["month"] === 1 ? 12 : chosenDay["month"] - 1;
            day = chosenDay["day"];
            if (day === 31) {
                day = LC.getSolarMonthDays(year, month - 1);
            }
            if (month === 2) {
                day = 28;
            }

            LcStores.chosenDay = Assign({}, LC.solarToLunar(year, month, day), {
                day: day,
                month: month,
                year: year
            });

            LcStores.emitChangeDay();
            break;
        case Constants.ADD_YEAR:

            year = chosenDay["year"] + 1;
            if (year > 2020) {
                break;
            }
            month = chosenDay["month"];
            day = chosenDay["day"];
            if (!(year % 400 === 0) || (year % 100 != 0 && year % 4 === 0) && month === 2 && day === 29) {
                day = 28;
            }

            LcStores.chosenDay = Assign({}, LC.solarToLunar(year, month, day), {
                day: day,
                month: month,
                year: year
            });

            LcStores.emitChangeDay();
            break;

        case Constants.MINUS_YEAR:
            year = chosenDay["year"] - 1;
            if (year < 2008) {
                break;
            }
            month = chosenDay["month"];
            day = chosenDay["day"];
            if (!(year % 400 === 0) || (year % 100 != 0 && year % 4 === 0) && month === 2 && day === 29) {
                day = 28;
            }

            LcStores.chosenDay = Assign({}, LC.solarToLunar(year, month, day), {
                day: day,
                month: month,
                year: year
            });

            LcStores.emitChangeDay();
            break;
        case Constants.BACK_TO_TODAY:
            LcStores.chosenDay = LcStores.getToday();
            LcStores.emitChangeDay();
            break;
        default:
            break;

    }
});

module.exports = LcStores;