let replaceLineTestCases = [
    "SomeFactory.createCustomerId(CustomerData)  (com.example)", "SomeFactory.createCustomerId",
    "Customer.createCustomer()  (com.example)", "Customer.createCustomer",
    "CustomerPatchHelper.products  (com.example)","CustomerPatchHelper.products"
];


//----------
let fullTestCases = [
    "ss", `graph TD
ss --> target
`,

    `SomeFactory.createCustomerId(CustomerData)  (com.example)
    Customer.createCustomer()  (com.example)
        Customer.addProduct(Product)  (com.example)
            Customer.updateProducts(EnumSet<Product>)  (com.example)
                CustomerPatchHelper.products  (com.example)
            DefaultCustomerCreator.enableProduct(Customer)(2 usages)  (com.example)
                DefaultCustomerCreator.createWithProduct(CompanyId, String, ContactPerson)  (com.example)
`,
    `graph TD
SomeFactory.createCustomerId --> target
Customer.createCustomer --> SomeFactory.createCustomerId
Customer.addProduct --> Customer.createCustomer
Customer.updateProducts --> Customer.addProduct
CustomerPatchHelper.products --> Customer.updateProducts
DefaultCustomerCreator.enableProduct --> Customer.addProduct
DefaultCustomerCreator.createWithProduct --> DefaultCustomerCreator.enableProduct
`]