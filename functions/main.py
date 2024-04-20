# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import firebase_functions as functions
import firebase_functions.scheduler_fn
import firebase_functions.https_fn

import firebase_admin as firebase
import firebase_admin.firestore

import scraper

app       = firebase.initialize_app()
firestore = firebase.firestore.client(app)


# @functions.https_fn.on_request()
# def on_request_example(req: functions.https_fn.Request) -> functions.https_fn.Response:
#     return functions.https_fn.Response("Hello world!")


# @functions.scheduler_fn.on_schedule(schedule= '* * * * *')                      # TODO change schedulee time to something reasonable
@functions.scheduler_fn.on_schedule(schedule= 'every 1 mins')                      # TODO change schedulee time to something reasonable
def sinkDenominations(event: functions.scheduler_fn.ScheduledEvent) -> None:
    denominations = firestore.collection('denominations')

    for data in scraper.Scraper.getDenominations():
        denominations.add(
            document_data= data,
            document_id  = data['id']
        )

# TODO create a function that would create a new event to scrape each draw
# TODO create a function that should handle this event
