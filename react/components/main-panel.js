var React = require("react");
var DatePanel = require("./date-panel");
var LunarPanel = require("./lunar-panel");
var Store = require("../stores/stores");


var MainPanel = React.createClass({

    getInitialState: function () {
        return {
            today: Store.getToday(),
            chosenDay: Store.getChosenDay(),
            chosenMonthDates: Store.getCurrentMonthDates()
        };
    },

    componentDidMount: function () {
        Store.addChangeDayListener(this._onChange);

        //在打开窗口时刷新
        ipc.on("REFRESH_APP", function(){
            Store.chosenDay = Store.getToday();
            Store.emitChangeDay();
        });
    },


    render: function () {
        return (
            <div style={{width: "800px", position: "relative", border: "2px solid #00897B", borderLeft: "none", marginBottom: "0"}} className="row">

                <div className="col s6">
                    <LunarPanel chosenDay={this.state.chosenDay} />
                </div>
                <div className="col s6" >
                    <DatePanel
                        today={this.state.today}
                        chosenDay={this.state.chosenDay}
                        chosenMonthDates={this.state.chosenMonthDates}
                        />
                </div>
            </div>
        )
    },

    _onChange: function () {
        this.setState({
            today: Store.getToday(),
            chosenDay: Store.getChosenDay(),
            chosenMonthDates: Store.getCurrentMonthDates()
        });

        $(".chosenday").removeClass("chosenday");
    }
});

module.exports = MainPanel;