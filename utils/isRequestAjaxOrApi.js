const isRequestAjaxOrApi =  req => !req.accepts('html') || req.xhr

module.exports = isRequestAjaxOrApi