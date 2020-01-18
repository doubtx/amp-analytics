const BaseQuery = require('./base')

module.exports = class CountriesQuery extends BaseQuery{
  get_query () {
    return `
      SELECT
      country as country,
      COUNT(DISTINCT ip) as unq_pageviews

      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() } AND country IS NOT NULL
      GROUP BY country
      ORDER BY COUNT(DISTINCT ip) DESC
      LIMIT 10`;
  }
}
