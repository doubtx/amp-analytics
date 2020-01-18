

module.exports = class BaseQuery {
  constructor(filters) {
    this.filters = filters
  }

  build_where() {
    let where_statements = []
    where_statements.push(`DATE(date) >= DATE('${this.filters.start}')`)
    where_statements.push(`DATE(date) <= DATE('${this.filters.end}')`)

    if (this.filters.domain) {
      where_statements.push(`domain = '${this.filters.domain}'`)
    }

    if (this.filters.path) {
      where_statements.push(`page = '${this.filters.path}'`)
    }

    if (this.filters.referrer) {
      where_statements.push(`REPLACE(ref_domain, 'www.', '') = '${this.filters.referrer}'`)
    }

    return where_statements.join(' AND ')
  }
}
