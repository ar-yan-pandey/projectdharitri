-- Add new columns
alter table products
    add column if not exists category text,
    add column if not exists buying_link text;

-- Drop stock column as it's no longer needed
alter table products
    drop column if exists stock;
