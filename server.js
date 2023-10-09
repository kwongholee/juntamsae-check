require('dotenv').config();
const express = require('express');
const {GoogleSpreadsheet} = require("google-spreadsheet");
const {JWT} = require('google-auth-library');
const gs_creds = require("./" + process.env.GOOGLE_SHEET_CLIENT_ID + ".json");
const app = express();

const serviceAccountAuth = new JWT({
  email: gs_creds.client_email,
  key: gs_creds.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

async function authGoogleSheet() {
	try {
		await doc.loadInfo()
	}catch(err) {
		console.log( "AUTH ERROR", err)
	}
}

async function readFirstSheetRow() {
  data = []
	var sheet = doc.sheetsByIndex[0]; 
  var rows = await sheet.getRows({offset:0, limit:200});
  await rows.forEach((ele) => {
    data.push([ele._rawData[0],ele._rawData[1],ele._rawData[2],ele._rawData[19]])
  });
  return data;
}
async function readAndFindFirstSheetRow(a) {
  data = []
	var sheet = doc.sheetsByIndex[0]; 
  var rows = await sheet.getRows({offset:0, limit:200});
  await rows.forEach((ele) => {
    if(a == ele._rawData[0]) {
      data.push([ele._rawData[0],ele._rawData[1],ele._rawData[2],ele._rawData[19]])
    }
  });
  return data;
}

app.listen(process.env.PORT, (req,res) => {
  authGoogleSheet();
  console.log('listening on 8080');
})

app.get('/info/list', (req,res) => {
  readFirstSheetRow().then((r) => {
    res.send(r);
  })
})

app.get('/info/search', (req,res) => {
  readAndFindFirstSheetRow(req.query.key).then((r) => {
    res.send(r);
  })
})

app.get('*', (req,res) => {
  res.sendFile('./front/build/index.html');
})