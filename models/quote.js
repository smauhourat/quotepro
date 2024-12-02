import { Schema, model, models } from 'mongoose';

const QuoteSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    userInitials: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers'
    },
    customerName: {
        type: String
    },
    customerContactName: {
        type: String
    },
    customerContactMail: {
        type: String
    },
    customerCompany: {
        type: String
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    productName: {
        type: String,
        required: true
    },
    //ProductProviderName
    productSupplierName: {
        type: String,
        required: true
    },
    productBrandName: {
        type: String,
        required: true
    },
    productFCLKilomgram: {
        type: Number,
        required: true
    },
    productPackagingName: {
        type: String,
        required: true
    },
    productValidityOfPrice: {
        type: Date,
        required: true
    },
    productWaste: {
        type: Number,
    },
    //MinimumQuantityDelivery or QuantityOpenPurchaseOrder
    quantityQuote: {
        type: Number,
        required: true
    },
    //MaximumMonthsStock
    stockTime: {
        type: Number,
        default: 0
    },
    //deliveryAddress
    deliveryAddressInput: {
        type: String
    },
    //datesDeliveryInput
    deliveryDateInput: {
        type: String
    },
    availabilityDaysInput: {
        type: Number
    },
    sellerCommissionInput: {
        type: Number
    },
    additionalPercentageInput: {
        type: Number
    },
    // FixedCost    
    additionalFixedInput: {
        type: Number
    },
    productValidityOfPriceInput: {
        type: Number
    },
    userObservations: {
        type: String
    },
    //internalComments
    internalObservations: {
        type: String
    },
    paymentDeadline: {
        type: Schema.Types.ObjectId,
        ref: 'paymentdeadlines'
    },
    paymentDeadlineName: {
        type: String,
    },
    paymentDeadlineMonths: {
        type: Number,
    },
    //PaymentDeadlineCustomer
    paymentDeadlineCustomerName: {
        type: String,
    },
    price: {
        type: Number
    },
    customerTotalCost: {
        type: Number
    },
    typeExchange: {
        type: Number
    },
    quoteDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

const Quote = models.Quote || model('Quote', QuoteSchema);

module.exports = Quote