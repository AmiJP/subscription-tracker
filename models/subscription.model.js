import mongoose from "mongoose";

const subSciptionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: [true, "Subscription name is required"],
        minLength:2,
        maxLength:100
    },
    price: {
        type:Number,
        require: [true, 'Subscription Price is required'],
        min: [0, "Price is must be grater than 0"]
    },
    currency: {
        type:String,
        enum : ["USD", "CAD", "INR"],
        default:"USD"
    },
    frequency: {
        type : String,
        enum: ["daily","weekly","monthly","yearly"],
    },
    category: {
        type:String,
        enum: ["Sports", "news", "entertainment", "lifestyle","technology","finance","politics","other"],
        required: true
    },
    paymentMethod: {
        type:String,
        require:true,
        trim:true
    },
    status: {
        type:String,
        enum: ["active","cancel","expire"],
        default:"active"
    },
    startDate: {
        type:Date,
        require:true,
        validate: {
            validator : (value) => value <= new Date(),
            message: "Start date must be in past",
    }
},
    renewalDate: {
        type:Date,
        require:true,
        validate: {
            validator : function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after that start date",
    }
},
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index:true
 }
})

subSciptionSchema.pre('save', function(next) {
    
if(!this.renewalDate) {
    const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
    }
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
}
next();
});
const Subscription = mongoose.model("Subscription", subSciptionSchema);

export default Subscription