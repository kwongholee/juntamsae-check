require('dotenv').config();
const express = require('express');
const {GoogleSpreadsheet} = require("google-spreadsheet");
const { JWT } = require('google-auth-library');
const gs_creds = require("./juntamsae-e20ed7a1e534.json");
const app = express();

const serviceAccountAuth = new JWT({
  email: gs_creds.client_email,
  key: gs_creds.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

async function authGoogleSheet(){
	try{
		await doc.loadInfo()
	}catch(err){
		console.log( "AUTH ERROR ", err)
	}
}

async function readFirstSheetRow(){ 
	var sheet = doc.sheetsByIndex[0]; 
    var rows = await sheet.getRows({offset:3, limit:100}); 
    rows.forEach((ele)=>{
    	console.log( ele._rawData[0] , ele._rawData[1] )
    });
}

app.listen(8080, (req,res) => {
  authGoogleSheet();
  console.log('listening on 8080');
})

app.get('/', (req,res) => {
  readFirstSheetRow();
  res.send('good')
})