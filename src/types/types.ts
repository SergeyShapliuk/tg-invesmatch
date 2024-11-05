export type GetForm = {
    custom_values: [],
    type: string,
    type_id: number,
    type_title: string,
    type_value: string,
    values: { id: number, value: string }[]

}

export type RegisterVariables = {
    tg_id: string;
    tg_nick: string;
    tg_firstname: string;
    tg_lastname: string;
    tg_language: string;
    business_models: string[];
    description: string;
    geography: string[];
    industries: string[];
    name: string;
    project_stages: string[];
    user_types: string[];
    wallet: string;
    founder_donuts: {
        current_amount: number,
        purpose_amount: number,
        currency_id: number
    }
}

export type UpdateVariables = {
    tg_id: string;
    // tg_nick: string;
    // tg_firstname: string;
    // tg_lastname: string;
    // tg_language: string;
    business_models?: string[];
    description?: string;
    geography?: string[];
    industries?: string[];
    name?: string;
    project_stages?: string[];
    user_types?: string[];
    wallet?: string;
    // founder_donuts: {
    //     current_amount: number,
    //     purpose_amount: number,
    //     currency_id: number
    // }
}

export type UserData = {
    success: boolean;
    message: string;
    user: User;
}

export type User = {
    id: number;
    tg_id: string;
    tg_firstname: string;
    tg_lastname: string;
    tg_nick: string;
    tg_language: string;
    created_at: string;
    updated_at: string;
    user_types: string[];
    industries: string[];
    business_models: string[];
    project_stages: string[];
    geography: string[];
    name: string;
    wallet: string;
    description: string;
    photos: any[];
    donuts: Donuts;
}

export type UserWithRelevance = {
    success: boolean;
    message: string;
    feed: { relevance: number, user: User }[];
}

export type Donuts = {
    current_amount: string;
    purpose_amount: string;
    currency: string;
}

export type Matches = {
    message: string;
    success: boolean;
    users: User[];
}

export type Likes = {
    message: string;
    success: boolean;
    users: User[];
}


