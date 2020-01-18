const BaseQuery = require('./base')

module.exports = class BrowsersQuery extends BaseQuery{
  get_query () {
    return `
      SELECT
      page as page,
      COUNT(DISTINCT ip) as unq_pageviews

      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() } AND page IS NOT NULL
      GROUP BY page
      ORDER BY COUNT(DISTINCT ip) DESC
      LIMIT 10`;
  }
}
