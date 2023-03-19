import db from "../database"

const {Users} = db

export default async (req:any) => {
  const { email, password } = req.body
  const errors:any = {}
  const data:any = {}

  block: try {
    const user = await Users.findOne({ email })
    if (!user) {
      errors.message = "User not found"
      break block
    }

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) {
      errors.message = "Email and Password do not match"
      break block
    }

    const token = user.getSignedToken()
    if (!token) {
      errors.message = "Unable to login the user. Please contact the server admin"
      break block
    }

    data.token = token

  } catch (error) {
    errors.message = error
    console.log(error)

  } finally {
    return {
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

export const registerController = async (req:any) => {
  const { email, password, firstname, lastname, phone } = req.body
  const errors:any = {}
  const data:any = {}

  block: try {
    const checkUserExists = await Users.findOne({ email })

    if(checkUserExists) {
      errors.message = "Email already in use"
      break block
    }

    const user = await Users.create({ email, password, firstname, lastname, phone })

    const token = user.getSignedToken()
    data.token = token

  } catch (error) {
    errors.message = error
    console.error(error)

  } finally {
    return { 
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}
