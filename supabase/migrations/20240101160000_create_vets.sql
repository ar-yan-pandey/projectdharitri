-- Create vets table
create table if not exists vets (
    id uuid default gen_random_uuid() primary key,
    full_name text not null,
    speciality text not null,
    state text not null,
    city text not null,
    phone_number text not null,
    image_url text,
    availability jsonb not null default '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}, "saturday": {"start": "09:00", "end": "18:00"}, "sunday": {"start": null, "end": null}}'::jsonb,
    rating numeric(2,1) default 5.0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table vets enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
on vets for select
to authenticated, anon
using (true);

-- Create policy to allow only admins to insert/update/delete
create policy "Allow admin full access"
on vets for all
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

create trigger update_vets_updated_at
    before update on vets
    for each row
    execute function update_updated_at_column();

-- Add some demo data
insert into vets (full_name, speciality, state, city, phone_number, image_url, availability, rating)
values
    (
        'Dr. Priya Sharma',
        'General Veterinary Care',
        'Maharashtra',
        'Mumbai',
        '+91 98765 43210',
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
        '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}, "saturday": {"start": "09:00", "end": "18:00"}, "sunday": {"start": null, "end": null}}'::jsonb,
        4.8
    ),
    (
        'Dr. Rajesh Kumar',
        'Dairy Animal Specialist',
        'Gujarat',
        'Ahmedabad',
        '+91 87654 32109',
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop',
        '{"monday": {"start": "08:00", "end": "17:00"}, "tuesday": {"start": "08:00", "end": "17:00"}, "wednesday": {"start": "08:00", "end": "17:00"}, "thursday": {"start": "08:00", "end": "17:00"}, "friday": {"start": "08:00", "end": "17:00"}, "saturday": {"start": "09:00", "end": "14:00"}, "sunday": {"start": null, "end": null}}'::jsonb,
        4.9
    ),
    (
        'Dr. Meera Patel',
        'Animal Nutrition',
        'Punjab',
        'Ludhiana',
        '+91 76543 21098',
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop',
        '{"monday": {"start": "10:00", "end": "19:00"}, "tuesday": {"start": "10:00", "end": "19:00"}, "wednesday": {"start": "10:00", "end": "19:00"}, "thursday": {"start": "10:00", "end": "19:00"}, "friday": {"start": "10:00", "end": "19:00"}, "saturday": {"start": "10:00", "end": "15:00"}, "sunday": {"start": null, "end": null}}'::jsonb,
        4.7
    );

-- Add comment to the table
comment on table vets is 'Table storing veterinarian information and availability';
