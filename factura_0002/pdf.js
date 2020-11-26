const { createInvoice } = require("./createInvoice.js");

const invoice = {
    items: [
        {
            cant: 1,
            description: "talla pequeña traje de luces rojas",
            precio_unitario: 100,
            importe: 100
        },
        {
            cant: 2,
            description: "Muy Grande Churrolito",
            precio_unitario: " " + 25,
            importe: 50
        },
        {
            cant: 3,
            description: "Equipaje de futbol",
            precio_unitario: "  " + 5,
            importe: 15
        }
    ],
    subtotal: 8000,
    paid: 0,
    total: 8000
};

createInvoice(invoice, "files/invoice.pdf");