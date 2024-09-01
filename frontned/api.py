import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from utils import ler_arquivos_json
from test import verificar_inconsistencias

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurações do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

path = "./arts"

#modelo atividade
class Atividade(BaseModel):
    nivel: str
    atividade_subordinada: str
    atividade_servico: str
    quantidade: str
    unidade_medida: str

# modelo da ART
class Art(BaseModel):
    numero: str
    tipoArt: str
    finalidade: str
    participacao_tecnica: str
    entidade: str
    forma_registro: str
    observacao: str
    qtdAtividades: int
    qtdArtsVinculadasParticipacaoTecnica: int
    qtdArtsVinculadasFormaRegistro: int
    atividades: List[Atividade]

# Definindo o modelo de dados que sua API vai receber
class InputData(BaseModel):
    param1: List[Art]

# Rota principal da API
@app.get("/analisar")
async def analisar_arts():

    filtered_arts=[]

    arts = ler_arquivos_json(path)
    
    for art in arts: 
        inconsistencias = verificar_inconsistencias(art)
        if inconsistencias:
            for inconsistencia in inconsistencias:
                print(f"Atividade inconsistente: {inconsistencia['atividade']} - Similaridade: {inconsistencia['similaridade']:.2f}")
            art["consistente"]=0
            filtered_arts.append(art)
        else:
            print("Todas as atividades estão consistentes com a observação.")
            art["consistente"]=1
            filtered_arts.append(art)

    return {"arts": filtered_arts}

# get all ART's
@app.get("/get-arts")
async def get_arts():
        
    arts = ler_arquivos_json(path)
    return {"arts": arts}

if __name__ == "__main__":
    uvicorn.run(app, port=8000)