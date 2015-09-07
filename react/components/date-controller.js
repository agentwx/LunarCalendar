var React = require("react");
var Actions = require("../actions/actions");

var DateController = React.createClass({

    render: function () {

        var chosenDay = this.props.chosenDay;
        var today = this.props.today;


        return (
            <div>
                <div className="date-controller">
                    <a href="javascript:void(0);" onClick={this._minusYear}>
                        <i className="fa fa-2x fa-angle-double-left fa-fw"></i></a>

                    <a href="javascript:void(0);" onClick={this._minusMonth}><i
                        className="fa fa-2x fa-angle-left fa-fw"></i></a>
                    <span className="year-block">{chosenDay["year"]}</span>
                    <span className="month-block">{chosenDay["month"]}月</span>
                    <a href="javascript:void(0);" onClick={this._addMonth}><i
                        className="fa fa-2x fa-angle-right fa-fw"></i></a>
                    <a href="javascript:void(0);" onClick={this._addYear}><i
                        className="fa fa-2x fa-angle-double-right fa-fw"></i></a>
                    <a href="javascript:void(0);" className="right grey-text" style={{marginRight: "15px"}} onClick={this._quitApp}><i className="fa fa-fw fa-2x fa-power-off"></i></a>
                    <a href="javascript:void(0);" className="right"  style={{marginRight: "15px"}} onClick={this._backToToday}><i className="fa fa-fw fa-2x fa-refresh"></i></a>
                    <div className="clearfix"></div>
                </div>
                <div className="divider"></div>
            </div>
        );
    },

    _minusYear: function () {
        Actions.minusYear();
    },

    _addYear: function () {
        Actions.addYear();
    },

    _minusMonth: function () {
        Actions.minusMonth();
    },

    _addMonth: function () {
        Actions.addMonth();
    },

    _backToToday: function(){
        Actions.backToToday()
    },

    _quitApp: function(){
        Actions.quitApp();
    }
});

module.exports = DateController;