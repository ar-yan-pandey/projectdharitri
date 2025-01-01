-- Create cows table
create table if not exists public.cows (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    age integer,
    breed text,
    health_status text default 'Healthy',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    image_url text,
    description text,
    user_id uuid references auth.users(id) on delete cascade not null
);

-- Enable Row Level Security
alter table public.cows enable row level security;

-- Create policies
-- Allow users to view their own cows
create policy "Users can view own cows"
    on cows for select
    using (auth.uid() = user_id);

-- Allow admins to view all cows
create policy "Admins can view all cows"
    on cows for select
    using (
        exists (
            select 1
            from profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );

-- Allow users to insert their own cows
create policy "Users can insert own cows"
    on cows for insert
    with check (auth.uid() = user_id);

-- Allow admins to insert any cows
create policy "Admins can insert any cows"
    on cows for insert
    with check (
        exists (
            select 1
            from profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );

-- Allow users to update their own cows
create policy "Users can update own cows"
    on cows for update
    using (auth.uid() = user_id);

-- Allow admins to update any cows
create policy "Admins can update any cows"
    on cows for update
    using (
        exists (
            select 1
            from profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );

-- Allow users to delete their own cows
create policy "Users can delete own cows"
    on cows for delete
    using (auth.uid() = user_id);

-- Allow admins to delete any cows
create policy "Admins can delete any cows"
    on cows for delete
    using (
        exists (
            select 1
            from profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );

-- Create indexes
create index cows_user_id_idx on cows(user_id);
create index cows_health_status_idx on cows(health_status);
