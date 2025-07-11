let replaceLineTestCases = [
    "SomeFactory.createCustomerId(CustomerData)  (com.example)", `SomeFactory.createCustomerIdCustomerData["SomeFactory.createCustomerId(CustomerData)"]`,
    "Customer.createCustomer()  (com.example)", `Customer.createCustomer["Customer.createCustomer()"]`,
    "CustomerPatchHelper.products  (com.example)", "CustomerPatchHelper.products",
    "DefaultCustomerCreator.enableProduct(Customer)(2 usages)  (com.example)", `DefaultCustomerCreator.enableProductCustomer["DefaultCustomerCreator.enableProduct(Customer)"]`,
    "wrappingExecute(Task) in TaskExecutor in SimpleSchedulerService  (se.mynt.arch.scheduler)", `SimpleSchedulerService.wrappingExecuteTask["SimpleSchedulerService.wrappingExecute(Task)"]`,
    "DefaultLinkAccessController.createDirectDebitAgreement(Iban)  (se.mynt.app.linkaccess.api)", `DefaultLinkAccessController.createDirectDebitAgreementIban["DefaultLinkAccessController.createDirectDebitAgreement(Iban)"]`,
    "Class.call(Boolean, Amount, Amount)  (se.mynt.app.linkaccess.api)", `Class.callBooleanAmountAmount["Class.call(Boolean, Amount, Amount)"]`
];


//----------
let fullTestCases = [
    `SomeFactory.createCustomerId(CustomerData)  (com.example)
    Customer.createCustomer()  (com.example)
        Customer.addProduct(Product)  (com.example)
            Customer.updateProducts(EnumSet<Product>)  (com.example)
                CustomerPatchHelper.products  (com.example)
            DefaultCustomerCreator.enableProduct(Customer)(2 usages)  (com.example)
                DefaultCustomerCreator.createWithProduct(CompanyId, String, ContactPerson)  (com.example)`
    ,
    `graph TD
SomeFactory.createCustomerIdCustomerData["SomeFactory.createCustomerId(CustomerData)"] --> target
Customer.createCustomer["Customer.createCustomer()"] --> SomeFactory.createCustomerIdCustomerData["SomeFactory.createCustomerId(CustomerData)"]
Customer.addProductProduct["Customer.addProduct(Product)"] --> Customer.createCustomer["Customer.createCustomer()"]
Customer.updateProductsEnumSetProduct["Customer.updateProducts(EnumSetProduct)"] --> Customer.addProductProduct["Customer.addProduct(Product)"]
CustomerPatchHelper.products --> Customer.updateProductsEnumSetProduct["Customer.updateProducts(EnumSetProduct)"]
DefaultCustomerCreator.enableProductCustomer["DefaultCustomerCreator.enableProduct(Customer)"] --> Customer.addProductProduct["Customer.addProduct(Product)"]
DefaultCustomerCreator.createWithProductCompanyIdStringContactPerson["DefaultCustomerCreator.createWithProduct(CompanyId, String, ContactPerson)"] --> DefaultCustomerCreator.enableProductCustomer["DefaultCustomerCreator.enableProduct(Customer)"]
`
]
