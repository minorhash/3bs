create table tmp(
email text not null,
sku integer not null,
uni integer not null
);
create unique index tmp_sku on tmp(sku);
