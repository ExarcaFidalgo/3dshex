class GraphGenerator {

    constructor () {
		this.prefixes = null;
		this.shapes = null;
		this.gData = {nodes: [],links: []}
    }
	
	createGraph(shapes) {
		//console.log(shapes);
		for(let shape in shapes) {
			let instanceOf = null;
			let expressions = shapes[shape].expression.predicate ? [shapes[shape].expression] : shapes[shape].expression.expressions
			for(let exp in expressions) {
				let expression = expressions[exp]

				if(expression.type === "TripleConstraint") {
					if(expression.predicate === "http://www.wikidata.org/entity/P31") {
						instanceOf = expression.valueExpr.values[0].split("/")[4]; 
					}
					else if(expression.valueExpr && expression.valueExpr.type === "ShapeRef") {
						let newLink = { source: shape.split("/").at(-1), target:expression.valueExpr.reference.split("/").at(-1), 
							name:expression.predicate.split("/").at(-1)}
						this.gData.links.push(newLink);
					}
				}
				
			}
			let newNode = {id:shape.split("/").at(-1), p31:instanceOf}
			this.gData.nodes.push(newNode);
		}
		console.log(this.gData);
		return this.gData;
	}
	
	reset() {
		this.prefixes = null;
		this.shapes = null;
		this.gData = {nodes: [],links: []}
	}
	

}
module.exports = GraphGenerator;