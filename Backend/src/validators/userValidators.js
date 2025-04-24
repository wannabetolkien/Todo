import zod from "zod"; // Fixed import

const userValidatorZod = zod.object({ // Fixed `schema` to `object`
    name: zod.string(), // Fixed `string()` to `zod.string()`
    email: zod.string().email(), // Fixed `string()` to `zod.string()`
    password: zod.string().min(8).max(15).regex(/[^A-Za-z0-9]/) // Fixed `string()` to `zod.string()`
});

export default userValidatorZod; // Fixed `modules.export` to `export default`