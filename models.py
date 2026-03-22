from sqlmodel import SQLModel, Field

# 1. Tabela de Usuário 
class Usuario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(unique=True, index=True)
    senha: str
    idade: int
    tipo_usuario: str
    
    # Gameficação
    moedas: int = Field(default=0)  
    vidas: int = Field(default=5)   
    ofensiva: int = Field(default=0) 
    xp: int = Field(default=0)