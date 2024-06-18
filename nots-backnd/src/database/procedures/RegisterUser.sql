CREATE PROCEDURE RegisterUser
    @username NVARCHAR(50),
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the username already exists
    IF EXISTS (SELECT 1 FROM Users WHERE username = @username)
    BEGIN
        RAISERROR('Username already exists', 16, 1);
        RETURN;
    END

    -- Insert the new user
    INSERT INTO Users (username, password)
    VALUES (@username, @password);
END
