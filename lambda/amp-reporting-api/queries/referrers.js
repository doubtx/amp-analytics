const BaseQuery = require('./base')

module.exports = class ReferrersQuery extends BaseQuery{
  get_query () {
    return `
      SELECT
      REPLACE(ref_domain, 'www.', '') as referrer,
      COUNT(DISTINCT ip) as unq_pageviews

      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() } AND ref_domain != '' AND REPLACE(ref_domain, 'www.', '') != '${ this.filters.domain }'
      GROUP BY REPLACE(ref_domain, 'www.', '')
      ORDER BY COUNT(DISTINCT ip) DESC
      LIMIT 10`;
  }
}
