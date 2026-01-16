
export class UnsupportedPdfError extends Error{
    constructor(){
        super("PDF have no extractable content")
        this.name = "UnsupportedPdfError"
    }
}