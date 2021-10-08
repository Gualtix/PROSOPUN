package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
    "fmt"
    "os"
	"strconv"
 )
 
 var url="http://34.120.10.14:80"

 type Tweet struct {
    Nombre string
    Comentario string
    Hashtags [] string
    Upvotes int
    Downvotes int
}

func IniciarCarga(){

	fmt.Println("* * * I N I C I A R   C A R G A * * *")

	//pwd, _ := os.Getwd()
	jsonFile, err := os.Open("../archivito.json")

	if err != nil {
		fmt.Println(err)
	}

	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

    //var tws map[string]interface{}
	var tws []Tweet
    json.Unmarshal([]byte(byteValue), &tws)
	var cnt = 0;

	for i := 0; i < len(tws); i++ {

		cnt = cnt + 1;

		postBody, _ := json.Marshal(tws[i])
		responseBody := bytes.NewBuffer(postBody)
		resp, err := http.Post(url+"/IniciarCarga", "application/json", responseBody)
		body, err := ioutil.ReadAll(resp.Body)

		_ = body
		_ = err

		fmt.Println("Enviando Objeto: "+ strconv.Itoa(cnt) +"...")
	}

	fmt.Println("IniciarCarga Finalizado con Exito")
	fmt.Println("Se Enviaron: "+strconv.Itoa(cnt)+" Objetos")
	fmt.Println("Press Enter to continue...")
	fmt.Scanln()
}

func Publicar(){
	fmt.Println("* * * P U B L I C A R * * *")


	values := map[string]string{"name": "John Doe", "occupation": "gardener"}
	json_data, err := json.Marshal(values)
	responseBody := bytes.NewBuffer(json_data)

	resp, err := http.Post(url+"/Publicar", "application/json",responseBody)
	body, err := ioutil.ReadAll(resp.Body)

	_ = body
	_ = err

	fmt.Println("Publicar Finalizado con Exito")
	//fmt.Println(body)
	fmt.Println("Press Enter to continue...")
	fmt.Scanln()
}

func FinalizarCarga(){
	fmt.Println("* * * F I N A L I Z A R   C A R G A * * *")



	values := map[string]string{"name": "John Doe", "occupation": "gardener"}
	json_data, err := json.Marshal(values)
	responseBody := bytes.NewBuffer(json_data)

	resp, err := http.Post(url+"/FinalizarCarga", "application/json",responseBody)
	
	body, err := ioutil.ReadAll(resp.Body)

	_ = body
	_ = err

	fmt.Println("Finalizar Carga Finalizado con Exito")
	//fmt.Println(body)
	fmt.Println("Press Enter to Exit...")
	fmt.Scanln()
}


 func main() {
	 IniciarCarga();
	 Publicar();
	 FinalizarCarga();
 }