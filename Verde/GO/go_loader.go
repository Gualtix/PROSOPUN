package main


import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
    "fmt"
    "os"
 )
 
/*
 import (



	"io/ioutil"
	"encoding/json"

    "fmt"
    "os"
 )
 */


 var url="http://localhost:3000/push_tweet"

 type Tweet struct {
    Nombre string
    Comentario string
    Hashtags [] string
    Upvotes int
    Downvotes int
}

/*
		"hashtags":tws[i].Hashtags,
		"upvotes":tws[i].Upvotes,
		"downvotes":tws[i].Downvotes,
		*/
 
 func main() {

	//pwd, _ := os.Getwd()
	jsonFile, err := os.Open("../data.json")

	if err != nil {
		fmt.Println(err)
	}

	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

    //var tws map[string]interface{}
	var tws []Tweet
    json.Unmarshal([]byte(byteValue), &tws)

	for i := 0; i < len(tws); i++ {
		fmt.Println(tws[i].Nombre)

		postBody, _ := json.Marshal(tws[i])

		responseBody := bytes.NewBuffer(postBody)

		resp, err := http.Post(url, "application/json", responseBody)

		//Handle Error
		if err != nil {
			log.Fatalf("An Error Occured %v", err)
		}
		
		defer resp.Body.Close()
		//Read the response body
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}
		sb := string(body)
		log.Printf(sb)
			}

	/*

	for i := 0; i < len(tws); i++ {

		//responseBody := bytes.NewBuffer(tws)

		resp, err := http.Post(url+"/push_tweet", "application/json", json.Marshal(tws[i]))

		if err != nil {
			log.Fatalf("An Error Occured %v", err)
		}

		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		sb := string(body)
		log.Printf(sb)
	}

 	//Encode the data
	*/ 
		
 }