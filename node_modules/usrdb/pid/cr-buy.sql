create table buy(
nam1 text,
nam2 text,
email text,
phn integer
);
create unique index buy_email on buy(email);


