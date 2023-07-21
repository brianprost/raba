export type MyUpload = {
    uploadId: string;
    recipientEmail: string;
    title: string;
    description: string;
    chargeCode?: string;
    fileUrl: string;
    createdAt: string;
    expiresOn: string;
};

export type UploadToMe = {
    uploadId: string;
    senderEmail: string;
    title: string;
    description: string;
    chargeCode?: string;
    fileUrl: string;
    createdAt: string;
    expiresOn: string;
};