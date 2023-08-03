export interface User {
    id:          UserID;
    name:        string;
    phoneNumber: string;
    email:       string;
    password:    string;
    rolId:       null;
}

export interface UserID {
    documentType:   string;
    documentNumber: number;
}
