create table pal(
email text not null,
tok text not null,
ite text 
);
create unique index pal_tok on pal(tok);


