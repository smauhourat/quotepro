import { NextResponse } from "next/server"
import AppParameter from '@models/appparameter'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'AppParameter'

export const GET = async (request, { params }) => {

  const { id } = await params

  try {
    if (!id) throw new NotFoundError(RESOURCE)

    await connectToDB();
    const appparameter = await AppParameter.findById(id)
    if (!appparameter) throw new NotFoundError(RESOURCE)

    return NextResponse.json(ResponseOk(appparameter), { status: 200 })
  } catch (error) {
    //console.log(error)
    return handleError(error)
  }
}

export const DELETE = async (request, { params }) => {

  const { id } = await params

  try {
    if (!id) throw new NotFoundError(RESOURCE)

    await connectToDB()
    const appparameter = await AppParameter.findByIdAndDelete(id)
    if (!appparameter) throw new NotFoundError(RESOURCE)

    return NextResponse.json(ResponseOk(appparameter), { status: 200 })
  } catch (error) {
    //console.log(error)
    return handleError(error)
  }

}