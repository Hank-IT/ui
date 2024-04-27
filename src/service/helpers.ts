export const getCookie = (cname) => {
    const name = cname + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

export const getDisplayablePages = (totalPages: number, pageNumber: number, displayPages: number = 4) => {
    if (totalPages < displayPages) {
        displayPages = totalPages
    }

    let offset = 0

    const middlePage = Math.ceil(displayPages / 2)

    if (pageNumber <= middlePage) {
        offset = 0
    } else if (pageNumber > totalPages - middlePage) {
        offset = totalPages - displayPages
    } else {
        offset = pageNumber - middlePage
    }

    return [...Array(displayPages).keys()].map(i => i + 1 + offset)
}