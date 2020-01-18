const BaseQuery = require('./base')

module.exports = class BrowsersQuery extends BaseQuery{
  get_query () {

    return `
      SELECT
      browser.name as browser,
      COUNT(DISTINCT ip) as unq_pageviews

      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() } AND browser.name IS NOT NULL
      GROUP BY browser.name
      ORDER BY COUNT(DISTINCT ip) DESC
      LIMIT 10`;
  }
}
