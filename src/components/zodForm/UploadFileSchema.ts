import z from "zod";

export const fileUploadSchema = {
    contractOrProposal: z.instanceof(FileList).optional().describe("file"),
    fileType: z.enum(["Proposal", "Executed Contract"]).optional(),
};

export const withFileUpload = <T extends z.ZodObject<any>>(schema: T) =>
    schema
        .extend(fileUploadSchema)
        .superRefine((data, ctx) => {
            if (data.contractOrProposal instanceof FileList && data.contractOrProposal.length > 0 && !data.fileType) {
                ctx.addIssue({
                    path: ["fileType"],
                    message: "File Type is required when a file is provided",
                    code: "custom",
                });
            }
        });
