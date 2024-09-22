import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [numberOfGuests, setnumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        try {
            const response = await axios.post('/bookings', {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                place: place._id,
                price: numberOfNights * place.price,  // Price based on number of nights
            });

            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.error("Error creating booking:", error);
            // Handle error, show user feedback if needed
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per Night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check In: </label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setcheckIn(ev.target.value)} />
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check Out: </label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setcheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-4 px-4 border-t">
                    <label>Maximum no. guests: </label>
                    <input type="number" value={numberOfGuests}
                        onChange={(ev) => setnumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-4 px-4 border-t">
                        <label>Your Full Name: </label>
                        <input type="text"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <label>Phone Number: </label>
                        <input type="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">Book this Place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}