const mongoosePaintingModel = require('mongoose');

const paintingSchema = new mongoosePaintingModel.Schema({
    name: {
        type: String,
        required: [true, 'A painting must have a name'],
        unique: true,
        trim: true
    },
    style: {
        type: String,
        required: [true],
    },
    genre: {
        type: String,
        required: [true],
    },
    material: {
        type: String,
        required: [true],
    },
    technic: {
        type: String,
        required: [true],
    },
    description: {
        type: String,
        required: [false],
    },
    created: {
        type: String,
        required: [true],
        trim: true
    },
    image: {
        type: String,
        required: [true],
    },
    width: {
        type: String,
        required: [true, 'A painting must have a width'],
        trim: true
    },
    height: {
        type: String,
        required: [true, 'A painting must have a height'],
        trim: true
    },
    added: {
        type: Date,
        default: Date.now()
    }
});

const Painting = mongoosePaintingModel.model('Painting', paintingSchema);

module.exports = Painting;




























// const sectionsSchema = new mongoose.Schema({
//     pictorial: "",
//     graphic: "",
//     abstract: "",
//     puppet: "",
//     sculpture: "",
//     decorative: "",
//     another: "",
// });
// const styleSchema = new mongoose.Schema({
//     actuality: "",
//     impressionism: "",
//     expressionism: "",
//     symbolism: "",
//     abstractionism: "",
//     naive: "",
//     surrealism: "",
//     primitive: "",
//     modernism: "",
//     postmodernism: "",
//     advantgarde: "",
//     romantic: "",
//     another: "",
// });
// const genreSchema = new mongoose.Schema({
//     portrait: "",
//     landscape: "",
//     stilllife: "",
//     sketch: "",
//     nude: "",
//     another: "",
// });
// const materialSchema = new mongoose.Schema({
//     canvas: "",
//     orgalite: "",
//     paper: "",
//     whatman: "",
//     carton: "",
//     veneer: "",
//     wood: "",
//     metal: "",
// });
// const technicSchema = new mongoose.Schema({
//     crayon: "",
//     oil: "",
//     watercolor: "",
//     acryl: "",
//     pastel: "",
//     tempera: "",
//     gouache: "",
//     sanguine: "",
//     indianink: "",
//     pen: "",
//     marker: "",
//     engraving: "",
//     charcoal: "",
//     graphite: "",
//     mixed: "",
//     authors: "",
// });