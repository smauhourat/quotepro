// services/quoteService.js
import Customer from '@models/customer'
import Product from '@models/product'
import PaymentDeadline from '@models/paymentdeadline'
import Supplier from '@models/supplier'
import Packaging from '@models/packaging'
import Freighttype from '@models/freighttype'
import IIBBTreatment from '@models/iibbtreatment'
import Quote from '@models/quote'
import Joi from 'joi'
import { connectToDB } from '@config/db'

// Helper function to calculate total cost
const calculateTotalCost = (quantity, fclKilogram, sellerCommission, additionalPercentage, additionalFixed) => {
    const baseCost = quantity * fclKilogram
    const commissionCost = baseCost * (sellerCommission / 100)
    const additionalCost = baseCost * (additionalPercentage / 100) + additionalFixed
    return baseCost + commissionCost + additionalCost
}

// Define the ViewModel and validation schema using Joi
const quoteInputViewModelSchema = Joi.object({
    userInitials: Joi.string().required(),
    customerId: Joi.string().required().messages({
        "string.empty": "Debe ingresar un Cliente",
        "any.required": "Debe ingresar un Cliente",
    }),
    productId: Joi.string().required().messages({
        "string.empty": "Debe ingresar un Producto",
        "any.required": "Debe ingresar un Producto",
    }),
    paymentDeadlineId: Joi.string().required().messages({
        "string.empty": "Debe ingresar una Condicion de Pago",
        "any.required": "Debe ingresar una Condicion de Pago",
    }),
    quantityQuote: Joi.number().required().positive().messages({
        "string.empty": "Debe ingresar una Condicion de Pago",
        "any.required": "Debe ingresar una Condicion de Pago",
        "number.base": "Debe ingresar un valor numerico",
        "number.positive": "Debe ingresar un valor numerico positivo"
    }),
    stockTime: Joi.number().default(0),
    deliveryAddressInput: Joi.string().allow('').optional(),
    deliveryDateInput: Joi.string().isoDate().allow('').optional(),
    availabilityDaysInput: Joi.number().allow(null).optional(),
    sellerCommissionInput: Joi.number().required().min(0),
    additionalPercentageInput: Joi.number().required().min(0),
    additionalFixedInput: Joi.number().required().min(0),
    userObservations: Joi.string().allow('').optional(),
    internalObservations: Joi.string().allow('').optional(),
    paymentDeadlineCustomerName: Joi.string().allow('').optional(),
    typeExchange: Joi.number().required().min(0)
});

// Function to calculate a quote without persisting it
const calculateQuote = async (quoteInputData) => {
    try {
        await connectToDB()

        // Validate the view model
        const { error, value } = quoteInputViewModelSchema.validate(quoteInputData);
        if (error) {
            console.log('error =>', error)
            throw new Error(`Error de validación: ${error.details.map(d => d.message).join(', ')}`);
        }

        console.log(value);

        //console.log(quoteData)
        // Fetch related entities
        const customer = await Customer.findById(value.customerId)
        const product = await Product.findById(value.productId)
            .populate('supplier')
            .populate('packaging')
            .populate('freightType')
            .populate('iibbTreatment')
        const paymentDeadline = await PaymentDeadline.findById(value.paymentDeadlineId)

        if (!customer) {
            throw new Error('Related entities Customer not found')
        }
        if (!product) {
            throw new Error('Related entities Product not found')
        }
        if (!paymentDeadline) {
            throw new Error('Related entities PaymentDeadline not found')
        }

        console.log('product =>', product)

        // // Calculate total cost
        const totalCost = calculateTotalCost(
            value.quantityQuote,
            product.fclKilogram,
            value.sellerCommissionInput,
            value.additionalPercentageInput,
            value.additionalFixedInput
        )

        const calculatedPrice = totalCost * 1.15

        // Prepare the calculated quote details
        const calculatedQuote = {
            userInitials: value.userInitials,
            customer: customer._id,
            customerName: customer.name,
            customerContactName: customer.contactName,
            customerContactMail: customer.contactMail,
            customerCompany: customer.company,
            product: product._id,
            productName: product.name,
            productSupplierName: product.supplier.name,
            productBrandName: product.brand,
            productFCLKilomgram: product.fclKilogram,
            productPackagingName: product.packaging.description,
            productValidityOfPrice: product.validityOfPrice,
            productWaste: product.waste,
            quantityQuote: value.quantityQuote,
            stockTime: value.stockTime || 0,
            deliveryAddressInput: value.deliveryAddressInput,
            deliveryDateInput: value.deliveryDateInput,
            availabilityDaysInput: value.availabilityDaysInput,
            sellerCommissionInput: value.sellerCommissionInput,
            additionalPercentageInput: value.additionalPercentageInput,
            additionalFixedInput: value.additionalFixedInput,
            paymentDeadline: paymentDeadline._id,
            paymentDeadlineName: paymentDeadline.description,
            paymentDeadlineMonths: paymentDeadline.months,
            customerTotalCost: totalCost,
            userObservations: value.userObservations,
            internalObservations: value.internalObservations,
            paymentDeadlineCustomerName: value.paymentDeadlineCustomerName,
            price: calculatedPrice,
            typeExchange: value.typeExchange,
            quoteDate: value.quoteDate || new Date()
        }

        return calculatedQuote
    } catch (error) {
        console.error('Error calculating quote:', error)
        throw error
    }
}

const createQuote = async (quoteData) => {

    // 1. Calculate Quote on the fly
    let calculatedQuote = await calculateQuote(quoteData)

    // 2. Create Quote in DB
    calculatedQuote.code = 'COT-EXP-2024118-AVM'
    const quote = Quote(calculatedQuote)
    await quote.save()

    // 3. Retun Created Quote
    return quote
}

export { calculateQuote, createQuote }
