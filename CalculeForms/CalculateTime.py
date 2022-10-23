#distancia = int(input())
#velocidade = int(input())
horas = (distancia / velocidade)
hora_decimais = (horas - int(horas)) * 60
minutos = int(hora_decimais)
hora = int(horas)
print(f'{hora:02d}:{minutos:02d}')