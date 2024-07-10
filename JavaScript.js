$(function() {
    $(".draggable").draggable();
    $(".resizable").resizable();

    const url = 'path/to/your/document.pdf';
    let pdfDoc = null,
        pageNum = 1,
        scale = 1.5,
        canvas = document.getElementById('pdf-canvas'),
        ctx = canvas.getContext('2d');

    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        renderPage(pageNum);
    });

    function renderPage(num) {
        pdfDoc.getPage(num).then(function(page) {
            let viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
});
