import CreditRating from '@models/creditrating'
import { connectToDB } from '@config/db';


export const GET = async (request, { params }) => {

  const id = await params.id
  console.log('id =>', id)
  try {
      await connectToDB();
      const creditRatings = await CreditRating.find({_id: id})
      return new Response(JSON.stringify(creditRatings), { status: 200 })
  } catch (error) {
      return new Response("Failed to get a Credit Rating", { status: 500 })
  }
}