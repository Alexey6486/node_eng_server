// form query
// const getAllPaintingsQuery = {...request.query};
// const excludedPaintingsQueryFields = ['page', 'sort', 'limit', 'fields'];
// excludedPaintingsQueryFields.forEach(el => delete getAllPaintingsQuery[el]);

// filtering params greater or lesser then...
// ?width[gte]=30
// ?genre=sketch
// let conditionalAllPaintingsFiltering = JSON.stringify(getAllPaintingsQuery);
// conditionalAllPaintingsFiltering = conditionalAllPaintingsFiltering.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//
// let allPaintingsQuery = PaintingModelImport.find(JSON.parse(conditionalAllPaintingsFiltering));
// console.log(allPaintingsQuery)

// sorting
// asc - ?sort=added
// dsc - ?sort=-added
// if (request.query.sort) {
//     const sortBy = request.query.sort.split(',').join(' ');
//     allPaintingsQuery = allPaintingsQuery.sort(sortBy);
// } else {
//     allPaintingsQuery = allPaintingsQuery.sort('-added');
// }

// exclude some fields
// show only this field - ?fields=name
// show all but this field - ?fields=-name
// if (request.query.fields) {
//     const fields = request.query.fields.split(',').join(' ');
//     allPaintingsQuery = allPaintingsQuery.select(fields);
// } else {
//     allPaintingsQuery = allPaintingsQuery.select('-__v');
// }

// page and limit per page
// ?page=5&limit=20
// const page = request.query.page * 1 || 1; // default 1
// const limit = request.query.limit * 1 || 9; // default 9
// const skip = (page - 1) * limit;
// allPaintingsQuery = allPaintingsQuery.skip(skip).limit(limit);

// if (request.query.page) {
//     const picturesNumber = await PaintingModelImport.countDocuments();
//     if (skip >= picturesNumber) throw new Error('Page doesn\'t exist.');
// }
//const resultAllPaintingsQuery = await allPaintingsQuery.