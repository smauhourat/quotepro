// services/quoteService.js
import Customer from '@models/customer'
import Product from '@models/product'
import PaymentDeadline from '@models/paymentdeadline'
import Supplier from '@models/supplier'
import Packaging from '@models/packaging'
import Freighttype from '@models/freighttype'
import IIBBTreatment from '@models/iibbtreatment'

import Quote from '@models/quote'
import { connectToDB } from '@config/db'

// Helper function to calculate total cost
const calculateTotalCost = (quantity, fclKilogram, sellerCommission, additionalPercentage, additionalFixed) => {
    const baseCost = quantity * fclKilogram
    const commissionCost = baseCost * (sellerCommission / 100)
    const additionalCost = baseCost * (additionalPercentage / 100) + additionalFixed
    return baseCost + commissionCost + additionalCost
}

// Function to calculate a quote without persisting it
const calculateQuote = async (quoteData) => {
    try {
        await connectToDB()

        //console.log(quoteData)
        // Fetch related entities
        const customer = await Customer.findById(quoteData.customer)
        const product = await Product.findById(quoteData.product)
            .populate('supplier')
            .populate('packaging')
            .populate('freightType')
            .populate('iibbTreatment')
        const paymentDeadline = await PaymentDeadline.findById(quoteData.paymentDeadline)

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
            quoteData.quantityQuote,
            product.fclKilogram,
            quoteData.sellerCommissionInput,
            quoteData.additionalPercentageInput,
            quoteData.additionalFixedInput
        )

        const calculatedPrice = totalCost * 1.15

        // Prepare the calculated quote details
        const calculatedQuote = {
            userInitials: quoteData.userInitials,
            customer: customer._id,
            customerName: customer.name,
            customerContactName: customer.contactName,
            customerContactMail: customer.contactMail,
            customerCompany: customer.company,
            product: product._id,
            productName: product.name,
            productSupplierName: product.supplierName,
            productBrandName: product.brandName,
            productFCLKilomgram: product.fclKilogram,
            productPackagingName: product.packagingName,
            productValidityOfPrice: product.validityOfPrice,
            productWaste: product.waste,
            quantityQuote: quoteData.quantityQuote,
            stockTime: quoteData.stockTime || 0,
            deliveryAddressInput: quoteData.deliveryAddressInput,
            deliveryDateInput: quoteData.deliveryDateInput,
            availabilityDaysInput: quoteData.availabilityDaysInput,
            sellerCommissionInput: quoteData.sellerCommissionInput,
            additionalPercentageInput: quoteData.additionalPercentageInput,
            additionalFixedInput: quoteData.additionalFixedInput,
            paymentDeadline: paymentDeadline._id,
            paymentDeadlineName: paymentDeadline.name,
            paymentDeadlineMonths: paymentDeadline.months,
            customerTotalCost: totalCost,
            userObservations: quoteData.userObservations,
            internalObservations: quoteData.internalObservations,
            paymentDeadlineCustomerName: quoteData.paymentDeadlineCustomerName,
            price: calculatedPrice,
            typeExchange: quoteData.typeExchange,
            quoteDate: quoteData.quoteDate || new Date()
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
