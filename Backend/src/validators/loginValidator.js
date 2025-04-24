import zod from "zod";

const loginValidatorZod = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(15).regex(/[^A-Za-z0-9]/)
});

export default loginValidatorZod;