const querystring = require('querystring')
const getPaginationUrls = (req, currentPage, totalPages) => {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
    const paginationUrls = {};
    if (currentPage < totalPages) {
        paginationUrls.nextPage = `${baseUrl}?${querystring.stringify({...req.query, page: currentPage + 1})}`;
        paginationUrls.next = currentPage+1
      }
    
      if (currentPage > 1) {
        paginationUrls.prevPage = `${baseUrl}?${querystring.stringify({...req.query, page: currentPage - 1})}`;
        paginationUrls.prev = currentPage - 1
      }
    
      return paginationUrls;
/*     const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const prevPage = currentPage > 1 ? currentPage - 1 : null; // Página anterior
    const nextPage = currentPage < totalPages ? currentPage + 1 : null; // Página siguiente
    const nextPageUrl = nextPage ? `${url}&page=${nextPage}` : null; // URL de la página siguiente
    const prevPageUrl = prevPage ? `${url}&page=${prevPage}` : null; // URL de la página anterior
    return { prevPageUrl, nextPageUrl, nextPage, prevPage }; */
  };
  
  module.exports = { getPaginationUrls };