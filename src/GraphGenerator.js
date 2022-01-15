class GraphGenerator {

    constructor () {
		this.prefixes = null;
		this.shapes = null;
		this.gData = {nodes: [],links: []}
    }
	
	createGraph(shapes) {
		//console.log(shapes);
		for(let shape in shapes) {
			console.log(shapes[shape]);
			if(shapes[shape].type === "Shape") {
				this.checkExpressions(shapes[shape], shape)
			}
			else if (shapes[shape].type === "ShapeAnd") {
				for(let sh in shapes[shape].shapeExprs) {
					if(shapes[shape].shapeExprs[sh].type === "Shape") {
						this.checkExpressions(shapes[shape].shapeExprs[sh], shape)
					}
				}
			}
			
		}
		console.log(this.gData);
		return this.gData;
	}
	
	checkExpressions(shape, name) {
		try {
		let instanceOf = null;
		let expressions = shape.expression.predicate ? [shape.expression] : shape.expression.expressions
			for(let exp in expressions) {
				let expression = expressions[exp]

				if(expression.type === "TripleConstraint") {
					if(expression.predicate === "http://www.wikidata.org/entity/P31") {
						instanceOf = expression.valueExpr.values[0].split("/")[4]; 
					}
					else if(expression.valueExpr && expression.valueExpr.type === "ShapeRef") {
						let newLink = { source: name.split("/").at(-1), target:expression.valueExpr.reference.split("/").at(-1), 
							name:expression.predicate.split("/").at(-1)}
						this.gData.links.push(newLink);
					}
				}
				
			}
			let newNode = {id:name.split("/").at(-1), p31:instanceOf}
			this.gData.nodes.push(newNode);
		} catch (ex) {
			throw new Error("At " + name + ": " + ex);
		}
	}
	
	reset() {
		this.prefixes = null;
		this.shapes = null;
		this.gData = {nodes: [],links: []}
	}
	

}
module.exports = GraphGenerator;