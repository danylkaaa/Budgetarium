const config = require("@config");

class Pagination {
    constructor(options) {
        this.page = options.page;
        this.limit = options.limit;
        this.select = options.select;
    }

    get select() {
        return this._select;
    }

    get offset() {
        return this._offset;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }

    set select(value) {
        this._select = value || undefined;
    }

    set page(value) {
        this._page = Number(value) || 1;
    }

    set limit(value) {
        this._limit = Number(value) || config.queries.PAGINATION_LIMIT;
    }

    set offset(value) {
        this._offset = Number(value);
    }

    toObj() {
        return {
            page: this.page,
            select: this.select,
            limit: this.limit
        };
    }
}

module.exports = Pagination;