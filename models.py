from sqlmodel import SQLModel, Field

# 1. Tabela de Usuário 
class Usuario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(unique=True, index=True) # Impede e-mail repetido
    senha: str
    xp: int = Field(default=0)
    idade: int
    tipo_usuario: str 