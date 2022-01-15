const shexParser = require("./src/ShExParser.js");
const TresDGen = require("./src/TresDGen.js");

if(document.getElementById("shextext") !== null) {
    shExEditor = CodeMirror.fromTextArea(document.getElementById("shextext"), {
        mode: "shex",
        lineNumbers: true
    });
    let theme = sessionStorage.getItem("theme");
    shExEditor.setOption("theme", "ayu-mirage");
}

let shxtx = $('#shextograph');
shxtx.click(shExTo3D);

function shExTo3D() {
	let text = shExEditor.getValue();
	let gData = null;
	
	try {
		gData = shexParser.parseShExToGraph(text);
	} catch(ex) {
		alert("An error has occurred when generating the graph data: \n" + ex);
	}
	
	try {
		TresDGen.run(gData);
	} catch(ex) {
		alert("An error has occurred when generating the visualization: \n" + ex);
	}
	
	

	$("#editorcontainer").css("display", "none");
	$("#graphcontainer").css("display", "inherit");
}

let load = $('#loadex');

load.click(loadExample);

function loadExample() {
	$.get('./static/genewiki.shex.txt', function(data) {
		shExEditor.setValue(data);
	});
}