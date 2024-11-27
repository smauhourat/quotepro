import { NextResponse } from 'next/server'
import { RequestError } from '@lib/http-error'
// import { connectToDB } from '@config/db'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    console.log('MIDDLEWARE')
    return NextResponse.next();

    // try {
    //     console.log('MIDDLEWARE')
    //     return NextResponse.next();
    // } catch (error) {
    //     //     //logger.error(error);
    //     console.log('CACAAAAAAAAAAAAAAAAAA')
    //     //     if (error instanceof RequestError) {
    //     //         console.log('error =>', error)
    //     //     }
    //     return NextResponse.status(501).json({ error: 'Internal Server Error' });
    // }
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }
