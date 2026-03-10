from sqlmodel import SQLModel, create_engine, Session, select

from models import Usuario 

# 2. Sqlite local
sqlite_url = "sqlite:///sementis.db"
engine = create_engine(sqlite_url, echo=True) 

# 3. Função para criar as tabelas no banco
def criar_tabelas():
    # Vai ler a classe Usuario que foi importada e criar no banco
    SQLModel.metadata.create_all(engine)

# 4. Função para inserir um usuário
def inserir_usuario(nome: str, email: str, idade: int, senha: str, tipo_usuario: str = "aluno"):
    with Session(engine) as session:
        
        novo_usuario = Usuario(
            nome=nome, 
            email=email, 
            idade=idade, 
            senha=senha,
            tipo_usuario=tipo_usuario
        )
        session.add(novo_usuario)
        session.commit()
        session.refresh(novo_usuario) # Puxa o ID que o banco gerou
        return novo_usuario

# 5. Função para buscar um usuário por e-mail
def buscar_usuario_por_email(email_digitado: str):
    with Session(engine) as session:
        instrucao = select(Usuario).where(Usuario.email == email_digitado)
        
        usuario_encontrado = session.exec(instrucao).first()
        
        return usuario_encontrado

    