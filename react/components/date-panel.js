var React = require("react");
var DateController = require("./date-controller");
var DateChoosePanel = require("./date-choose-panel");

var DatePanel = React.createClass({
    render: function(){
        return (
            <div>
                <DateController
                    chosenDay={this.props.chosenDay}
                    today={this.props.today}
                    ></DateController>
                <DateChoosePanel
                    chosenMonthDates={this.props.chosenMonthDates}
                    chosenDay={this.props.chosenDay}
                    today={this.props.today}
                    ></DateChoosePanel>
            </div>
        );
    }
});

module.exports = DatePanel;