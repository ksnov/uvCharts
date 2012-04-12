var cv = {};

cv.graph = function () {

	this.dimension = {
		height: 400,
		width: 400
	};

	this.margin = {
		left: 60,		//x
		right: 20,		//dx
		top: 20,		//y
		bottom: 60		//dy
	};

	this.graphDef = undefined;
	this.pos = undefined;
	this.caption = undefined;
	this.horAxisLabel = undefined;
	this.verAxisLabel = undefined;

	this.frame = undefined;
	this.panel = undefined;
	this.group = undefined;
	this.horAxis = undefined;
	this.verAxis = undefined;	
	this.horGrid = undefined;
	this.verGrid = undefined;
};

cv.graph.properties = ["width", "height", "caption", "xAxisName", "yAxisName"];

cv.graph.prototype.init = function(graphDef) {

	this.setDimensionHeight(graphDef.dimension.height || 400);
	this.setDimensionWidth(graphDef.dimension.width || 400);
	this.setMarginLeft(graphDef.margin.left);
	this.setMarginRight(graphDef.margin.right);
	this.setMarginTop(graphDef.margin.top);
	this.setMarginBottom(graphDef.margin.bottom);
	this.setChartPos(graphDef.pos);

	var height 	= this.dimension.height - this.margin.top - this.margin.bottom,
		width	= this.dimension.width - this.margin.left - this.margin.right;

	this.frame = d3.select(this.pos || "body").append("svg")
					.attr("class","chartrframe")
					.attr("width", this.dimension.width)
					.attr("height", this.dimension.height);

	this.panel = d3.select(".chartrframe").append("svg")
					.attr("class","chartrpanel")
				    .attr("x", 0).attr("y", 0)
					.attr("width", this.dimension.width)
					.attr("height", this.dimension.height);

	this.group = d3.selectAll(".chartrpanel").append("g").attr("class", "chartrgroup");

	this.xScale 	= d3.scale.linear().domain([0,100]).range([0, this.dimension.width - this.margin.left]);
	this.xAxis 		= d3.svg.axis().scale(this.xScale).tickSize(this.dimension.height - this.margin.top - 20).tickSubdivide(1).orient("bottom");
	this.horGrid 	= this.group.append("g").attr("class", "x axis")
						  .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")				      
					      .call(this.xAxis);

	this.yScale		= d3.scale.linear().domain([0,100]).range([this.dimension.height - this.margin.top, 0]);
	this.yAxis 		= d3.svg.axis().scale(this.yScale).ticks(4).tickSize(-(this.dimension.width - this.margin.left - 20)).orient("left");
	this.verGrid 	= this.group.append("g").attr("class", "y axis")
						  .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")		
					      .call(this.yAxis);

/*	for(var property in cv.graph.properties){
		if( graphDef[property] ) {
			this["set" + cv.utility.getPascalCasedName(property)](graphDef[property]);
		}	
	}

	for (style in graphDef.style) {
		if (styles.hasOwnProperty(style)) {
			this["set" + cv.utility.getPascalCasedName(style)](graphDef.style[style]);
		}
	}
*/


};

cv.graph.prototype.setDimensionWidth = function (len) {
	this.dimension.width = len;
}

cv.graph.prototype.setDimensionHeight = function (len) {
	this.dimension.height = len;
}

cv.graph.prototype.setMarginTop = function (len) {
	this.margin.top = len;
}

cv.graph.prototype.setMarginLeft = function (len) {
	this.margin.left = len;
}

cv.graph.prototype.setMarginRight = function (len) {
	this.margin.right = len;
}

cv.graph.prototype.setMarginBottom = function (len) {
	this.margin.bottom = len;
}

cv.graph.prototype.setChartPos = function (pos) {
	this.pos = pos;
}