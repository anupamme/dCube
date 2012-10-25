(function ($, d3) {

  var makeDcube = function (options, el) {
    
    var data = options.data,

	init = function () {
	  launchWizard();
	},

	launchWizard = function () {

	  var buttons = {}, $wiz;

	  visualizations.forEach(function (v) {
	    buttons[v.html] = function () {
	      v.handler();
	      $wiz.dialog('close');
	    };
	  });
	    
	  $wiz= $('<div/>').dialog({
	    modal: true,
	    buttons: buttons,
	    title: "Visualization Type"
	  });
	},
	
	makeBarChart = function () {

	  var barWidth = 40;
	  var width = (barWidth + 10) * data.array.length;
	  var height = 200;

	  var x = d3.scale.linear().domain([0, data.array.length]).range([0, width]);
	  var y = d3.scale.linear().domain([0, d3.max(data.array)]).
	    rangeRound([0, height]);

	  // add the canvas to the DOM
	  var barDemo = d3.select(el).
	    append("svg:svg").
	    attr("width", width).
	    attr("height", height);

	  barDemo.selectAll("rect").
	    data(data.array).
	    enter().
	    append("svg:rect").
	    attr("x", function(datum, index) { return x(index); }).
	    attr("y", function(datum) { return height - y(datum); }).
	    attr("height", function(datum) { return y(datum); }).
	    attr("width", barWidth).
	    attr("fill", "#2d578b");

	},
	      
	visualizations = [
	  {
	    name: 'BarChart',
	    html: 'Barchart',
	    handler: makeBarChart
	  }
	];     
    
    init();
    return {
      'init': init
    };
  };
  
  $.fn.extend({
    dCube: function (options) {
      return this.each(function (idx, el) {
	$.data(el, makeDcube(options, el));
      });
    }
  });

}(jQuery, d3));
