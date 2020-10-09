class APIFeatures {

    query: any
    queryString: any

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // form query
        const shallowQueryCopy = {...this.queryString};
        const excludedQueryFields = ['page', 'sort', 'limit', 'fields'];
        excludedQueryFields.forEach(el => delete shallowQueryCopy[el]);

        // filtering params greater or lesser then...
        // ?width[gte]=30
        // ?genre=actuality
        let conditionalFiltering = JSON.stringify(shallowQueryCopy);
        conditionalFiltering = conditionalFiltering.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query.find(JSON.parse(conditionalFiltering));
        return this;
    }

    sort() {
        // sorting
        // asc - ?sort=added
        // dsc - ?sort=-added
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-added');
        }
        return this;
    }

    fields() {
        // exclude some fields
        // show only this field - ?fields=name
        // show all but this field - ?fields=-name
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination() {
        // page and limit per page
        // ?page=5&limit=20
        const page = this.queryString.page * 1 || 1; // default 1
        const limit = this.queryString.limit * 1 || 9; // default 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

module.exports = APIFeatures;