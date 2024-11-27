import { NextResponse } from "next/server"
import CreditRating from '@models/creditrating'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'CreditRating'

export const GET = async (request, { params }) => {

  const { id } = await params

  try {
    if (!id) throw new NotFoundError("CreditRating")

    await connectToDB();
    const creditRating = await CreditRating.findById(id)
    if (!creditRating) throw new NotFoundError(RESOURCE)

    return NextResponse.json(ResponseOk(creditRating), { status: 200 })
  } catch (error) {
    console.log(error)
    return handleError(error)
  }
}

export const DELETE = async (request, { params }) => {

  const { id } = await params

  try {
    if (!id) throw new NotFoundError(RESOURCE)

    await connectToDB()
    const creditRating = await CreditRating.findByIdAndDelete(id)
    if (!creditRating) throw new NotFoundError(RESOURCE)

    return NextResponse.json(ResponseOk(creditRating), { status: 200 })
  } catch (error) {
    //console.log(error)
    return handleError(error)
  }

}