const BaseQuery = require('./base')

module.exports = class PageviewsQuery extends BaseQuery{
  get_query () {
    return `
      SELECT
      DATE(date) as date,
      COUNT(DISTINCT ip) as unq_pageviews,
      COUNT(ip) as pageviews
      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() }
      GROUP BY DATE(date)
      ORDER BY DATE(date) ASC
      LIMIT 10`;
  }
}
