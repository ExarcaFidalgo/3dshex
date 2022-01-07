const shexp = require('shex').Parser;
const GraphGenerator = require ("./GraphGenerator.js");

class ShExParser {

  constructor () {
    this.source = "";

    this.shexparser = shexp.construct();
    this.shexparser._setBase("http://example.org/");
    this.shexparser._setFileName("Shapes.shex");

    this.gg = new GraphGenerator();
	
	this.prefixes = new Map();
  }
  
  resetParser() {
	  this.shexparser.reset();
	  this.gg.reset();
  }

  parseShExToGraph(shex) {
    
    let source = this.parseShEx(shex);
    
    //Guardar prefijos
    this.prefixes.set(source.base, "base");
    for(let prefix in source.prefixes) {
      this.prefixes.set(source.prefixes[prefix], prefix);
      }

	this.gg.prefixes = this.prefixes;
	this.gg.shapes = source.shapes;
  
	return this.gg.createGraph(source.shapes);
  }

  /**
   * Parsea ShEx y devuelve un JSON
   * @param shex ShEx
   * @returns {JSON}  ShEx parseado
   */
  parseShEx(shex) {
    try {
      this.source = this.shexparser.parse(shex);
    } catch (ex) {
      console.log(ex);
      return null;
    }
    return this.source;
  }
}

module.exports = new ShExParser();