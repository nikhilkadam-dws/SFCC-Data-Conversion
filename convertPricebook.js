const csvtojson = require("csvtojson");
const builder = require("xmlbuilder");
const fs = require("fs");

const inFile = "./input/price-book-20220209.csv";
const outFile = "./output/price-book-20220209.xml";

const priceBookId="";

csvtojson()
  .fromFile(inFile)
  .then((jsonData) => {
    createXml(jsonData);
  });

const createXml = (jsonData) => {
  const xml = builder.create("price-tables");
  /* xml.ele("header").att("pricebook-id", "inr-m-list-prices-firefox")
  .ele("currency").text("INR").up()
  .ele("display-name").att("xml:lang","x-default").text("Firefox List Prices").up()
  .ele("online-flag").text(true); */
  /* xml.ele("price-tables"); */
  jsonData.forEach((record) => {
    xml.ele("price-table")
      .att("product-id", record.ID)
      .ele("amount")
      .att("quantity", 1)
      .text(record.price);
  });

  fs.writeFileSync(outFile, xml.toString({ pretty: true }));
};

/* 
<price-table product-id="112992411">
  <amount quantity="1">1000.00</amount>
</price-table>
 */
/* 
<pricebooks xmlns="http://www.demandware.com/xml/impex/pricebook/2006-10-31">
    <pricebook>
        <header pricebook-id="inr-m-list-prices-firefox">
            <currency>INR</currency>
            <display-name xml:lang="x-default">Firefox List Prices</display-name>
            <online-flag>true</online-flag>
        </header>
*/