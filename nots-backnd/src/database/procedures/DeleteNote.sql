CREATE PROCEDURE DeleteNote
    @Id INT
AS
BEGIN
    DELETE FROM Notes WHERE id = @Id;
END;
GO
