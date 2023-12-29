module.exports = mongoose => {

    const schema = mongoose.Schema(
        {
            title: String,
            price: Number,
            priceDisplay: Number,
            discount: Number,
            imgUrl: String,
            source: String,
            lastUpdated: String,
        }, {
            timestamps: true
        }
    );

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;

        return object;
    })

    return mongoose.model("items", schema);
}