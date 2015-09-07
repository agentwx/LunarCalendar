var React = require("react/addons");
var CX = require('react/lib/cx');
var Actions = require("../actions/actions");
var LC = require("lunar-calendar");


var DateChoosePanel = React.createClass({
    componentDidMount: function () {
        $(function () {
            $(".oneofseven").click(function () {
                $(".chosenday").removeClass("chosenday");
                $(this).addClass("chosenday");
            });
        });
    },

    render: function () {

        var dates = this.props.chosenMonthDates;
        var chosenDay = this.props.chosenDay;
        var today = this.props.today;

        var datesElements = [], tmpElements = [];

        datesElements.push(<div className="row header">
            <div className="col head center-align weekend">日</div>
            <div className="col head center-align ">一</div>
            <div className="col head center-align ">二</div>
            <div className="col head center-align ">三</div>
            <div className="col head center-align ">四</div>
            <div className="col head center-align ">五</div>
            <div className="col head center-align weekend">六</div>
        </div>);

        for (var i = 0; i < dates.length; i++) {
            var label = "";
            if (dates[i]["lunarFestival"] != undefined) {
                label = (
                    <div>
                        <span className="date-block-day lunar-fest">{dates[i]["day"]}</span>
                        <span className="date-block-festival lunar-fest">
                        {dates[i]["lunarFestival"]}
                        </span>
                    </div>);
            } else if (dates[i]["term"] != undefined) {
                label = (
                    <div>
                        <span className="date-block-day lunar-fest">{dates[i]["day"]}</span>
                        <span className="date-block-festival lunar-fest">
                        {dates[i]["term"]}
                        </span>
                    </div>);
            } else if (dates[i]["solarFestival"] != undefined) {

                label = (
                    <div>
                        <span className="date-block-day solar-fest">{dates[i]["day"]}</span>
                        <span className="date-block-festival solar-fest"
                              title={dates[i]["solarFestival"].replace("国际", "")}>
                            {dates[i]["solarFestival"].replace("国际", "")}
                        </span>
                    </div>);
            } else if (dates[i]["lunarDay"] == 1) {
                label = (
                    <div>
                        <span className="date-block-day lunar-month-name">{dates[i]["day"]}</span>
                        <span className="date-block-festival lunar-month-name">
                            {dates[i]["lunarMonthName"]}
                        </span>
                    </div>);
            } else {
                label = (
                    <div>
                        <span className="date-block-day lunar-day-name">{dates[i]["day"]}</span>
                        <span className="date-block-festival lunar-day-name">
                            {dates[i]["lunarDayName"]}
                        </span>
                    </div>);
            }

            var blockClass = CX({
                col: true,
                oneofseven: true,
                overmonth: dates[i]["month"] != chosenDay["month"],
                weekend: i % 7 == 0 || i % 7 == 6,
                chosenday: dates[i]["day"] == chosenDay["day"] && dates[i]["month"] == chosenDay["month"] && dates[i]["year"] == chosenDay["year"],
                today: dates[i]["day"] == today["day"] && dates[i]["month"] == today["month"] && dates[i]["year"] == today["year"]
            });

            tmpElements.push(
                <div className={blockClass} onClick={this._onClick.bind(this, JSON.stringify(dates[i]))}>
                    {label}
                </div>
            );

            if ((i + 1) % 7 == 0) {
                datesElements.push(
                    <div className="row">
                        {tmpElements}
                        <div className="clearfix"></div>
                    </div>);
                tmpElements = [];
            }
        }

        return (
            <div>
                {datesElements}
            </div>
        )

    },

    _onClick: function (date) {
        Actions.changeDay(JSON.parse(date));
    }


});

module.exports = DateChoosePanel;