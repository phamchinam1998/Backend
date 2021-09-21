1.SETUP
 - cd example, open git bash (terminal) type : npm i (install node modules)
 - cd example : npm start ( start server) 

2. Structure Folder
 - src create folder : Customers/ Product/ Contact,....
 - Folder Customers : customers.api, customers.model, 

3. CRUD (Create - Read - Update - Delete) API with Http Methods
- Create Customer : FE - req.body
 {
     _id : function random string 12 character
     fullname : string
     gender : string
     birthday : string
     code : function random number 12 character
 }

 - Read Customer: FE - req.querry ? code=

 - Update Customer : FE - req.querry ? code = , data update (req.body)

 - Delete Customer : FE - req.querry ? code =

 4. CRUD with function
 - Create Customer
 Function CreateCustomer(fullname, gender, birthday) {
     return Customer
 }

 - Read Customer
 Function GetCustomer(code) {
     return Customer
 }

 -Update Customer
 Function UpdateCustomer(code, data) {
     //tips : data is object with key : full_name, gender, birthday
     return Customer
 }

 -Delete Customer
 Function DeleteCustomer(code) {
     //return or not return?
     return Customer
 }

 //////////////////////////////////////////////////////////
 FE - localStorage-- luu 5mb trinh duyet web token session id --> req fe kep header
 //luu tru//restart server-- ram refresh...connect database (luu tru du lieu)--mongodb
 //find findOne insertOne updateOne deleteOne