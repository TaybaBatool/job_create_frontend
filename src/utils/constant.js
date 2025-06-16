export const USER_ROLES = [

    { id: 1 , title: 'Super Admin' },
    { id: 2, title: 'Admin' },
    { id: 3, title: 'Area Coordinator' },
    { id: 4, title: 'Backend User' },
    { id: 5, title: 'Frontend User' },

]
export const SUPPORT_USER = [

    { id: 4, title: 'Backend User' },
    { id: 5, title: 'Frontend User' },

]

export const CUSTOMER_TYPE = [

    { id: '1', label: 'With Tax' },
    { id: '2', label: 'Without Tax' },

]
export const PROPERTY_TYPE = [

    { id: '1', title: 'Flat' },
    { id: '2', title: 'House' },
    { id: '3', title: 'Commerical' },
    { id: '4', title: 'domestic' },

]
export const JobStatus = {
    request : 1,
    cancel : 2,
    confirm : 3,
    propertyVisit : 4,
    complete : 5,
    emailSend : 6,
    invoice : 7,
    paymentSuccess : 8,
}
export const JOB_STATUS = [
    {name: "request" , id : 1},
     {name: "cancel " , id : 2},
     {name: "confirm " , id : 3},
     {name: "propertyVisit" , id  : 4},
     {name: "complete " , id : 5},
     {name: "emailSend" , id  : 6},
     {name: "invoice " , id : 7},
     {name: "paymentSuccess " , id : 8},
]
export const PropertyType = {
    flat : 1,
    house : 2,
    commerical : 3,
    domestic : 4,
}
export const userRole = {
    superAdmin : 1,
    admin : 2,
    areaCoordinator : 3,
    backSupport : 4,
    frontSupport : 5,
    customer : 6,
    
}

export const userStatus = {
    active : 1,
    inactive : 2,
}

export const tokenStatus = {
    active : 1,
    expired : 2,
}
