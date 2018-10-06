create table usr(
name text not null,
pss text not null,
email text not null
);
CREATE UNIQUE INDEX usr_email on usr(email);
