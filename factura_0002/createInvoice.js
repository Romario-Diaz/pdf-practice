
const fs = require('fs')
const PDFDocument = require('pdfkit')

function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 })

    generateHeader(doc)
    generateInfo(doc)
    createTable(doc, invoice)
    createFooter(doc)
    doc.end()
    doc.pipe(fs.createWriteStream(path))
}

function generateHeader(doc) {
    doc
        .fillColor('#043078')
        .fontSize(35)
        .text("FACTURA", 50, 50)
        .image(`${__dirname}/images/logo.png`, 450, 45, { width: 80, align: "right" })
        .fillColor('#3C3C3D')
        .fontSize(10)
        .text("Rojo pollo paela Inc.", {
            lineGap: 5
        })
        .text("Carretera muelle 38", {
            lineGap: 3
        })
        .text("37531 Avila Avila")
        .moveDown()
}

function generateInfo(doc) {
    doc
        // .font('')
        .fillColor('#043078')
        .fontSize(12)
        .text("FACTURA A", 50, 155, {lineGap: 7})
        .fontSize(8)
        .fillColor('#3C3C3D')
        .text("Leda Villarroel", {lineGap: 5, wordSpacing : 2, characterSpacing : 1})
        .text("Virgen Blanca 63", {lineGap: 5, wordSpacing : 2, characterSpacing : 1})
        .text("08759 Burgos ", {lineGap: 5, wordSpacing : 2, characterSpacing  : 1})
        // ...............................
        .fillColor('#043078')
        .fontSize(12)
        .text("ENVIAR A", 175, 155, {lineGap: 7})
        .fontSize(8)
        .fillColor('#3C3C3D')
        .text("Leda Villarroel", {lineGap: 5, wordSpacing : 2, characterSpacing : 1})
        .text("Virgen Blanca 63", {lineGap: 5, wordSpacing : 2, characterSpacing : 1})
        .text("08759 Burgos ", {lineGap: 5, wordSpacing : 2, characterSpacing  : 1})
        // ...............................
        .fillColor('#043078')
        .fontSize(12)
        .text("N° DE FACTURA", 325, 155, {lineGap: 5})
        .text("FECHA", {lineGap: 5})
        .text("N° DE PEDIDO", {lineGap: 5})
        .text("FECHA VENCIMIENTO", {lineGap: 5})
        // .................................function.
        .fontSize(8)
        .fillColor('#3C3C3D')
        .text("ES-001", 480, 155 ,{lineGap: 11, wordSpacing : 2, characterSpacing : 1})
        .text("29/01/2019", {lineGap: 11, wordSpacing : 2, characterSpacing : 1})
        .text("1730/2019", {lineGap: 11, wordSpacing : 2, characterSpacing  : 1})
        .text("29/01/2019", {lineGap: 11, wordSpacing : 2, characterSpacing  : 1})

        .moveDown()
}

function createTable(doc, invoice) {
    tableHeader(doc)
    tableBody(doc, invoice)
    tableFooter(doc, invoice)
}

function generateHr(doc, x, y, w, z, color) {
    console.log("el color : ", color)
    doc.lineJoin('miter')
        .strokeColor(color)
        .rect(x, y, w, z)
        .stroke()
}

function generateTableRow (doc, item, y) {
    doc
        .fontSize(8)
        .fillColor('#3C3C3D')
        .text(item.cant, 70, y)
        .text(item.description, 150, y)
        .text(item.precio_unitario, 350, y)
        .text(item.importe, 500, y)
}

function tableHeader(doc) {
    generateHr(doc,50, 250,480, 1, "red")
    doc
        .fillColor('#043078')
        .fontSize(12)
        .text("CANT.", 60, 260)
        .text("DESCRIPCION", 150, 260)
        .text("PRECIO UNITARIO", 300, 260)
        .text("IMPORTE", 470, 260)
    generateHr(doc, 50, 280, 480, 1, "red")
}

function tableBody(doc, invoice) {
    // console.log("invpiceee : ", invoice)
    for(var i = 0; i < invoice.items.length; i++) {
        var item = invoice.items[i]
        // console.log("los itemmssss : ", item)
        var position = (i * 20) + 293
        generateTableRow(doc, item, position)
    }
}

function tableFooter(doc, invoice) {
    doc
    .fontSize(8)
    .fillColor('#3C3C3D')
    .text("SUBTOTAL", 350, 370)
    .text("IGV", 350, 390)
    .text(invoice.subtotal, 500, 370)
    .text(invoice.paid, 500, 390)

    .fillColor('#043078')
    .fontSize(12)
    .text("TOTAL", 350, 410)
    .text(invoice.total, 500, 410)

    .image(`${__dirname}/images/firma.png`, 380, 480, { width: 150, align: "right" })

}

function createFooter(doc) {
    generateHr(doc,300, 680,1, 100, "black")
    doc
        .fontSize(30)
        .text("FOOTER", 170, 750)
        
        .fillColor('red')
        .fontSize(10)
        .text("CONDICIONES Y FORMA DE PAGO", 310, 685)
        .fillColor('#3C3C3D')
        .fontSize(9)
        .text("El pago se realizara en un plazo de 20 dias", 310, 715)
        .text("Banco Estander", 310, 745)
        .text("IBAN: ES12 3456 7891", 310, 758)
        .text("SWIFT/BIC: ABCDEM1XXX", 310, 771)
}

module.exports = {
    createInvoice
}