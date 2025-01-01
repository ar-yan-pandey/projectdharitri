-- Enable RLS
ALTER TABLE cows ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to update their own cows
CREATE POLICY "Users can update their own cows"
ON cows
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
