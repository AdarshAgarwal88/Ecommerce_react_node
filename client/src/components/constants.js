export const baseUrl = `http://localhost:4000`;
export const baseCatogries = `https://fakestoreapi.com/products/category`;
export const regex = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    passwordRegex: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    phoneRegex: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
}
export const error = {
    emailError: "This is not a valid email format !",
    requiredError: "Please fill this field",
    passwordError: "This is not valid password format",
    confirmPassword: "This is not valid confirm format",
    phoneError: "Please enter the valid phone number",
}

export const ActionType = {
    SET_PRODUCTS: "SET_PRODUCTS",
    SELECTED_PRODUCT: "SELECTED_PRODUCT",
    REMOVE_SELECTED_PRODUCT: "EMOVE_SELECTED_PRODUCT",
}

export const radioButtons = [
    { value: "small", label: "small" },
    { value: "medium", label: "medium" },
    { value: "large", label: "large" },
    { value: "xl", label: "xl" },
    { value: "xxl", label: "xxl" }
]
