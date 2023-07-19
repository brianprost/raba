export type UploadDbRecord = {
    uploadId: string;
    senderEmail: string;
    recipientEmail: string;
    title: string;
    description: string;
    chargeCode?: string;
    fileUrl: string;
    createdAt: string;
    expiresOn: string;
}