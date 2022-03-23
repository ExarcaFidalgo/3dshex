const tresd = require("3dshex");

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
	tresd.shExTo3D(text, "3d-graph");

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