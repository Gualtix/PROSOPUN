import os
import requests
import json

#url = 'http://localhost:3000'
#url = 'http://35.209.199.1:80'
#url = 'http://34.120.10.14:80'


url="http://34.120.10.14:80"

url = 'http://34.123.109.15:3000'

menu_options = {
    1: 'InicarCarga',
    2: 'Publicar',
    3: 'FinalizarCarga',
    4: 'Salir',
}

def print_menu():
    for key in menu_options.keys():
        print (key, '--', menu_options[key] )

def IniciarCarga():
    print('* * * I N I C I A R   C A R G A * * *')

    f = open('../archivito.json',)
    data = json.load(f)
    cnt = 0

    for i in data:
        cnt += 1
        print('Enviando Objeto: ' + str(cnt) + '...')

        try:
            response = requests.post(f'{url}/IniciarCarga', json = i)
        except Exception as o:
            print(url+'/IniciarCarga: No Responde')
            print('')
            continue
        
        print('')
        
        json_obj = response.json()
        
    ndt = len(data)
    f.close() 

    print(f'IniciarCarga Finalizado con Exito!')
    print(f'Se Enviaron: {ndt} Objetos')
    input("Press Enter to continue...")

def Publicar():
    print('* * * P U B L I C A R * * *')

    try:
        response = requests.post(f'{url}/Publicar', json = {})
        print(response.json())
    except Exception as o:
        print(url+'/Publicar: No Responde')
    
    print('')    
    input("Press Enter to continue...")

def FinalizarCarga():
    print('* * * F I N A L I Z A R   C A R G A * * *')

    try:
        response = requests.post(f'{url}/FinalizarCarga', json = {})
        print(response.json())
    except Exception as o:
        print(url+'/FinalizarCarga: No Responde')
    
    print('')    
    input("Press Enter to continue...")
    
if __name__=='__main__':
    while(True):
        clear = lambda: os.system('cls')
        clear()
        print('* * * L O A D   G E N E R A T O R * * *')
        print('Seleccione una Opcion:')
        print_menu()
        option = ''
        try:
            option = int(input())
        except:
            print('Opcion NO Valida')
            
        #Check what choice was entered and act accordingly
        clear = lambda: os.system('cls')
        clear()
        if option == 1:
            IniciarCarga()
        elif option == 2:
            Publicar()
        elif option == 3:
            FinalizarCarga()
        elif option == 4:
            print('Saliendo...')
            exit()
        else:
            print('Opcion NO Valida')
        
        