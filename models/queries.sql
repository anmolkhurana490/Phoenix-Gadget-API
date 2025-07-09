create type status_enum as ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

create table gadget (
	id uuid primary key,
	name text not null,
	status status_enum default 'Available',
	decommissioned_at timestamp
);