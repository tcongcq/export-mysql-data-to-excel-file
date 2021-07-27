const fs = require('fs');
const util = require('util');
const excel = require('excel4node');
const {database}   = require("./configs/database");
const {queryExec}  = require("./bootstrap/connectDatabase");
const fs_writeFile = util.promisify(fs.writeFile);
const {generateNewDbStructure} = require("./helpers/get-db-structure");

(async()=>{
	await generateNewDbStructure();
	console.log('generateNewDbStructure finish!');

	let db_structure = require('./configs/db_structure');
	let workbook = new excel.Workbook();
	for(let tableName in db_structure) {
		let tableData = await queryExec("SELECT * FROM "+tableName);
		let worksheet = workbook.addWorksheet(tableName);
			
		let columnList  = db_structure[tableName];
		const lengthArr = columnList.map(name => name.length);

		columnList.forEach((col, colIdx)=>{
			worksheet.cell(1,colIdx+1).string(col);
			worksheet.column(colIdx+1).setWidth(col.length*2);
		});
		tableData.forEach((row, rowIdx)=>{
			let colDataIdx = 1;
			for(let colDataKey in row) {
				switch(typeof row[colDataKey]) {
				  	case 'string':
						worksheet.cell(rowIdx+2,colDataIdx++).string(row[colDataKey]);
					    break;
				  	case 'number':
				  		worksheet.cell(rowIdx+2,colDataIdx++).number(row[colDataKey]);
					    break;
				  	default:
						worksheet.cell(rowIdx+2,colDataIdx++).string(''+row[colDataKey]);
				}
			}
		});
	}
	if (!fs.existsSync('export_data')){
	    fs.mkdirSync('export_data');
	}
	workbook.write(['./export_data/',database,'_export.xlsx'].join(''));
	console.log('Export data finish!');
})();