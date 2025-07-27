import {z} from 'zod'

const signupValidation = z.object({
    username: z.string().min(3, {message: "Username must be longer than 3 characters!"}).refine((val) => /^[A-Za-z0-9]+$/.test(val), {message: "Cannot contain special characters"}),
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().min(8, {message: "Password must be atleast 8 characters long."})
});

const loginValidation = signupValidation.pick({
    username: true,
    password: true
});

export {
    loginValidation,
    signupValidation
}