"use server"
import { IRegisterReq, IRegisterRes } from '../data-types/auth';


export async function registerUser(regData:IRegisterReq): Promise<IRegisterRes>{
  try {

    const res = await fetch(`${process.env.API_BASE_URL}/accounts/register`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        cache:"no-store",
        body: JSON.stringify(regData),
    })

    if(!res.ok){
        const apiError = await res.text()
        throw apiError
    }

    const data = await res.json() as IRegisterRes
    return data

  } 
  catch(error)
  {
    console.error('error',error)
    throw error
  }
}