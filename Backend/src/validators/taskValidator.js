import zod from "zod";

const taskValidatorZod = zod.object({
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean()
});

export default taskValidatorZod;