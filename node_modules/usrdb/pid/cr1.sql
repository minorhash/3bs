create table pid(
email text not null,
pid text not null,
mnt integer,
buy text,
ite text
);
create unique index pid_pid on pid(pid);


