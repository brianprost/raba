export type AccountUploadsFromDb = {
    uploadId: string;
    recipientEmail: string;
    title: string;
    description: string;
    chargeCode?: string;
    fileUrl: string;
    createdAt: string;
    expiresOn: string;
};
