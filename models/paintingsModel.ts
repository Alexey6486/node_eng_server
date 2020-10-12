const mongoosePaintingModel = require('mongoose');
import mongoose, { Schema, Document } from "mongoose";

export interface PaintingInterface extends Document {
    name: string;
    style: string;
    genre: string;
    material: string;
    technic: string;
    description: string;
    created: number;
    image: string;
    width: number;
    height: number;
    added: Date;
}

const paintingSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A painting must have a name'],
        unique: true,
        trim: true,
        maxlength: [200, 'A painting\'s name must have maximum 200 characters'],
        minlength: [1, 'A painting\'s name must have minimum 1 character'],
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
        type: Number,
        required: [true],
        trim: true,
        min: [1900, 'Length must be equal to 1900'],
        max: [2100, 'Length must be equal to 2100']
    },
    image: {
        type: String,
        required: [true],
    },
    width: {
        type: Number,
        required: [true, 'A painting must have a width'],
        trim: true,
        min: [1, 'Min width must be equal to 1'],
        max: [1000, 'Max width must not be more than 1000']
    },
    height: {
        type: Number,
        required: [true, 'A painting must have a height'],
        trim: true,
        min: [1, 'Min height must be equal to 1'],
        max: [1000, 'Max height must not be more than 1000']
    },
    added: {
        type: Date,
        default: Date.now()
    }
});

const Painting = mongoose.model<PaintingInterface>('Painting', paintingSchema);

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