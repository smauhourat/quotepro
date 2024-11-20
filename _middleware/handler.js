import clientDB from './db'

export async function database(req, res, next) {
    const client = await clientDB
    req.db = client

    return next()
}

export const defaultNextConnectOptions = {
    onError: (err, req, res, next) => {
        res.status(501).json({ error: `Oops, algo anduvo mal!. ${err.message}` })
    },
    onNoMatch: (req, res) => {
        res.status(405).json({ error: `Método ${req.method} no permitido.` })
    }
}