
export class HomeController {
    constructor() {}

    /**
     * Default screen to display, displays the upload document form
     * @param req
     * @param res
     * @param next
     */
    index = (req, res, next) => {
        res.render('home', { title: 'AI Document Summarizer', description: 'Uses AI to analyze the document' })
    }
}
