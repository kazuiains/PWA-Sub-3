const DEFAULT_PAGE = "standings";

const route = function(data = null) {
    parser(data).then(url => {
        switch (url.pagePath) {
            case 'teams':
                pageTeams()
                break
            case 'favorite-teams':
                pageFav()
                break
            default:
                loadPage(url.pagePath).then(page => {
                    if (page == DEFAULT_PAGE || page == "") {
                        pageStand()
                    }
                })
                break
        }
    })
}