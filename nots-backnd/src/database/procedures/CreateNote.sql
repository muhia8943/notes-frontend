CREATE PROCEDURE CreateNote
    @Title NVARCHAR(255),
    @Content NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Notes (title, content, createdAt, updatedAt)
    VALUES (@Title, @Content, GETDATE(), GETDATE());
END;
GO
