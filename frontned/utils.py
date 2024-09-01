import os
import json

def ler_arquivos_json(pasta):
    array_json = []
    
    # Iterar sobre os arquivos na pasta
    for nome_arquivo in os.listdir(pasta):
        if nome_arquivo.endswith('.json'):
            caminho_arquivo = os.path.join(pasta, nome_arquivo)
            
            # Ler o conteúdo do arquivo JSON
            with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
                conteudo = json.load(arquivo)
                array_json.append(conteudo)
    
    return array_json

# Exemplo de uso
# pasta = './arts'
# array_de_json = ler_arquivos_json(pasta)

# print(array_de_json)