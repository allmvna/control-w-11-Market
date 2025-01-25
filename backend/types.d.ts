export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string;
}

export interface ProductFields {
    user: mongoose.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    category: mongoose.Types.ObjectId;
    image: string;
}