create table pid(
email text not null,
pid text,
mnt integer
);
create unique index pid_email on pid(email);


