const BaseQuery = require('./base')

module.exports = class ScreensQuery extends BaseQuery{
  get_query () {
    return `
    SELECT
    sw_group,
    COUNT(DISTINCT ip) as unq_pageviews

    FROM
    (
       SELECT
        ip,
        sw as width,
        CASE
         WHEN CAST(sw as INTEGER) <= 320 THEN '320 px and smaller'
         WHEN CAST(sw as INTEGER) > 320 AND CAST(sw as INTEGER) <= 576 THEN '320 px to 576 px'
         WHEN CAST(sw as INTEGER) > 576 AND CAST(sw as INTEGER) <= 992 THEN '576 to 992 px'
         WHEN CAST(sw as INTEGER) > 992 AND CAST(sw as INTEGER) <= 1440 THEN '992 to 1440 px'
         WHEN CAST(sw as INTEGER) > 1440 THEN 'bigger than 1440 px'
         ELSE 'Other'
        END as sw_group

        FROM "amp-analytics"."amp_data"
        WHERE ${ this.build_where() } AND sw != 'SCREEN_WIDTH'
    )

    GROUP BY sw_group
    ORDER BY sw_group ASC
    LIMIT 10`;
  }
}
