create table products(
id int primary key auto_increment,
productName varchar(300) not null,
price float(10,2) not null,
quantity int unsigned default 0,
imageUrl varchar(500),
offer int unsigned default 0
)

create table `cardDetails`(
  `number` varchar(16) primary key,
  `name` varchar(100) not null,
  `address` varchar(200),
  `country` varchar(100),
  `cvv` int not null check `cvv` >= 100 and `cvv` < 1000,
  `exp` varchar(7) not null,
  `balance` int unsigned default 0,
  `issuingNetwork` varchar(100) not null
)

create table `upiDetails`(
  `upiId` varchar(100) primary key,
  `upiPin` varchar(100) not null,
  `balance` int unsigned default 0
)

create table `netbankingDetails` (
`customerId` varchar(100) primary key,
`bankName` varchar(200) not null,
`password` varchar(200) not null,
`balance` int unsigned default 0
)
create table `transactions`(
  `int` int primary key auto_increment,
  `transactionType` enum (`card`,`netbanking`,`upi`),
  `otp` int,
  `otpExpiresIn` int,
  `status` enum(`pending`,'failed', 'successful') default `pending`,
  `transactionId` varchar(100)
)