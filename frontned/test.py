import spacy

# Carregar o modelo de linguagem em português
nlp = spacy.load("pt_core_news_sm")

def format_art(art):
    observacao=art["observacao"]
    atividades=""
    if art["qtdAtividades"]>1:
        for ativity in art["atividades"]:
            atividades=ativity["nivel"]+", "+ativity["atividade_subordinada"]+", "+ativity["atividade_servico"]+"; "
    elif art["qtdAtividades"]==1:
        atividades=art["atividades"][0]["nivel"]+", "+art["atividades"][0]["atividade_subordinada"]+", "+art["atividades"][0]["atividade_servico"]
    else:
        atividades=""

    return {"observacao": observacao, "atividades": atividades}

def verificar_inconsistencias(art_data):
    # Processar a observação e as atividades com spaCy
    art=format_art(art_data)
    doc_observacao = nlp(art['observacao'])
    atividades = art['atividades'].split(', ')

    inconsistencias = []

    for atividade in atividades:
        doc_atividade = nlp(atividade)

        # Calcular a similaridade semântica entre a observação e cada atividade
        similaridade = doc_observacao.similarity(doc_atividade)
        
        # Definir um limite de similaridade para identificar inconsistências
        if similaridade < 0.3:  # O valor 0.5 pode ser ajustado conforme necessário
            inconsistencias.append({
                'atividade': atividade,
                'similaridade': similaridade
            })

    return inconsistencias

# Exemplo de uso
# art = {
#     "observacao": "COLETA DE LIXO. GESTÃO INTEGRADA DE RESIDUOS SOLIDOS. CONFORME CONTRATO. PARA A PREFEITURA DE BELO HORIZONTE ",
#     "atividades": "execução, SANEAMENTO AMBIENTAL > SISTEMA DE ESGOTO/RESÍDUOS > DE COLETA DE RESÍDUOS SÓLIDOS > #6.2.2.4 - DA CONSTRUÇÃO CIVIL, Execução de serviço técnico; execução, SANEAMENTO AMBIENTAL > SISTEMA DE ESGOTO/RESÍDUOS > DE COLETA DE RESÍDUOS SÓLIDOS > #6.2.2.3 - DE SERVIÇOS DE SAÚDE, Execução de serviço técnico; execução, SANEAMENTO AMBIENTAL > SISTEMA DE ESGOTO/RESÍDUOS > DE COLETA DE RESÍDUOS SÓLIDOS > #6.2.2.1 - DOMICILIARES E DE LIMPEZA URBANA, Execução de serviço técnico; execução, SANEAMENTO AMBIENTAL > SISTEMA DE ESGOTO/RESÍDUOS > DE COLETA DE RESÍDUOS SÓLIDOS > #6.2.2.2 - INDUSTRIAIS, Execução de serviço técnico"
# }

# inconsistencias = verificar_inconsistencias(art)

# if inconsistencias:
#     for inconsistencia in inconsistencias:
#         print(f"Atividade inconsistente: {inconsistencia['atividade']} - Similaridade: {inconsistencia['similaridade']:.2f}")
# else:
#     print("Todas as atividades estão consistentes com a observação.")