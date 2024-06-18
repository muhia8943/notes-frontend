CREATE PROCEDURE UpdateNote
    @Id INT,
    @Title NVARCHAR(255),
    @Content NVARCHAR(MAX)
AS
BEGIN
    UPDATE Notes
    SET title = @Title,
        content = @Content,
        updatedAt = GETDATE()
    WHERE id = @Id;
END;
GO
