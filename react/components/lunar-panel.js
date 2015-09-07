var React = require("react");
var ReactTransitiveNumber = require("react-transitive-number");
var Store = require("../stores/stores");


var LunarPanel = React.createClass({

    render: function(){
        var chosenDay = this.props.chosenDay;

        var festivalElements = [];

        if(chosenDay["term"]){
            festivalElements.push(
                <span className="festival-detail term">{chosenDay["term"]}</span>
            );
        }

        if(chosenDay["lunarFestival"]){
            festivalElements.push(
              <span className="festival-detail lunar">{chosenDay["lunarFestival"]}</span>
            );
        }


        if(chosenDay["solarFestival"]){
            var festivals = chosenDay["solarFestival"].replace("国际", "").split(" ");
            for(var i = 0; i < festivals.length; i++){
                festivalElements.push(
                  <span className="festival-detail">{festivals[i]}</span>
                );
            }
        }

        var hl_y = Store.getHL(chosenDay) ? Store.getHL(chosenDay)["y"] : "";
        var hl_j = Store.getHL(chosenDay) ? Store.getHL(chosenDay)["j"] : "";

        return (
            <div className="lunar-panel">
                <div className="ganzhi" >
                    <ReactTransitiveNumber key="ganzhinian" className="ganzhi-detail">{chosenDay["GanZhiYear"] + "年"}</ReactTransitiveNumber>
                    <ReactTransitiveNumber key="ganzhinmonth" className="ganzhi-detail">{chosenDay["GanZhiMonth"] + "月"}</ReactTransitiveNumber>
                    <ReactTransitiveNumber key="ganzhiri" className="ganzhi-detail">{chosenDay["GanZhiDay"] + "日"}</ReactTransitiveNumber>
                </div>
                <div className="daynumber">
                    <div className="solar-panel">
                        <ReactTransitiveNumber className="solar-detail">{chosenDay["year"]}</ReactTransitiveNumber>
                        <ReactTransitiveNumber className="solar-detail">{chosenDay["month"] + "月"}</ReactTransitiveNumber>
                    </div>
                    <div className="festival-panel">
                        {festivalElements}
                    </div>
                    <h1 className="center-align">
                        <ReactTransitiveNumber>{chosenDay["day"]}</ReactTransitiveNumber>
                    </h1>
                    <p className="lunar-detail">
                        <ReactTransitiveNumber>{chosenDay["lunarMonthName"]}</ReactTransitiveNumber>
                        <ReactTransitiveNumber>{chosenDay["lunarDayName"]}</ReactTransitiveNumber>
                    </p>
                    <div className="hl-panel">
                        <p title={hl_y} className="hl-detail">宜: {hl_y}</p>
                        <p title={hl_j} className="hl-detail">忌: {hl_j}</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = LunarPanel;