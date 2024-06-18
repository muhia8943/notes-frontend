CREATE PROCEDURE LoginUser
    @username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve the user information based on the username
    SELECT id, username, password
    FROM Users
    WHERE username = @username;
END
