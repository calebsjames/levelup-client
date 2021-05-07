import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "./GameProvider.js"



export const EventForm = () => {
    const history = useHistory()
    
    const [currentEvent, setEvent] = useState({
        organizer: 0,
        description: "",
        gameId: "",
        date: "",
        time: "",
        attendees: ""

    })
    const { games, getGames } = useContext(GameContext)
    const { createEvent, events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getGames()
        // Get all existing games from API
    }, [])

    const changeEventState = (domEvent) => {
        debugger
        const newEvent = { ...currentEvent }
        let selectedVal = domEvent.target.value
        newEvent[domEvent.target.id] = selectedVal
        setEvent(newEvent)
    }

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                    value={currentEvent.gameId}
                    onChange={changeEventState}
                    id="gameId">
                        <option value="0">Select a game</option>
                        {
                            games.map(game => (
                                <option key={game.id}  value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" id="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" id="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    debugger
                    // Create the event
                    const event = {
                        organizer: localStorage.getItem("lu_token"),
                        description: currentEvent.description,
                        game: currentEvent.gameId,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
        </>
    )
}
