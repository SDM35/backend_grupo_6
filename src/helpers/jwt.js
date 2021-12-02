import jwt from "jsonwebtoken";

const secret = "@SecretKey@";

export const generarJwt = (uid, nombre) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            nombre
        }

        jwt.sign(payload, secret, { expiresIn: "2h" },
            (err, token) => {
                if(err){
                    console.log(err);
                    reject("No se pudo generar el token")
                }

                resolve(token)
            }
        )
    })
};