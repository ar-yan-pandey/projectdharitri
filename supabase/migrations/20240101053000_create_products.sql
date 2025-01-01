create table if not exists products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    price decimal(10,2) not null,
    stock integer not null default 0,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table products enable row level security;

-- Create policies
create policy "Products are viewable by everyone"
    on products for select
    using ( true );

create policy "Products are insertable by authenticated users only"
    on products for insert
    with check ( auth.role() = 'authenticated' );

create policy "Products are updatable by authenticated users only"
    on products for update
    using ( auth.role() = 'authenticated' );

create policy "Products are deletable by authenticated users only"
    on products for delete
    using ( auth.role() = 'authenticated' );
