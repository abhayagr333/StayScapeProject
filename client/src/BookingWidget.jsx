import { useState } from "react";

export default function BookingWidget({ place }) {
    const [guests, setGuests] = useState(1);
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per Night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check In: </label>
                        <input type="date" />
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check Out: </label>
                        <input type="date" />
                    </div>
                </div>
                <div className="py-4 px-4 border-t">
                    <label>Maximum no. guests: </label>
                    <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
                </div>
            </div>
            <button className="primary mt-4">Book this Place</button>
        </div>
    )
}