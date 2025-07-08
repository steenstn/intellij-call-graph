let replaceLineTestCases = [
    "SomeFactory.createCustomerId(CustomerData)  (com.example)", "SomeFactory.createCustomerId",
    "Customer.createCustomer()  (com.example)", "Customer.createCustomer",
    "CustomerPatchHelper.products  (com.example)","CustomerPatchHelper.products",
    "DefaultCustomerCreator.enableProduct(Customer)(2 usages)  (com.example)", "DefaultCustomerCreator.enableProduct",
    "wrappingExecute(Task) in TaskExecutor in SimpleSchedulerService  (se.mynt.arch.scheduler)", "SimpleSchedulerService.wrappingExecute"
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
`,

`ExpiringCardRemindersHandlerImpl.handle(Id)  (se.mynt.app.card2.internal.renewal.usecase)
    CardExpirationListenerImpl.handle(Id)  (se.mynt.app.card2.internal.renewal.jobs.listeners)
        execute() in CardExpirationNotifierTask in CardExpirationNotifierJob  (se.mynt.app.card2.internal.renewal.jobs)
            wrappingExecute(Task) in TaskExecutor in SimpleSchedulerService  (se.mynt.arch.scheduler)
                execute(Task) in TaskExecutor in SimpleSchedulerService  (se.mynt.arch.scheduler)
                    executeAllTasks() in TaskExecutor in SimpleSchedulerService  (se.mynt.arch.scheduler)
                        SimpleSchedulerService.createJobRunner(Job)  (se.mynt.arch.scheduler)
                            SimpleSchedulerService.onlyOnce(Job, String)  (se.mynt.arch.scheduler)
                                Anonymous in startUp() in SimpleSchedulerService.onlyOnceSchedule(String)  (se.mynt.arch.scheduler)
                            SimpleSchedulerService.single(Job, List<Duration>)(2 usages)  (se.mynt.arch.scheduler)
                                Anonymous in startUp() in SimpleSchedulerService.repeatingSchedule(List<Duration>)  (se.mynt.arch.scheduler)
                            SimpleSchedulerService.periodically(Job, long, long, TimeUnit)  (se.mynt.arch.scheduler)
                                Anonymous in startUp() in SimpleSchedulerService.periodicalSchedule(long, long, TimeUnit)  (se.mynt.arch.scheduler)
`,
    `graph TD
ExpiringCardRemindersHandlerImpl.handle --> target
CardExpirationListenerImpl.handle --> ExpiringCardRemindersHandlerImpl.handle
CardExpirationNotifierJob.execute --> CardExpirationListenerImpl.handle
SimpleSchedulerService.wrappingExecute --> CardExpirationNotifierJob.execute
SimpleSchedulerService.execute --> SimpleSchedulerService.wrappingExecute
SimpleSchedulerService.executeAllTasks --> SimpleSchedulerService.execute
SimpleSchedulerService.createJobRunner --> SimpleSchedulerService.executeAllTasks
SimpleSchedulerService.onlyOnce --> SimpleSchedulerService.createJobRunner
SimpleSchedulerService.onlyOnceSchedule --> SimpleSchedulerService.onlyOnce
SimpleSchedulerService.single --> SimpleSchedulerService.createJobRunner
SimpleSchedulerService.repeatingSchedule --> SimpleSchedulerService.single
SimpleSchedulerService.periodically --> SimpleSchedulerService.createJobRunner
SimpleSchedulerService.periodicalSchedule --> SimpleSchedulerService.periodically
`
]