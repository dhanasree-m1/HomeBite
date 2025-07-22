import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password_hash: String
    mobile_number: String!
    role: [String!]
    gender: String
    profile_image: String
    status: String
    address_line_1: String
    address_line_2: String
    city: String
    province: String
    postal_code: String
    country: String
    nearby_landmark: String
    created_at: String
  }

  type Rider {
    id: ID!
    user: User!
    vehicle_type: String!
    vehicle_registration_number: String!
    vehicle_insurance_number: String
    insurance_expiry_date: String
    driver_license_number: String!
    license_expiry_date: String
    document_upload_path: String
    preferred_delivery_radius: String
    preferred_working_days: [String!]
    preferred_start_time: String
    preferred_end_time: String
    long_distance_preference: Boolean
  }

  type Chef {
    id: ID!
    user: User
    specialty_cuisines: [String]
    type_of_meals: [String]
    cooking_experience: String
    max_orders_per_day: Int
    preferred_working_days: [String!]
    preferred_start_time: String
    preferred_end_time: String
    created_at: String
  }

  type PaymentInfo {
    id: ID!
    user: User!
    bank_account_number: String
    transit_number: String
  }
  type Order {
    _id: ID!
    status: String!
    order_no: Int!
    customer_id: User
    items: [OrderItem]
    payment: Payment
    total_amount: Float
    created_at: String
  }

  type OrderItem {
    product_id: Product!
    quantity: Int!
    special_request: String
    unit_price: Float
  }

  type Payment {
    payment_method: String
    amount: Float
    payment_status: String
  }

  type ForgotPasswordResponse {
    message: String
  }

  type ResetPasswordResponse {
    message: String
  }
  input CreatePaymentInfoInput {
    user_id: ID!
    bank_account_number: String
    transit_number: String
  }
  input CreateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    mobile_number: String!
    password_hash: String!
    role: [String!]
    gender: String
    profile_image: String
    status: String
    address_line_1: String
    address_line_2: String
    city: String
    province: String
    postal_code: String
    country: String
    nearby_landmark: String
  }

  input UpdateUserInput {
    first_name: String
    last_name: String
    email: String
    mobile_number: String
    password_hash: String
    role: [String!]
    gender: String
    profile_image: String
    status: String
    address_line_1: String
    address_line_2: String
    city: String
    province: String
    postal_code: String
    country: String
    nearby_landmark: String
  }

  input CreateRiderInput {
    user_id: ID!
    vehicle_type: String!
    vehicle_registration_number: String!
    vehicle_insurance_number: String
    insurance_expiry_date: String
    driver_license_number: String!
    license_expiry_date: String
    preferred_delivery_radius: String
    preferred_working_days: [String!]
    preferred_start_time: String
    preferred_end_time: String
    long_distance_preference: Boolean
  }

  input UpdateRiderInput {
    user_id: ID
    vehicle_type: String
    vehicle_registration_number: String
    vehicle_insurance_number: String
    insurance_expiry_date: String
    driver_license_number: String
    license_expiry_date: String
    preferred_delivery_radius: String
    preferred_working_days: [String]
    preferred_start_time: String
    preferred_end_time: String
    long_distance_preference: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }
  input CreateChefInput {
    user_id: ID!
    specialty_cuisines: [String]
    type_of_meals: [String]
    cooking_experience: String
    max_orders_per_day: Int
    preferred_working_days: [String!]
    preferred_start_time: String
    preferred_end_time: String
  }
  input UpdateChefInput {
    specialty_cuisines: [String]
    type_of_meals: [String]
    cooking_experience: String
    max_orders_per_day: Int
    preferred_working_days: [String]
  }
  type Query {
    getUser(id: ID!): User
    getRider(id: ID!): Rider
    getChef(id: ID!): Chef
    getCurrentOrders(chef_id: ID!): [Order]
    getCompletedOrders(chef_id: ID!): [Order]
    isEmailUnique(email: String!): Boolean!
  }

  type Mutation {
    login(input: LoginInput): LoginResponse
    createUser(input: CreateUserInput!): User
    createRider(input: CreateRiderInput!): Rider
    createChef(input: CreateChefInput!): Chef
    updateUser(id: ID!, input: UpdateUserInput!): User
    updateRider(id: ID!, input: UpdateRiderInput!): Rider
    forgotPassword(email: String!): ForgotPasswordResponse
    createPaymentInfo(input: CreatePaymentInfoInput!): PaymentInfo
    resetPassword(token: String!, newPassword: String!): ResetPasswordResponse
    updateOrderStatus(orderId: ID!, status: String!): Response
  }
  type Response {
    success: Boolean!
    message: String!
  }
  type Product {
    id: ID!
    chef_id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int
    image_url: String
    dietary: String
    created_at: String
    is_available: String
    user: User
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    quantity: Int
    image_url: String
    dietary: String
    is_available: String
  }

  type Query {
    getProductsByChef(chef_id: ID!): [Product]
  }
  type Query {
    getAllProducts(campus: String): [Product]
    getAllChefs: [Chef]
    getProduct(id: ID!): Product
  }
  type Mutation {
    addProduct(chef_id: ID!, input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
  type UserProfile {
    user: User
    chef: Chef
  }

  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    password_hash: String
    mobile_number: String
    gender: String
    address_line_1: String
    address_line_2: String
    city: String
    province: String
    postal_code: String
    country: String
    nearby_landmark: String
    role: [String!]
    profile_image: String
 
  }

  input ChefInput {
    specialty_cuisines: [String]
    type_of_meals: [String]
    cooking_experience: String
    max_orders_per_day: Int
    preferred_working_days: [String]
  }

  input RiderInput {
    vehicle_registration_number: String
    vehicle_insurance_number: String
    insurance_expiry_date: String
    driver_license_number: String
    license_expiry_date: String
    document_upload_path: String
    preferred_delivery_radius: Int
    preferred_working_days: [String]
  }
  type Mutation {
    updateUserProfile(
      id: ID!
      userInput: UserInput
      chefInput: ChefInput
    ): UserProfile
  }

  type Query {
    getUserProfile: UserProfile
  }
`;

export default typeDefs;
