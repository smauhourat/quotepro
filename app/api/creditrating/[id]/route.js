import { NextResponse } from "next/server"
import CreditRating from '@models/creditrating'
import { connectToDB } from '@config/db'
import { NotFoundError } from '@lib/http-error'
import handleError from '@lib/handlers/error'

export const GET = async (request, { params }) => {

  const { id } = await params
  console.log(id)
  if (!id) throw new NotFoundError("CreditRating")

  try {
    await connectToDB();
    const creditRating = await CreditRating.findById(id)
    // console.log('creditRating =>', creditRating)
    if (!creditRating) throw new NotFoundError("CreditRating")

    return NextResponse.json(creditRating, { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get a Credit Rating", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {

  const { id } = await params
  console.log(id)
  if (!id) throw new NotFoundError("CreditRating")

  try {
    await connectToDB();
    const creditRating = await CreditRating.findByIdAndDelete(id)
    if (!creditRating) throw new NotFoundError("CreditRating")

    return NextResponse.json(creditRating, { status: 200 })
  } catch (error) {
    console.log(error)
    //return new Response("Failed to get a Credit Rating", { status: 500 })
    return handleError(error, "api")
  }

}