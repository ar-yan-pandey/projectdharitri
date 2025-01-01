-- Create news table
create table if not exists news (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    image_url text,
    category text not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table news enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
on news for select
to authenticated, anon
using (true);

-- Create policy to allow only admins to insert/update/delete
create policy "Allow admin full access"
on news for all
to authenticated
using (
    exists (
        select 1 from profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
)
with check (
    exists (
        select 1 from profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
);

-- Create trigger to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_news_updated_at
    before update on news
    for each row
    execute function update_updated_at_column();

-- Add comment to the table
comment on table news is 'Table storing news articles for the website';
