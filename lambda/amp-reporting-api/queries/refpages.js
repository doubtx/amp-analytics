const BaseQuery = require('./base')

module.exports = class RefPagesQuery extends BaseQuery{

  get_query () {
    return `
      SELECT
      ref_path as referrer,
      COUNT(DISTINCT ip) as unq_pageviews
      FROM "amp-analytics"."amp_data"
      WHERE ${ this.build_where() } AND ref_domain != '' AND REPLACE(ref_domain, 'www.', '') != '${ this.filters.domain }'
      GROUP BY ref_path
      ORDER BY COUNT(DISTINCT ip) DESC
      LIMIT 10`;
  }
}
