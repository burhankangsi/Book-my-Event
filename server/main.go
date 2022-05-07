package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Event struct {
	EventID     string `json:"eventid"`
	EventName   string `json:"eventname"`
	Venue       string `json:"venue"`
	BookingDate string `json:"date"`
	Duration    string `json:"duration"`
	StartTime   string `json:"starttime"`
	EndTime     string `json:"endtime"`
	Price       string `json:"price"`
	BookedBy    string `json:"bookedby"`
}

type JsonResponse struct {
	Type    string  `json:"type"`
	Data    []Event `json:"data"`
	Message string  `json:"message"`
}

type JsonResponse1 struct {
	Type    string `json:"type"`
	Data    Event  `json:"data"`
	Message string `json:"message"`
}

func AddEvent(w http.ResponseWriter, r *http.Request) {
	log.Info("Preparing to add event")
	eventID := r.FormValue("eventid")
	eventName := r.FormValue("eventname")
	venue := r.FormValue("venue")
	bookdate := r.FormValue("bookingdate")
	duration := r.FormValue("duration")
	startTime := r.FormValue("starttime")
	endTime := r.FormValue("endtime")
	price := r.FormValue("price")
	user := r.FormValue("bookedby")

	var currEvent Event
	currEvent = Event{
		EventID:     eventID,
		EventName:   eventName,
		Venue:       venue,
		BookingDate: bookdate,
		Duration:    duration,
		StartTime:   startTime,
		EndTime:     endTime,
		Price:       price,
		BookedBy:    user,
	}

	log.Infof("Got the json %v", currEvent)
	var response = JsonResponse{}

	if eventID == "" || eventName == "" || user == "" {
		response = JsonResponse{Type: "error", Message: "You are missing one or more important parameter."}
	} else {
		client, ctx, cancel, err := ConnectDatabase()
		if err != nil {
			panic(err)
		}

		eventCollection := client.Database("book_my_event").Collection("events")
		// doc := bson.D{{"eventId", "User 1"}, {"eventName", "xyz engagement"}, {"eventVenue", "abc garden"}, {"bookingDate", "2022-01-16"}, {"eventDuration", "240"},
		// 	{"startTime", "1642323600"}, {"endTime", "1642341600"}, {"price", "30000"}, {"user", "abc"}}
		doc := currEvent

		result, err := eventCollection.InsertOne(context.TODO(), doc)
		if err != nil {
			panic(err)
		}
		// display the id of the newly inserted object
		fmt.Println(result.InsertedID)
		close(client, ctx, cancel)
		response = JsonResponse{Type: "success", Message: "The event has been inserted successfully!"}
	}

	json.NewEncoder(w).Encode(response)

}
func close(client *mongo.Client, ctx context.Context, cancel context.CancelFunc) {

	defer cancel()

	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
}

func ConnectDatabase() (*mongo.Client, context.Context, context.CancelFunc, error) {
	log.Info("Connecting to db")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://my_mongo_user:myfriend1454@cluster0.zmdyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		return nil, nil, nil, err
	}
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return nil, nil, nil, err
	}
	log.Info("Connected to db successfully")
	return client, ctx, cancel, nil
}

func GetEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	eventId, ok := params["eventId"]
	if !ok {
		log.Errorf("Event ID is missing in parameters")
	}
	log.Infof("eventId is %v", eventId)
	client, ctx, cancel, err := ConnectDatabase()
	if err != nil {
		panic(err)
	}

	col := client.Database("book_my_event").Collection("events")
	fmt.Println("Collection type:", reflect.TypeOf(col), "\n")

	var result Event
	err = col.FindOne(context.TODO(), bson.D{}).Decode(&result)
	if err != nil {
		fmt.Println("Error calling FindOne():", err)
		os.Exit(1)
	} else {
		fmt.Println("FindOne() result:", result)
		fmt.Println("FindOne() eventId:", result.EventID)
		fmt.Println("FindOne() name:", result.EventName)
		fmt.Println("FindOne() venue:", result.Venue)
		fmt.Println("FindOne() bookingdate:", result.BookingDate)
		fmt.Println("FindOne() duration:", result.Duration)
		fmt.Println("FindOne() starttime:", result.StartTime)
		fmt.Println("FindOne() endTime:", result.EndTime)
		fmt.Println("FindOne() price:", result.Price)
		fmt.Println("FindOne() bookedby:", result.BookedBy)
	}
	close(client, ctx, cancel)
	var response = JsonResponse1{Type: "success", Data: result}

	json.NewEncoder(w).Encode(response)
}

func GetEventPopular(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	client, ctx, cancel, err := ConnectDatabase()
	if err != nil {
		panic(err)
	}
	var count int
	var res []Event
	eventCollection := client.Database("book_my_event").Collection("events")
	cur, currErr := eventCollection.Find(ctx, bson.M{})

	if currErr != nil {
		panic(currErr)
	} else {
		for cur.Next(ctx) {

			// declare a result BSON object
			var result Event
			err := cur.Decode(&result)

			// If there is a cursor.Decode error
			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)

				// If there are no cursor.Decode errors
			} else {
				fmt.Println("\nresult type:", reflect.TypeOf(result))
				fmt.Println("result:", result)
				res = append(res, result)
				count++
			}
		}
	}
	defer cur.Close(ctx)

	//fmt.Println(res)

	close(client, ctx, cancel)

	log.Infof("events are %v", res)
	var response = JsonResponse{Type: "success", Data: res}
	log.Infof("response is %v", response)
	json.NewEncoder(w).Encode(response)
}

func HomePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welecome to my api")
}

//func initServer(ctx context.Context) (*http.Server, context.Context) {
func initServer() {
	//Creating the routers
	log.Infof("Starting server")

	myRouter := mux.NewRouter().StrictSlash(true)
	log.Infof("Calling handler")
	myRouter.HandleFunc("/addEvent", AddEvent).Methods("POST")
	myRouter.HandleFunc("/event/{eventId}", GetEvent).Methods("GET")
	myRouter.HandleFunc("/top_rated", GetEventPopular).Methods("GET")
	myRouter.HandleFunc("/upcoming", GetEventPopular).Methods("GET")
	myRouter.HandleFunc("/event/recommended", GetEventPopular).Methods("GET")
	myRouter.HandleFunc("/event/popular", GetEventPopular).Methods("GET")
	//myRouter.HandleFunc("/user", GetUserInfo).Methods("GET")
	myRouter.HandleFunc("/", HomePage).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", myRouter))
	log.Info("Server started")

	//<-ctx.Done()

	log.Info("Server stopped")
}

func main() {
	initServer()
	log.Infof("Application closed")
}
