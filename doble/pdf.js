const PDFDocument = require('pdfkit')
const fs = require('fs')
const doc = new PDFDocument();

// Declaramos todo el texto de contenido y lo guardamos en lorem
let lorem = `Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
¿Por qué lo usamos?
Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).
¿De dónde viene?
Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32`

// Titulo de nuestro pdf 
doc.fontSize(25).text('Basic Pdf example doble', {
    align: 'center'     // le damos que este centrado
})

// damos un espaciado
doc.moveDown()

// insertamos el texto 
doc
    .font('Times-Roman')    // tipo de letra
    .fontSize(12)           // tamaño de letra
    .text(lorem, {          // declaracion del texto
        columns: 2,         // separamos el texto en columnas
        columnGap: 20,       // le indicamos cuanto espacio te damos entre las columnas
        align: 'justify',   // ponemos el texto en justificado
        lineGap: 3.0,       // cantidad de espacio que hay entre cada linea de texto
        wordSpacing: 1,     // antidad de espacio entre cada palabra en el texto
        characterSpacing: 0.5 // la cantidad de espacio entre cada carácter en el texto
    }) 

doc.pipe(fs.createWriteStream('files/output.pdf'))       // le indicamos donde vamos a poner nuestro pdf

doc.end();                  // termina y crea el documento